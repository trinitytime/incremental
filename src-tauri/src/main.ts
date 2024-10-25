// src-tauri/src/main.ts
import { app, BrowserWindow } from '@tauri-apps/api/window';
import { preload } from './preload';

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    await mainWindow.loadURL('http://localhost:5173');
  } else {
    await mainWindow.loadFile('dist/index.html');
  }
}

app.whenReady().then(createWindow);

// Expose preload functions to the renderer
contextBridge.exposeInMainWorld('uuidAPI', preload);