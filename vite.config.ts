import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from 'vite-plugin-sitemap'

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },

      plugins: [
    sitemap({
      hostname: 'https://localdriveapp.com',
      outDir: 'dist',  // where vite build outputs
    }),
  ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core (largest, keep separate)
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            
            // Radix UI - split into smaller groups
            if (id.includes('@radix-ui')) {
              if (id.includes('react-accordion') || id.includes('react-tabs') || id.includes('react-collapsible')) {
                return 'vendor-radix-layout';
              }
              if (id.includes('react-dropdown-menu') || id.includes('react-context-menu') || id.includes('react-menubar')) {
                return 'vendor-radix-menus';
              }
              if (id.includes('react-dialog') || id.includes('react-alert-dialog') || id.includes('react-popover')) {
                return 'vendor-radix-overlays';
              }
              if (id.includes('react-select') || id.includes('react-checkbox') || id.includes('react-radio-group')) {
                return 'vendor-radix-forms';
              }
              if (id.includes('react-toast') || id.includes('react-tooltip') || id.includes('react-hover-card')) {
                return 'vendor-radix-feedback';
              }
              return 'vendor-radix-misc';
            }
            
            // Other large libraries
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('framer-motion')) return 'vendor-animations';
            if (id.includes('recharts')) return 'vendor-charts';
            if (id.includes('@tanstack/react-query')) return 'vendor-query';
            if (id.includes('react-day-picker') || id.includes('date-fns')) return 'vendor-dates';
            if (id.includes('embla-carousel-react')) return 'vendor-carousel';
            if (id.includes('@supabase/supabase-js')) return 'vendor-supabase';
            
            // Split remaining packages individually
            const match = id.match(/node_modules\/([^/]+)/);
            if (match) {
              return `vendor-${match[1].replace(/[^a-zA-Z0-9]/g, '-')}`;
            }
          }
          
          // Split src code by routes/pages
          if (id.includes('src/pages/') || id.includes('src/routes/')) {
            const match = id.match(/src\/(pages|routes)\/([^/]+)/);
            if (match) {
              return `page-${match[2]}`;
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increased from 150 to 500 KB
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true,
  },
}));