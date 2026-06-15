import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import os from "os";
import path from "path";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  // Store Vite cache in OS temp dir — fixes Windows EPERM rename lock on node_modules/.vite
  cacheDir: path.join(os.tmpdir(), "vite-piercing-cache"),
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    netlify(),
  ],
});
