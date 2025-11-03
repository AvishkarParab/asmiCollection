import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { config } from "dotenv";

config(); // load .env first

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let mainWindow;
let nextProcess;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // Wait for Next.js to start
  const port = 3000;
  const url = `http://localhost:${port}/login`;

  // Start Next.js server (if not already running)
  nextProcess = spawn("npm", ["run", "start:web"], {
    cwd: __dirname,
    shell: true,
    env: process.env,
  });

  nextProcess.stdout.on("data", (data) => {
    console.log(`[Next.js] ${data}`);
    if (data.toString().includes("started server")) {
      mainWindow.loadURL(url);
    }
  });

  nextProcess.stderr.on("data", (data) => {
    console.error(`[Next.js Error] ${data}`);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    if (nextProcess) nextProcess.kill();
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
