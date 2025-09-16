# Mario/Limbo Style Side-Scrolling Platformer Game

A fun Mario/Limbo inspired side-scrolling platformer built with HTML5 Canvas, TypeScript, and React. Features a red Mario-like character, enemy AI, platform collision detection, and mobile-friendly touch controls perfect for sharing on WhatsApp!

## 🎮 Game Features

- **Mario-style Character**: Red character with hat and mustache
- **Side-scrolling Camera**: Smooth camera that follows the player
- **Platform System**: Ground platforms, floating platforms, and brick blocks
- **Enemy AI**: Goomba-like enemies with movement patterns
- **Collision Detection**: AABB collision system
- **Touch Controls**: Mobile-friendly controls for WhatsApp sharing
- **Keyboard Controls**: WASD or Arrow keys + Spacebar for desktop
- **Game States**: Score tracking, lives system, and game over screen
- **Responsive Design**: Works on all devices

## 🚀 Getting Started with VS Code

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** - [Download here](https://code.visualstudio.com/)

### 1. Clone or Download the Project

**Option A: Clone from GitHub (if already uploaded)**
```bash
git clone https://github.com/vivlucykumar/Sidescrollergame.git
cd Sidescrollergame
```

**Option B: Create new project folder**
```bash
mkdir Sidescrollergame
cd Sidescrollergame
# Copy all the project files here
```

### 2. Open in VS Code

```bash
code .
```

Or open VS Code and use `File > Open Folder` to select your project folder.

### 3. Install Dependencies

Open the terminal in VS Code (`Terminal > New Terminal`) and run:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The game will start running at `http://localhost:5000`

### 5. VS Code Extensions (Recommended)

Install these VS Code extensions for better development experience:
- **TypeScript Importer**
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

## 🎯 How to Play

### Desktop Controls
- **Arrow Keys** or **WASD**: Move left/right
- **Spacebar**: Jump
- **Goal**: Jump on enemies to defeat them, avoid touching them from the side

### Mobile Controls
- **Left/Right Buttons**: Move character
- **JUMP Button**: Make the character jump
- **Touch-friendly**: Optimized for mobile devices and WhatsApp sharing

## 🌐 Deploy to GitHub and Internet

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click **"New Repository"**
3. Name it `Sidescrollergame` 
4. Make it **Public** (so it can be deployed for free)
5. Click **"Create Repository"**

### Step 2: Upload Your Code to GitHub

In your VS Code terminal, run these commands:

```bash
# Initialize Git (if not already done)
git init

# Add your GitHub repository as origin
git remote add origin https://github.com/vivlucykumar/Sidescrollergame.git

# Add all files
git add .

# Commit your code
git commit -m "Add Mario/Limbo side-scrolling platformer game"

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy to the Internet (Free Options)

Choose one of these free hosting platforms:

#### Option A: Vercel (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click **"New Project"**
4. Import your `Sidescrollergame` repository
5. **Framework Preset**: Vite
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist/public`
8. Click **"Deploy"**
9. Your game will be live at `https://sidescrollergame.vercel.app` (or similar)

#### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Click **"New site from Git"**
4. Choose your `Sidescrollergame` repository
5. **Build command**: `npm run build`
6. **Publish directory**: `dist/public`
7. Click **"Deploy site"**
8. Your game will be live at a Netlify URL

#### Option C: GitHub Pages

1. In your GitHub repository, go to **Settings**
2. Scroll down to **Pages** section
3. Source: **Deploy from a branch**
4. Branch: **main** (you'll need to build first)
5. First, you need to modify your build process:

Add this to your `package.json` scripts:
```json
"build:gh-pages": "vite build --base=/Sidescrollergame/ && cp -r dist/public/* ."
```

Then run:
```bash
npm run build:gh-pages
git add .
git commit -m "Build for GitHub Pages"
git push
```

Your game will be live at `https://vivlucykumar.github.io/Sidescrollergame/`

## 📱 Sharing on WhatsApp

Once deployed, you can share the live URL directly in WhatsApp:

1. Copy your live game URL (from Vercel, Netlify, or GitHub Pages)
2. Share in WhatsApp: `"Check out this cool Mario-style game I built! [URL]"`
3. The game works perfectly on mobile devices with touch controls

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript checks

## 🏗️ Project Structure

```
Sidescrollergame/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── game/          # Game engine files
│   │   ├── components/    # React components
│   │   └── ...
│   └── public/            # Static assets
├── server/                # Backend Express server
├── shared/                # Shared types
└── ...                   # Config files
```

## 🎨 Customization

### Adding New Levels
Edit `client/src/game/Level.ts` to add new platforms and obstacles.

### Changing Character Appearance
Modify `client/src/game/Player.ts` in the `render()` method.

### Adding New Enemies
Create new enemy types in `client/src/game/Enemy.ts`.

### Adding Sounds
Place audio files in `client/public/sounds/` and reference them in the game engine.

## 🐛 Troubleshooting

### Port Already in Use
If you get "port already in use" error:
```bash
# Kill any process using port 5000
lsof -ti:5000 | xargs kill -9
# Then try again
npm run dev
```

### Build Errors
Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Game Not Loading
Check the browser console for errors (F12 > Console tab).

## 📄 License

MIT License - feel free to modify and share!

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy your Mario/Limbo side-scrolling platformer game! 🎮**