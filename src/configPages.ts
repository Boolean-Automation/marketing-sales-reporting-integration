/**
 * When a customer deploys an instance of your integration,
 * they will walk through a configuration wizard. In this
 * example configuration wizard, we prompt the customer for
 * their authentication information, and then use that
 * information to fetch data for a dropdown menu.
 *
 * For more information on the code-native config wizards, see
 * https://prismatic.io/docs/integrations/code-native/config-wizard/
 */

// Import utilities for defining configuration pages and variables
// Config pages define the UI that deployers use to set up an integration
import {
  configPage,
  configVar,
  connectionConfigVar,
  dataSourceConfigVar,
} from "@prismatic-io/spectral";

// Export a collection of configuration pages
// Each page groups related settings that users fill out during deployment
export const configPages = {
  "Connection Page": configPage({
    tagline: "",
    // Elements define individual inputs or connections shown on the page
    elements: {
      '<!doctype html> <html lang="en"> <head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width,initial-scale=1" /> <title>Slack Update - v14</title> <style> /* Only class selectors — no global tag selectors */ .su-container { max-width: 800px; margin: 20px auto; font-family: system-ui, -apple-system, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial; line-height: 1.45; } .su-card { border: 1px solid #e6e6e6; border-radius: 8px; padding: 18px; } .su-header { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; } .su-badge { font-weight: 700; font-size: 14px; padding: 6px 10px; border-radius: 6px; border: 1px solid #e6e6e6; } .su-title { font-size: 18px; font-weight: 700; } .su-meta { color: #6b7280; font-size: 13px; } .su-section { margin-top: 12px; } .su-section-title { margin-bottom: 8px; } .su-list { margin: 0; padding-left: 18px; } .su-list-item { margin-bottom: 6px; } .su-note { font-size: 13px; padding: 10px; border-radius: 6px; border: 1px dashed #ececec; } .su-code { display: block; white-space: pre-wrap; word-break: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, \'Roboto Mono\', \'Courier New\', monospace; font-size: 13px; padding: 12px; border-radius: 6px; margin-top: 8px; border: 1px solid #e6e6e6; } @media (max-width: 520px) { .su-container { padding: 12px; } .su-title { font-size: 16px; } } </style> </head> <body> <div class="su-container"> <div class="su-card"> <div class="su-header"> <div class="su-badge">📣 NEW UPDATE</div> <div> <div class="su-title">V14 – Sales and Marketing Integration</div> <div class="su-meta">Date: 08/29/2025</div> </div> </div> <div class="su-section"> <div class="su-section-title"><h3>Problem</h3></div> <ul class="su-list"> <li class="su-list-item">🔸 When a deal is deleted in HubSpot, it is not deleted in Google Sheets.</li> <li class="su-list-item">🔸 When two deals are merged in HubSpot, the changes do not reflect in Google Sheets.</li> <li class="su-list-item">🔸 The tab name where data is populated was hard-coded.</li> <li class="su-list-item">🔸 Associated contacts are not yet included in the mapping for deal sync.</li> </ul> </div> <div class="su-section"> <div class="su-section-title"><h3>Solution</h3></div> <ul class="su-list"> <li class="su-list-item">🔸 Updated backend code to fetch all deleted deals, locate them by deal ID in Google Sheets, and delete the corresponding rows.</li> <li class="su-list-item">🔸 When two deals are merged, the merged deal IDs are identified, the old IDs are removed from Google Sheets, and the new merged deal is added.</li> <li class="su-list-item">🔸 Updated configuration to remove the hard-coded tab name and added associated contacts to the mapping fields.</li> <li class="su-list-item">🔸 Updated backend code to also retrieve associated contacts for each deal and map values based on the configured fields (only the contactinformation group properties are included).</li> </ul> </div> <div class="su-section"> <div class="su-section-title"><h3>Test</h3></div> <ul class="su-list"> <li class="su-list-item">🔸 Verified during development that deleting a deal in HubSpot also deletes its corresponding row in Google Sheets.</li> <li class="su-list-item">🔸 Verified during development that merging two deals deletes the old deal information and adds the new merged deal.</li> <li class="su-list-item">🔸 Verified during development that contacts can now be mapped in the configuration and that the correct data is retrieved during deal sync.</li> </ul> </div> <div class="su-section"> <div class="su-section-title"><h3>Impact / Notes</h3></div> <div class="su-note"> 🔸 Deal sync is now compatible with old templates, provided the correct tab name and required labels are present on that tab. </div> </div> </div> </div> </body> </html>':
        configVar({
          stableKey:
            "e8358f0364caa27f36612ec7ab110114ba8bcca704f90eb0d07b9689319a138c",
          dataType: "htmlElement",
          description: "",
        }),
      '<!doctype html> <html lang="en"> <head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" /> <title>Sales & Marketing Reporting</title> <style> :root { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; } body { margin: 0; padding: 24px; color: #111; } .container { max-width: 900px; margin: 0 auto; padding: 28px; border-radius: 16px; } h1 { margin-top: 0; } .video { margin: 16px 0 24px; border-radius: 12px; overflow: hidden; } .meta { font-size: 14px; color: #555; } .section { margin: 24px 0; } a.btn { display: inline-block; padding: 10px 14px; border-radius: 10px; border: 1px solid #ddd; text-decoration: none; } a.btn:hover { border-color: #aaa; } ul { margin: 8px 0 0 20px; } code { padding: 2px 6px; border-radius: 6px; } </style> </head> <body> <main class="container"> <header> <h1>Sales and Marketing Reporting Video</h1> <p>Overview of our HubSpot → Google Sheets reporting automation</p> </header> <section class="video section" aria-label="Sales and Marketing Reporting Video"> <!-- Replace the <source> src with your actual video URL or file path --> <video controls playsinline width="100%" preload="metadata" poster="" style="display:block; width:100%; height:auto;"> <source src="https://storage.googleapis.com/boolean-app-381414.appspot.com/Boolean/Configuring%20the%20Sales%20and%20Marketing%20Report%20Template%20%F0%9F%93%8A.mp4" type="video/mp4" /> Your browser does not support the video tag. </video> </section> <section class="section"> <h2>Google Drive Main Folder</h2> <p> <a class="btn" href="https://drive.google.com/drive/u/0/folders/18TiNIKf4OgvQPhgro2p6XBYXKdM-ujab?ths=true" target="_blank" rel="noopener noreferrer"> Open GDrive Folder </a> </p> </section> <section class="section"> <h2>Description</h2> <p> This automation continuously syncs all deals from <strong>HubSpot</strong> into a centralized <strong>Google Sheet</strong>. The sheet powers a built-in dashboard for clearer, more actionable reporting on deal statuses and related sales &amp; marketing metrics. </p> <h3>Key Capabilities</h3> <ul> <li>Automatic HubSpot deal sync to Google Sheets (near real-time or on schedule).</li> <li>Prebuilt dashboard for status tracking, pipeline visibility, and trend analysis.</li> <li>Single source of truth for sales and marketing teams.</li> <li>Flexible filters, charts, and summaries for quick insights.</li> </ul> <h3>Notes</h3> <ul> <li>Ensure the HubSpot token includes the <code>owner.read</code> scope.</li> <li>Use a unique Client Name so each mapping set appears correctly on the mapping page.</li> </ul> </section> </main> </body> </html>':
        configVar({
          stableKey:
            "9a216f7a26dca720028456c121a8b1372f8d81f3bb921d39f74c98f86dbf1046",
          dataType: "htmlElement",
          description: "",
        }),
      "Google Sheets Connection": connectionConfigVar({
        stableKey: "googleSheetsConnection",
        dataType: "connection",
        connection: {
          component: "googleSheets",
          key: "oauth2",
          values: {
            clientId: {
              value: process.env.GOOGLE_CLIENT_ID || "",
              permissionAndVisibilityType: "organization",
              visibleToOrgDeployer: false,
            },
            clientSecret: {
              value: process.env.GOOGLE_CLIENT_SECRET || "",
              permissionAndVisibilityType: "organization",
              visibleToOrgDeployer: false,
            },
            scopes: {
              value: "https://www.googleapis.com/auth/spreadsheets",
              permissionAndVisibilityType: "organization",
              visibleToOrgDeployer: false,
            },
          },
        },
      }),
      "Google Drive Connection": connectionConfigVar({
        stableKey: "googleDriveConnection",
        dataType: "connection",
        connection: {
          component: "googleDrive",
          key: "oauth2",
          values: {
            clientId: {
              value: process.env.GOOGLE_CLIENT_ID || "",
              permissionAndVisibilityType: "organization",
              visibleToOrgDeployer: false,
            },
            clientSecret: {
              value: process.env.GOOGLE_CLIENT_SECRET || "",
              permissionAndVisibilityType: "organization",
              visibleToOrgDeployer: false,
            },
            scopes: {
              value:
                "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.activity.readonly",
              permissionAndVisibilityType: "organization",
              visibleToOrgDeployer: false,
            },
          },
        },
      }),
      "Main Gdrive Folder ID": configVar({
        stableKey: "mainGdriveFolderId",
        dataType: "string",
        description:
          "This Google Drive folder serves as the central repository for all customer files.",
        permissionAndVisibilityType: "embedded",
        defaultValue: "18TiNIKf4OgvQPhgro2p6XBYXKdM-ujab",
      }),
    },
  }),
  "Setting Up Google Sheets Page": configPage({
    tagline: "",
    // Elements define individual inputs or connections shown on the page
    elements: {
      "Setting Up Google Sheets Page": dataSourceConfigVar({
        stableKey: "settingUpGoogleSheetsPage",
        dataType: "jsonForm",
        dataSource: {
          component: "code",
          key: "runCodeJsonForm",
          values: {
            code: {
              value: `module.exports = async (context, { connection, contextValue }) => {
    const googleDriveAccessToken = connection?.token?.access_token;
    const folderId = contextValue;

    const driveFiles = await fetch(
        \`https://www.googleapis.com/drive/v3/files?q='\${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name,trashed)\`,
        {
            method: "GET",
            headers: {
                Authorization: \`Bearer \${googleDriveAccessToken}\`,
                "Content-Type": "application/json",
            },
        }
    );


    const fileResults = await driveFiles.json();

    const spreadsheetOptions = (fileResults.files || [])
        .filter((file) => !file.trashed) // Exclude deleted files
        .map((file) => ({
            const: file.id,
            title: file.name,
        }));

    const schema = {
        type: "array",
        items: {
            type: "object",
            properties: {
                clientName: {
                    type: "string",
                },
                spreadsheetId: {
                    type: "string",
                    oneOf: spreadsheetOptions,
                },
                worksheetTabName: {
                    type: "string",
                    defaultValue: "Clean",
                },
                hubspotPrivateAppToken: {
                    type: "string",
                },
            },
            required: [
                "clientName",
                "spreadsheetId",
                "worksheetTabName",
                "hubspotPrivateAppToken",
            ],
        },
    };

    const uiSchema = {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#",
                options: {
                    showSortButtons: true,
                },
            },
        ],
    };

    const data = [];

    return Promise.resolve({
        schema,
        uiSchema,
        data,
    });
};
`,
            },
            connection: {
              configVar: "Google Drive Connection",
            },
            contextValue: {
              configVar: "Main Gdrive Folder ID",
            },
          },
        },
      }),
    },
  }),
  "Field Manipulation": configPage({
    tagline: "",
    // Elements define individual inputs or connections shown on the page
    elements: {
      '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Field Logic Summary</title> <style> body { font-family: Arial, sans-serif; padding: 2rem; max-width: 800px; margin: auto; } h1 { display: flex; align-items: center; font-size: 1.5rem; } h1::before { content: "🛠️"; margin-right: 0.5rem; } .field-block { padding: 1rem; border-left: 5px solid #007bff; margin-bottom: 1rem; box-shadow: 0 0 8px rgba(0, 0, 0, 0.05); } .field-block h2 { margin-top: 0; font-size: 1.2rem; } ul { margin: 0.5rem 0 0 1.25rem; } .note { border-left: 4px solid #ffc107; padding: 0.75rem; margin-top: 1rem; font-style: italic; } .required-label { border-left: 4px solid #28a745; padding: 0.75rem; margin-top: 1.5rem; } .required-label p { margin: 0.25rem 0 0.75rem 0; font-style: italic; } </style> </head> <body> <h1>Field Logic Summary</h1> <div class="field-block"> <h2>✅ WON DATE</h2> <ul> <li>Ignore Won Date mapping if Deal is NOT in Won Stage.</li> <li>Only apply if the Pipeline is “Sales” AND Stage is “Won”.</li> <li><strong>Then:</strong> Use Close Date.</li> <li><strong>Otherwise:</strong> Set as <code>null</code>.</li> </ul> </div> <div class="field-block"> <h2>✅ CHANGE ORDERS</h2> <ul> <li><strong>Hard Coded:</strong></li> <li>Don’t add Create Date.</li> <li>Don’t add Estimate Date.</li> </ul> </div> <div class="required-label"> <h2>Required Label</h2> <p>The following labels must be present as column headers in the Google Sheet:</p> <ul> <li>Amount</li> <li>Contract Type</li> <li>Deal Owner</li> <li>Won Date</li> <li>Estimate Date</li> <li>Create Date</li> </ul> </div> <div class="note"> There are some fields that are not necessary to map, but due to Prismatic\'s current limitations, please map them to their appropriate fields where required. </div> </body> </html>':
        configVar({
          stableKey:
            "d46678c523d1a95dd229de65bd429f62f50b9710dd72793a0747aef8631ffd78",
          dataType: "htmlElement",
          description: "",
        }),
      "Field Settings": dataSourceConfigVar({
        stableKey: "fieldSettings",
        dataType: "jsonForm",
        dataSource: {
          component: "code",
          key: "runCodeJsonForm",
          values: {
            code: {
              value: `module.exports = async (context, { connection, contextValue }) => {
    const googleDriveAccessToken = connection?.token?.access_token;
    const clients = contextValue || [];

    const schema = {
        type: "object",
        properties: {},
    };

    const uiSchema = {
        type: "Categorization",
        elements: [],
    };

    const data = {};

    const REQUIRED_HEADERS = [
        "Amount",
        "Deal Owner",
        "Won Date",
        "Create Date",
        "Estimate Date",
        "Contract Type",
    ];

    for (let client of clients) {
        const headers = {
            Authorization: \`Bearer \${client.hubspotPrivateAppToken}\`,
            "Content-Type": "application/json",
        };

        // Fetch both deal and contact properties
        const [dealProps, contactProps] = await Promise.all([
            fetch("https://api.hubapi.com/crm/v3/properties/deals", {
                headers,
            }).then((r) => r.json()),
            fetch("https://api.hubapi.com/crm/v3/properties/contacts", {
                headers,
            }).then((r) => r.json()),
        ]);

        // Filter out analytics history from deals
        const dealFields = (dealProps.results || []).filter(
            (p) => p.groupName !== "analytics_history"
        );
        const dealPropNames = new Set(dealFields.map((p) => p.name));
        // You can also filter contact properties if needed
        const contactFields = (contactProps.results || [])
            .filter((p) => p.groupName === "contactinformation")
            .filter((p) => !dealPropNames.has(p.name));

        console.log("contactProps:", contactProps);
        // Build a combined list
        const hubspotAccountFields = [
            // Deals
            ...dealFields.map((p) => ({
                title: \`(Deal) \${p.label} - \${p.name}\`,
                const: p.name,
            })),
            // Contacts
            ...contactFields.map((p) => ({
                title: \`(Contact) \${p.label} - \${p.name}\`,
                const: p.name,
            })),
        ].sort((a, b) => a.title.localeCompare(b.title));

        // 1) Build Google Sheets CSV export URL
        const sheetCsvUrl = \`https://docs.google.com/spreadsheets/d/\${client?.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=\${client?.worksheetTabName}\`;

        // 2) Fetch CSV with Google Drive OAuth access token
        const sheetResponse = await fetch(sheetCsvUrl, {
            headers: {
                Authorization: \`Bearer \${googleDriveAccessToken}\`,
            },
        });

        const sheetText = await sheetResponse.text();
        console.log("client:", client);
        // 3) Parse first row for destination options as objects
        let additionalFields = sheetText
            .split("\\n")[0] // first row
            .split(",") // split columns
            .map((cell) => cell.replace(/^"|"$/g, "").trim()) // remove wrapping quotes & spaces
            .filter(Boolean) // remove empty cells
            .map((title) => ({
                title,
                const: title
                    .toLowerCase()
                    .replace(/\\s+/g, "_") // spaces → underscores
                    .replace(/[^\\w_]/g, ""), // remove non-alphanumeric except underscore
            }));

        // --- NEW VALIDATION STEP ---
        const headerTitles = additionalFields.map((f) => f.title);
        const missingHeaders = REQUIRED_HEADERS.filter(
            (req) =>
                !headerTitles.some((h) => h.toLowerCase() === req.toLowerCase())
        );

        if (missingHeaders.length > 0) {
            throw new Error(
                \`Missing required Google Sheet headers for client "\${
                    client.clientName
                }": \${missingHeaders.join(", ")}\`
            );
        }
        // ---------------------------

        const makeArrayField = (fieldName) => ({
            type: "array",
            items: {
                type: "object",
                properties: {
                    [fieldName]: {
                        type: "string",
                        oneOf: hubspotAccountFields.map((hf) => ({
                            const: hf.const,
                            title: hf.title,
                        })),
                    },
                },
            },
        });

        const clientKey = client.clientName.replace(/\\s+/g, "_").toLowerCase();

        schema.properties[clientKey] = {
            type: "object",
            properties: additionalFields.reduce((acc, { const: key }) => {
                const propName = key.split(".").pop();
                acc[key] = makeArrayField(propName);
                return acc;
            }, {}),
        };

        uiSchema.elements.push({
            type: "Category",
            label: client.clientName,
            elements: additionalFields.map(({ const: key, title }) => {
                const propName = key.split(".").pop();
                return {
                    type: "ListWithDetail",
                    scope: \`#/properties/\${clientKey}/properties/\${key}\`,
                    label: \`\${title}\`,
                    options: {
                        showSortButtons: true,
                        detail: {
                            type: "VerticalLayout",
                            elements: [
                                {
                                    type: "Control",
                                    scope: \`#/properties/\${propName}\`,
                                    label: title,
                                    options: { autocomplete: true },
                                },
                            ],
                        },
                    },
                };
            }),
        });

        data[clientKey] = {
            deal_id: [{ deal_id: "hs_object_id" }], // auto-mapped
            amount: [{ amount: "amount" }], // auto-mapped
            deal_owner: [{ deal_owner: "hubspot_owner_id" }], // auto-mapped
            won_date: [{ won_date: "closedate" }], // auto-mapped
            createdate: [{ createdate: "createdate" }], // auto-mapped
        };
    }

    return { schema, uiSchema, data };
};
`,
            },
            connection: {
              configVar: "Google Sheets Connection",
            },
            contextValue: {
              configVar: "Setting Up Google Sheets Page",
            },
          },
        },
      }),
    },
  }),
  "Final Setup Instructions": configPage({
    tagline: "",
    // Elements define individual inputs or connections shown on the page
    elements: {
      '<!doctype html> <html lang="en"> <head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width,initial-scale=1" /> <title>Video Instruction — Boolean Setup</title> </head> <body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,\'Helvetica Neue\',Arial;margin:20px;background:#f7f7f8;color:#111;"> <main style="max-width:880px;margin:0 auto;background:white;padding:18px;border-radius:12px;box-shadow:0 6px 18px rgba(12,14,20,0.06);"> <h1 style="font-size:20px;margin:0 0 12px;">Boolean — Final Setup for Sales &amp; Marketing (Instructional Video)</h1> <p style="margin:0 0 16px;line-height:1.45">Watch the video below for step-by-step instructions.</p> <div> <video controls preload="metadata" style="width:100%;border-radius:8px;background:#000;"> <source src="https://storage.googleapis.com/boolean-app-381414.appspot.com/Boolean/Final%20Setup%20for%20Sales%20and%20Marketing%20Template.mp4" type="video/mp4"> Your browser does not support the video tag. </video> </div> </main> </body> </html>':
        configVar({
          stableKey:
            "acb58477f3781aa72db205cdacdab1b26d203639e172e1c70b13892addef302d",
          dataType: "htmlElement",
          description: "",
        }),
    },
  }),
};
