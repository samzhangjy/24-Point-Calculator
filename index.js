const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

try {
  require('electron-reloader')(module)
} catch (_) {}

function createWindow () {
  Menu.setApplicationMenu(null)
  const win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    minWidth: 500,
    minHeight: 600,
    frame: false
  })

  win.loadFile('index.html')

  ipcMain.handle('close', (event) => {
    win.close()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
