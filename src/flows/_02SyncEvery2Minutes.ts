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
export const _02SyncEvery2Minutes = flow({
  // Core metadata about the flow (name, stable key, description)
  name: "02 Sync every 2 minutes",
  stableKey: "02-sync-every-2-minutes",
  description: "",
  endpointSecurityType: "customer_optional",
  schedule: {
    value: "*/2 * * * *",
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
      const invoke021 = await context.components.crossFlow.invokeFlow({
        data: loopOverItemsItem,
        flowName: "02.1 Process Sync Every 5 Minutes",
      });

      loopOverItems.data.push(invoke021.data);
    }

    return { data: loopOverItems };
  },
});

export default _02SyncEvery2Minutes;
