# PowerShell Commands untuk TumbuhKembangku Development

## ⚡ Untuk Windows PowerShell

### Start Development Servers

#### Method 1: Manual Commands (Recommended)

**Terminal 1 - Start Client:**
```powershell
Set-Location -Path "d:\Infinite\client"
npm start
# Akan berjalan di http://localhost:3001
```

**Terminal 2 - Start Server:**
```powershell
Set-Location -Path "d:\Infinite\server"
$env:PORT=5002
npm run dev  
# Akan berjalan di http://localhost:5002
```

#### Method 2: One-liner Commands

**Start Client:**
```powershell
Set-Location -Path "d:\Infinite\client"; npm start
```

**Start Server:**
```powershell
Set-Location -Path "d:\Infinite\server"; $env:PORT=5002; npm run dev
```

### Build Commands

**Build Client:**
```powershell
Set-Location -Path "d:\Infinite\client"; npm run build
```

**Build Server:**
```powershell
Set-Location -Path "d:\Infinite\server"; npm run build
```

**Build Both:**
```powershell
# Terminal 1
Set-Location -Path "d:\Infinite\client"; npm run build

# Terminal 2  
Set-Location -Path "d:\Infinite\server"; npm run build
```

### Install Dependencies

**Install Client Dependencies:**
```powershell
Set-Location -Path "d:\Infinite\client"; npm install
```

**Install Server Dependencies:**
```powershell
Set-Location -Path "d:\Infinite\server"; npm install
```

## ❌ Common PowerShell Errors

### Error: "The token '&&' is not a valid statement separator"
**❌ Wrong:**
```powershell
cd client && npm start
```

**✅ Correct:**
```powershell
Set-Location -Path "d:\Infinite\client"; npm start
```

### Error: "Port already in use"
**Solution:**
- Client akan otomatis suggest port lain (biasanya 3001)
- Server bisa diatur dengan `$env:PORT=5002`

## 🚀 Quick Start

```powershell
# Terminal 1 - Client
Set-Location -Path "d:\Infinite\client"; npm start

# Terminal 2 - Server  
Set-Location -Path "d:\Infinite\server"; $env:PORT=5002; npm run dev
```

**Access:**
- Client: http://localhost:3001
- Server API: http://localhost:5002

## 💡 Pro Tips

1. **Use VS Code Tasks:** `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Full Stack"
2. **Keep terminals open** untuk hot reload
3. **Check .env file** untuk environment variables
4. **Use ; (semicolon)** untuk chain commands di PowerShell, bukan &&