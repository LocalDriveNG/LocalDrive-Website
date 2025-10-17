// vite.config.ts
import { defineConfig } from "file:///mnt/c/Users/Lagoon/Desktop/Ekene's%20Files/LocalDrive-Website-1/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/Users/Lagoon/Desktop/Ekene's%20Files/LocalDrive-Website-1/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///mnt/c/Users/Lagoon/Desktop/Ekene's%20Files/LocalDrive-Website-1/node_modules/lovable-tagger/dist/index.js";
import sitemap from "file:///mnt/c/Users/Lagoon/Desktop/Ekene's%20Files/LocalDrive-Website-1/node_modules/vite-plugin-sitemap/dist/index.js";
var __vite_injected_original_dirname = "/mnt/c/Users/Lagoon/Desktop/Ekene's Files/LocalDrive-Website-1";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemap({
      hostname: "https://localdriveapp.com",
      outDir: "dist"
      // where vite build outputs
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("@radix-ui")) {
              if (id.includes("react-accordion") || id.includes("react-tabs") || id.includes("react-collapsible")) {
                return "vendor-radix-layout";
              }
              if (id.includes("react-dropdown-menu") || id.includes("react-context-menu") || id.includes("react-menubar")) {
                return "vendor-radix-menus";
              }
              if (id.includes("react-dialog") || id.includes("react-alert-dialog") || id.includes("react-popover")) {
                return "vendor-radix-overlays";
              }
              if (id.includes("react-select") || id.includes("react-checkbox") || id.includes("react-radio-group")) {
                return "vendor-radix-forms";
              }
              if (id.includes("react-toast") || id.includes("react-tooltip") || id.includes("react-hover-card")) {
                return "vendor-radix-feedback";
              }
              return "vendor-radix-misc";
            }
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("framer-motion")) return "vendor-animations";
            if (id.includes("recharts")) return "vendor-charts";
            if (id.includes("@tanstack/react-query")) return "vendor-query";
            if (id.includes("react-day-picker") || id.includes("date-fns"))
              return "vendor-dates";
            if (id.includes("embla-carousel-react")) return "vendor-carousel";
            if (id.includes("@supabase/supabase-js")) return "vendor-supabase";
            const match = id.match(/node_modules\/([^/]+)/);
            if (match) {
              return `vendor-${match[1].replace(/[^a-zA-Z0-9]/g, "-")}`;
            }
          }
          if (id.includes("src/pages/") || id.includes("src/routes/")) {
            const match = id.match(/src\/(pages|routes)\/([^/]+)/);
            if (match) {
              return `page-${match[2]}`;
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    // Increased limit
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvTGFnb29uL0Rlc2t0b3AvRWtlbmUncyBGaWxlcy9Mb2NhbERyaXZlLVdlYnNpdGUtMVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9jL1VzZXJzL0xhZ29vbi9EZXNrdG9wL0VrZW5lJ3MgRmlsZXMvTG9jYWxEcml2ZS1XZWJzaXRlLTEvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL0xhZ29vbi9EZXNrdG9wL0VrZW5lJ3MlMjBGaWxlcy9Mb2NhbERyaXZlLVdlYnNpdGUtMS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIlxyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXHJcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiXHJcbmltcG9ydCBzaXRlbWFwIGZyb20gXCJ2aXRlLXBsdWdpbi1zaXRlbWFwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA4MDgwLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcclxuICAgIHNpdGVtYXAoe1xyXG4gICAgICBob3N0bmFtZTogXCJodHRwczovL2xvY2FsZHJpdmVhcHAuY29tXCIsXHJcbiAgICAgIG91dERpcjogXCJkaXN0XCIsIC8vIHdoZXJlIHZpdGUgYnVpbGQgb3V0cHV0c1xyXG4gICAgfSksXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xyXG4gICAgICAgICAgICAvLyBSZWFjdCBjb3JlIChsYXJnZXN0LCBrZWVwIHNlcGFyYXRlKVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJyZWFjdFwiKSB8fCBpZC5pbmNsdWRlcyhcInJlYWN0LWRvbVwiKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBcInZlbmRvci1yZWFjdFwiXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJhZGl4IFVJIC0gc3BsaXQgaW50byBzbWFsbGVyIGdyb3Vwc1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJAcmFkaXgtdWlcIikpIHtcclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcInJlYWN0LWFjY29yZGlvblwiKSB8fFxyXG4gICAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJyZWFjdC10YWJzXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcInJlYWN0LWNvbGxhcHNpYmxlXCIpXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3ItcmFkaXgtbGF5b3V0XCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJyZWFjdC1kcm9wZG93bi1tZW51XCIpIHx8XHJcbiAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcInJlYWN0LWNvbnRleHQtbWVudVwiKSB8fFxyXG4gICAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJyZWFjdC1tZW51YmFyXCIpXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3ItcmFkaXgtbWVudXNcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhcInJlYWN0LWRpYWxvZ1wiKSB8fFxyXG4gICAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJyZWFjdC1hbGVydC1kaWFsb2dcIikgfHxcclxuICAgICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwicmVhY3QtcG9wb3ZlclwiKVxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yLXJhZGl4LW92ZXJsYXlzXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJyZWFjdC1zZWxlY3RcIikgfHxcclxuICAgICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwicmVhY3QtY2hlY2tib3hcIikgfHxcclxuICAgICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwicmVhY3QtcmFkaW8tZ3JvdXBcIilcclxuICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInZlbmRvci1yYWRpeC1mb3Jtc1wiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwicmVhY3QtdG9hc3RcIikgfHxcclxuICAgICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwicmVhY3QtdG9vbHRpcFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJyZWFjdC1ob3Zlci1jYXJkXCIpXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3ItcmFkaXgtZmVlZGJhY2tcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3ItcmFkaXgtbWlzY1wiXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyIGxhcmdlIGxpYnJhcmllc1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJsdWNpZGUtcmVhY3RcIikpIHJldHVybiBcInZlbmRvci1pY29uc1wiXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImZyYW1lci1tb3Rpb25cIikpIHJldHVybiBcInZlbmRvci1hbmltYXRpb25zXCJcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwicmVjaGFydHNcIikpIHJldHVybiBcInZlbmRvci1jaGFydHNcIlxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIikpIHJldHVybiBcInZlbmRvci1xdWVyeVwiXHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0LWRheS1waWNrZXJcIikgfHwgaWQuaW5jbHVkZXMoXCJkYXRlLWZuc1wiKSlcclxuICAgICAgICAgICAgICByZXR1cm4gXCJ2ZW5kb3ItZGF0ZXNcIlxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJlbWJsYS1jYXJvdXNlbC1yZWFjdFwiKSkgcmV0dXJuIFwidmVuZG9yLWNhcm91c2VsXCJcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCIpKSByZXR1cm4gXCJ2ZW5kb3Itc3VwYWJhc2VcIlxyXG5cclxuICAgICAgICAgICAgLy8gU3BsaXQgcmVtYWluaW5nIHBhY2thZ2VzIGluZGl2aWR1YWxseVxyXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IGlkLm1hdGNoKC9ub2RlX21vZHVsZXNcXC8oW14vXSspLylcclxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGB2ZW5kb3ItJHttYXRjaFsxXS5yZXBsYWNlKC9bXmEtekEtWjAtOV0vZywgXCItXCIpfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFNwbGl0IHNyYyBjb2RlIGJ5IHJvdXRlcy9wYWdlc1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwic3JjL3BhZ2VzL1wiKSB8fCBpZC5pbmNsdWRlcyhcInNyYy9yb3V0ZXMvXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaWQubWF0Y2goL3NyY1xcLyhwYWdlc3xyb3V0ZXMpXFwvKFteL10rKS8pXHJcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBgcGFnZS0ke21hdGNoWzJdfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLCAvLyBJbmNyZWFzZWQgbGltaXRcclxuICAgIHRhcmdldDogXCJlc25leHRcIixcclxuICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXHJcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgfSxcclxufSkpXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFcsU0FBUyxvQkFBb0I7QUFDM1ksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLGFBQWE7QUFK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
