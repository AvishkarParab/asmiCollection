import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // add APIs here if needed later
});
