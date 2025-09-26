# TumbuhKembangku - Child Development Tracking Platform

**TumbuhKembangku** adalah platform monitoring perkembangan anak berbasis web yang dilengkapi dengan sistem KPSP (Kuesioner Pra Skrining Perkembangan) untuk membantu orang tua memantau tumbuh kembang anak mereka secara komprehensif.

## 🚀 Tech Stack

### Frontend
- **React 18** dengan TypeScript
- **Tailwind CSS** untuk styling
- **Lucide React** untuk icons
- **React Router** untuk navigation
- **React Hook Form** untuk form management
- **Chart.js** untuk visualisasi data
- **jsPDF** untuk export laporan
- **date-fns** untuk date utilities

### Backend  
- **Node.js** dengan Express
- **TypeScript** untuk type safety
- **CORS** untuk cross-origin requests
- **Helmet** untuk security headers
- **Morgan** untuk logging

## 📁 Struktur Project

```
/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── ...
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── models/       # Data models
│   │   └── ...
│   └── package.json
├── shared/               # Shared types and utilities
└── package.json         # Root package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd <project-name>
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
npm run install-client

# Install server dependencies
npm run install-server
```

## 🚀 Development

### Start Development Servers

#### Method 1: PowerShell Commands (Windows)

**Terminal 1 - Client:**
```powershell
Set-Location -Path "d:\Infinite\client"
npm start
# Runs on http://localhost:3001
```

**Terminal 2 - Server:**
```powershell
Set-Location -Path "d:\Infinite\server"
$env:PORT=5002
npm run dev
# Runs on http://localhost:5002
```

#### Method 2: VS Code Tasks
```
Ctrl+Shift+P → "Tasks: Run Task" → "Start Full Stack"
```

#### Method 3: Manual One-liners
```powershell
# Client
Set-Location -Path "d:\Infinite\client"; npm start

# Server  
Set-Location -Path "d:\Infinite\server"; $env:PORT=5002; npm run dev
```

### Environment Variables

#### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5002
GENERATE_SOURCEMAP=false
```

## 🌐 Endpoints

### API Endpoints
- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Application URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📝 Available Scripts

### Root Package
- `npm run dev` - Run both client and server
- `npm run client` - Run client only
- `npm run server` - Run server only
- `npm run install-all` - Install all dependencies
- `npm run build` - Build client for production

### Client Package
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server Package
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run build` - Build TypeScript to JavaScript

## 🎨 Styling

Project ini menggunakan **Tailwind CSS** untuk styling. Konfigurasi Tailwind dapat ditemukan di `client/tailwind.config.js`.

### Utility Classes yang Sering Digunakan
- Layout: `container`, `mx-auto`, `flex`, `grid`
- Spacing: `p-4`, `m-6`, `space-x-4`
- Typography: `text-xl`, `font-bold`, `text-center`
- Colors: `bg-blue-600`, `text-white`, `border-gray-200`

## 🔧 Development Tips

### Adding New Components
1. Buat file component di `client/src/components/`
2. Export component dari file
3. Import dan gunakan di halaman atau component lain

### Adding New API Routes
1. Buat controller di `server/src/controllers/`
2. Buat route di `server/src/routes/`
3. Register route di `server/src/index.ts`

### Environment Variables
- Client: Gunakan `REACT_APP_` prefix
- Server: Tambahkan di file `.env`

## 🚀 Deployment

### Vercel (Frontend)
1. Connect repository ke Vercel
2. Set build command: `npm run build`
3. Set output directory: `client/build`

### Heroku (Backend)
1. Create Heroku app
2. Set buildpacks untuk Node.js
3. Configure environment variables
4. Deploy dari Git

## 📚 Learn More

### React
- [React Documentation](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)

### Node.js
- [Express.js](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)

### Styling
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind UI Components](https://tailwindui.com/)

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.