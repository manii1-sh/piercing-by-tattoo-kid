import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const isProduction = process.env.NODE_ENV === "production";

// Netlify plugin is only needed for production builds.
// It causes repeated dep optimization scans on Windows dev which triggers EPERM.
const netlifyPlugin = isProduction
  ? [require("@netlify/vite-plugin-tanstack-start").default()]
  : [];

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    ...netlifyPlugin,
  ],
});
