/**
 * Your code-native integration can invoke existing connectors.
 * This is where you declare which connectors your code-native
 * integration uses.
 *
 * For more information, see
 * https://prismatic.io/docs/integrations/code-native/existing-components/
 */

// Import helper for defining which components are available to this integration
import { componentManifests } from "@prismatic-io/spectral";

// Import individual component manifests
// Each provides a bundle of actions/triggers usable within your flows
import managementTriggers from "@component-manifests/management-triggers";
import code from "@component-manifests/code";
import crossFlow from "@component-manifests/cross-flow";
import stopExecution from "@component-manifests/stop-execution";
import scheduleTriggers from "@component-manifests/schedule-triggers";
import datetime from "@component-manifests/datetime";
import googleSheets from "@component-manifests/google-sheets";
import googleDrive from "@component-manifests/google-drive";

// Register all imported components so they can be used by your integration's flows
export const componentRegistry = componentManifests({
  managementTriggers,
  code,
  crossFlow,
  stopExecution,
  scheduleTriggers,
  datetime,
  googleSheets,
  googleDrive,
});
