import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => ({
  base: "/", // ensure correct paths on Netlify
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react", // optional, depends on your setup
    }),
    mode === "development" && componentTagger(),
    sitemap({
      hostname: "https://localdriveapp.com",
      outDir: "dist",
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("framer-motion")) return "vendor-animations";
            if (id.includes("recharts")) return "vendor-charts";
            if (id.includes("@tanstack/react-query")) return "vendor-query";
            if (id.includes("@supabase/supabase-js")) return "vendor-supabase";

            const match = id.match(/node_modules\/([^/]+)/);
            if (match) return `vendor-${match[1].replace(/[^a-zA-Z0-9]/g, "-")}`;
          }

          // Split pages into separate chunks
          if (id.includes("src/pages/") || id.includes("src/routes/")) {
            const match = id.match(/src\/(pages|routes)\/([^/]+)/);
            if (match) return `page-${match[2]}`;
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"], // force pre-bundle core deps
  },
}));
