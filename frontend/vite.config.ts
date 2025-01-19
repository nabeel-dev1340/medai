import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../backend"),
    },
  },
  // re-routing requests from localhost:5173/api to localhost:3000/api in dev
  server: {
    proxy: {
      "/api": "http://localhost:3000/",
    },
  },
});
