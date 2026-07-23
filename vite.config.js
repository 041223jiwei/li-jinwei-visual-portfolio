import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs keep the build portable across GitHub Pages and Sites.
  base: "./",
  build: {
    target: "es2020",
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        portfolioPdf: resolve(__dirname, "portfolio-pdf.html"),
      },
    },
  },
});
