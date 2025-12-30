import { evaluatesNull } from "@prismatic-io/spectral/dist/conditionalLogic";
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
export const _011ProcessMassSyncing = flow({
  // Core metadata about the flow (name, stable key, description)
  name: "01.1 Process Mass Syncing",
  stableKey: "01-1-process-mass-syncing",
  description: "",
  endpointSecurityType: "customer_optional",
  // Define how this flow can be triggered (webhook, schedule, etc.)
  onTrigger: {
    component: "crossFlow", // The component that initiates this flow
    key: "crossFlow", // The specific trigger or action used
    values: {},
  },
  onExecution: async (context, params) => {
    const { configVars } = context;

    /* This string is the name of the branch that this conditional block resolves to. */
    let branchOnExpression: string;
    if (!evaluatesNull(params.onTrigger.results.body.data.hubspotTokenId)) {
      const populateData = await context.components.code.runCode({
        code: `module.exports = async ({ logger, configVars }, stepResults) => {
  try {
    const payloadList = stepResults?.generatePayloadGooglesheet?.results?.deals || [];
    const fieldSettings = configVars['Setting Up Google Sheets Page'];
    const clientName = stepResults?.crossFlow?.results?.body?.data?.clientName;
    const clientSettings = fieldSettings?.find(item => item?.clientName === clientName);

    const spreadsheetId = stepResults?.crossFlow?.results?.body?.data?.spreadsheetId;
    const sheetName = clientSettings?.worksheetTabName;
    const accessToken = configVars["Google Sheets Connection"]?.token?.access_token;

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (isNaN(date)) return dateStr; // fallback to original if invalid
      return \`\${date.getMonth() + 1}/\${date.getDate()}/\${date.getFullYear()}\`;
    };

    // Helper: normalize string for comparison
    const normalize = (str) => str?.toLowerCase().replace(/[\\s_]/g, "") || "";

    // 1. Get the first row (header labels) from the sheet
    const headerRes = await fetch(
      \`https://sheets.googleapis.com/v4/spreadsheets/\${spreadsheetId}/values/\${sheetName}!1:1\`,
      {
        method: "GET",
        headers: { Authorization: \`Bearer \${accessToken}\` },
      }
    );

    if (!headerRes.ok) {
      const err = await headerRes.text();
      throw new Error(\`Failed to fetch headers: \${err}\`);
    }

    const headerData = await headerRes.json();
    const headers = headerData?.values?.[0] || [];

    // Precompute normalized keys per deal for efficiency
    const normalizeKeys = (obj) =>
      Object.entries(obj).map(([k, v]) => [normalize(k), k, v]);

    const isLikelyDate = (str) => {
      if (typeof str !== "string") return false;
      const trimmed = str.trim();

      if (/^\\d+$/.test(trimmed)) return false; // reject pure numbers
      const isoPattern = /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?Z$/;
      if (isoPattern.test(trimmed)) return true;
      const datePattern = /^(\\d{1,4}[-/]\\d{1,2}[-/]\\d{1,4}|\\d{1,2}[-/]\\d{1,2}[-/]\\d{2,4})$/;
      if (!datePattern.test(trimmed)) return false;

      return !isNaN(Date.parse(trimmed));
    };

    // 2. Map payloadList to rows based on headers order with optimized matching
    const sheetRows = payloadList.map((deal) => {
      const keys = normalizeKeys(deal);
      return headers.map((header) => {
        if (!header?.trim()) return ""; // skip blank header
        const normalizedHeader = normalize(header);

        // Try exact match
        let match = keys.find(([norm]) => norm === normalizedHeader);

        // Try strict fuzzy match (whole word)
        if (!match) {
          match = keys.find(([norm]) =>
            new RegExp(\`\\\\b\${normalizedHeader}\\\\b\`).test(norm)
          );
        }

        // Fall back to loose fuzzy match
        if (!match) {
          match = keys
            .filter(([norm]) =>
              norm.includes(normalizedHeader) || normalizedHeader.includes(norm)
            )
            .sort((a, b) => b[0].length - a[0].length)[0];
        }

        const value = match ? match[2] : "";
        return (typeof value === "string" && isLikelyDate(value))
          ? formatDate(value)
          : value;
      });
    });

    // 3. Write all rows at once using batchUpdate (single request)
    const batchEndpoint = \`https://sheets.googleapis.com/v4/spreadsheets/\${spreadsheetId}/values:batchUpdate\`;

    const res = await fetch(batchEndpoint, {
      method: "POST",
      headers: {
        "Authorization": \`Bearer \${accessToken}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        valueInputOption: "USER_ENTERED",
        data: [{
          range: \`\${sheetName}!A2\`,
          values: sheetRows
        }]
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      logger.error(\`❌ Failed to batch update data: \${res.status} - \${errorText}\`);
      throw new Error("Google Sheets batch update failed.");
    }

    logger.info(\`✅ Successfully wrote \${sheetRows.length} row(s) to Google Sheet in one batch.\`);
    return { appended: sheetRows.length };

  } catch (error) {
    logger.error(\`⚠️ Error in Google Sheets export: \${error.message}\`);
    throw error;
  }
};
`,
      });
      branchOnExpression = "Hubspot Token Found";
    } else {
      branchOnExpression = "Else";
    }
    const stopExecution = await context.components.stopExecution.stopExecution({
      contentType: "application/json",
      headers: [],
      jsonBody: "",
      statusCode: "200",
    });
    return { data: stopExecution };
  },
});

export default _011ProcessMassSyncing;
