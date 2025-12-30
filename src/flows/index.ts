import { _01OnDeploy } from "./_01OnDeploy";
import { _011ProcessMassSyncing } from "./_011ProcessMassSyncing";
import { _02SyncEvery2Minutes } from "./_02SyncEvery2Minutes";
import { _021ProcessSyncEvery5Minutes } from "./_021ProcessSyncEvery5Minutes";
import { _022ProcessUpsertData } from "./_022ProcessUpsertData";

export default [
  _01OnDeploy,
  _011ProcessMassSyncing,
  _02SyncEvery2Minutes,
  _021ProcessSyncEvery5Minutes,
  _022ProcessUpsertData,
];
