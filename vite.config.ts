import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Corrected path import
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import glsl from "vite-plugin-glsl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Use path.dirname()


export default defineConfig({
  // ... plugins and other config
  
  // Add this base path
  base: "/Sidescrollergame/", 

  root: path.resolve(__dirname, "client"),
  build: {
    // Change outDir to 'docs' at the project root
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
  },
  // ... assetsInclude
});