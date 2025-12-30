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
export const _01OnDeploy = flow({
  // Core metadata about the flow (name, stable key, description)
  name: "01 On deploy",
  stableKey: "01-on-deploy",
  description: "",
  endpointSecurityType: "customer_optional",
  // Define how this flow can be triggered (webhook, schedule, etc.)
  onTrigger: {
    component: "managementTriggers", // The component that initiates this flow
    key: "instanceDeploy", // The specific trigger or action used
    values: {},
  },
  onExecution: async (context, params) => {
    const { configVars } = context;
    const getConfigVariables = await context.components.code.runCode({
      code: `module.exports = async ({ logger, configVars }, stepResults) => {
  let initalConfigData  = configVars["Setting Up Google Sheets Page"]
  let overrideData = []

  for(let item of initalConfigData){
      overrideData.push({
        ...item,
        clientVariableName:item?.clientName?.replace(/\\s+/g, "_")?.toLowerCase()
      })
  }

  return { data: overrideData };
};
`,
    });
    const loopOverItems: { data: unknown[] } = { data: [] };
    for (const loopOverItemsItem of getConfigVariables.data) {
      const processMassImport = await context.components.crossFlow.invokeFlow({
        data: loopOverItemsItem,
        flowName: "01.1 Process Mass Syncing",
      });

      loopOverItems.data.push(processMassImport.data);
    }

    return { data: loopOverItems };
  },
});

export default _01OnDeploy;
