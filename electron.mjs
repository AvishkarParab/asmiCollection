import { app, BrowserWindow } from "electron";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let nextProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the Next.js local server
  mainWindow.loadURL("http://localhost:3000/login");
}

app.whenReady().then(() => {
  // Start the Next.js production server
  nextProcess = spawn("npm", ["run", "start:web"], {
    cwd: __dirname,
    shell: true,
  });

  setTimeout(() => {
    createWindow();
  }, 5000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  if (nextProcess) nextProcess.kill();
});
