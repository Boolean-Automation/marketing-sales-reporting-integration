/**
 * Your integration will contain one or more flows that each perform different
 * functions. When the flow is invoked, the onTrigger function runs first (if
 * defined), followed by the onExecution function.
 *
 * For information on code-native flows, see
 * https://prismatic.io/docs/integrations/code-native/flows/
 */

// Import core utilities for defining flow logic and handling conditional behavior
import { flow } from "@prismatic-io/spectral";

// Define a single flow within your integration
export const _022ProcessUpsertData = flow({
  // Core metadata about the flow (name, stable key, description)
  name: "02.2 Process Upsert/Data",
  stableKey: "02-2-process-upsert-data",
  description: "",
  isSynchronous: true,
  endpointSecurityType: "customer_optional",
  // Define how this flow can be triggered (webhook, schedule, etc.)
  onTrigger: {
    component: "crossFlow", // The component that initiates this flow
    key: "crossFlow", // The specific trigger or action used
    values: {},
  },
  onExecution: async (context, params) => {
    const { configVars } = context;
    const upsert = await context.components.code.runCode({
      code: `module.exports = async ({ logger, configVars }, stepResults) => {
  try {
    const { currentItem, config } = stepResults?.crossFlow?.results?.body?.data;
    const accessToken = configVars["Google Sheets Connection"]?.token?.access_token;

    const spreadsheetId = config.spreadsheetId;
    const sheetName = config.worksheetTabName;

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      if (isNaN(date)) return dateStr; // fallback if invalid
      return \`\${date.getMonth() + 1}/\${date.getDate()}/\${date.getFullYear()}\`;
    };

    const normalize = (str) => str?.toLowerCase().replace(/[\\s_]/g, "") || "";

    const isLikelyDate = (str) => {
      if (typeof str !== "string") return false;
      const trimmed = str.trim();
      if (/^\\d+$/.test(trimmed)) return false; // skip pure numbers
      const isoPattern = /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?Z$/;
      if (isoPattern.test(trimmed)) return true;
      const datePattern = /^(\\d{1,4}[-/]\\d{1,2}[-/]\\d{1,4}|\\d{1,2}[-/]\\d{1,2}[-/]\\d{2,4})$/;
      if (!datePattern.test(trimmed)) return false;
      return !isNaN(Date.parse(trimmed));
    };

    // 1. Get header row
    const headerRes = await fetch(
      \`https://sheets.googleapis.com/v4/spreadsheets/\${spreadsheetId}/values/\${sheetName}!1:1\`,
      { method: "GET", headers: { Authorization: \`Bearer \${accessToken}\` } }
    );
    if (!headerRes.ok)
      throw new Error(\`Failed to fetch headers: \${await headerRes.text()}\`);
    const headerData = await headerRes.json();
    const headers = headerData?.values?.[0] || [];

    // 2. Get all rows to find match
    const getRes = await fetch(
      \`https://sheets.googleapis.com/v4/spreadsheets/\${spreadsheetId}/values/\${encodeURIComponent(sheetName)}\`,
      { method: "GET", headers: { Authorization: \`Bearer \${accessToken}\` } }
    );
    if (!getRes.ok)
      throw new Error(\`Failed to fetch sheet data: \${await getRes.text()}\`);
    const sheetData = await getRes.json();
    const rows = sheetData.values || [];

    const dealIdIndex = headers.findIndex(
      (h) => normalize(h) === normalize("Deal Id")
    );
    if (dealIdIndex === -1) throw new Error("No 'Deal Id' column found.");

    const targetRowIndex = rows.findIndex(
      (row, idx) => idx > 0 && row[dealIdIndex] === currentItem["Deal Id"]
    );

    // 3. Build row with formatting (used for both insert and update)
    const rowValues = headers.map((header) => {
      if (!header || header.trim() === "") {
          return "";
      }
      const normalizedHeader = normalize(header);
      let matchKey = Object.keys(currentItem).find(
        (key) => normalize(key) === normalizedHeader
      );
      if (!matchKey) {
        matchKey = Object.keys(currentItem).find((key) =>
          new RegExp(\`\\\\b\${normalizedHeader}\\\\b\`).test(normalize(key))
        );
      }
      if (!matchKey) {
        matchKey = Object.keys(currentItem)
          .filter(
            (key) =>
              normalize(key).includes(normalizedHeader) ||
              normalizedHeader.includes(normalize(key))
          )
          .sort((a, b) => normalize(b).length - normalize(a).length)[0];
      }

      const value = matchKey ? currentItem[matchKey] : null;
      const safeValue = value === null || value === undefined ? "" : value;

      return (typeof safeValue === "string" && isLikelyDate(safeValue))
        ? formatDate(safeValue)
        : safeValue;
    });

    if (targetRowIndex === -1) {
      // 4a. Insert new row if Deal ID not found
      const appendRes = await fetch(
        \`https://sheets.googleapis.com/v4/spreadsheets/\${spreadsheetId}/values/\${sheetName}!A1:append?valueInputOption=USER_ENTERED\`,
        {
          method: "POST",
          headers: {
            Authorization: \`Bearer \${accessToken}\`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values: [rowValues] }),
        }
      );

      if (!appendRes.ok)
        throw new Error(\`Failed to append row: \${await appendRes.text()}\`);

      logger.info(\`➕ Added new row for Deal ID \${currentItem["Deal Id"]}\`);
      return { success: true, insertedRow: rowValues };
    }

    // 4b. Update existing row if Deal ID found
    const colLetter = (n) => {
      let s = "";
      while (n >= 0) {
        s = String.fromCharCode((n % 26) + 65) + s;
        n = Math.floor(n / 26) - 1;
      }
      return s;
    };
    const updateRange = \`\${sheetName}!A\${targetRowIndex + 1}:\${colLetter(headers.length - 1)}\${targetRowIndex + 1}\`;

    const updateRes = await fetch(
      \`https://sheets.googleapis.com/v4/spreadsheets/\${spreadsheetId}/values/\${encodeURIComponent(updateRange)}?valueInputOption=USER_ENTERED\`,
      {
        method: "PUT",
        headers: {
          Authorization: \`Bearer \${accessToken}\`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [rowValues] }),
      }
    );

    if (!updateRes.ok)
      throw new Error(\`Failed to update row: \${await updateRes.text()}\`);

    logger.info(
      \`✅ Updated row \${targetRowIndex + 1} for Deal ID \${currentItem["Deal Id"]}\`
    );
    return { success: true, updatedRow: rowValues };

  } catch (error) {
    logger.error(\`⚠️ Error writing to Google Sheet: \${error.message}\`);
    throw error;
  }
};
`,
    });
    const stopExecution2 = await context.components.stopExecution.stopExecution(
      {
        contentType: "application/json",
        headers: [],
        jsonBody: "",
        statusCode: "200",
      }
    );
    return { data: stopExecution2 };
  },
});

export default _022ProcessUpsertData;
