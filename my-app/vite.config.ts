import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@presentation": path.resolve(__dirname, "src/presentation"),
      "@shared_kernel": path.resolve(__dirname, "src/kernel/shared"),
      "@modules": path.resolve(__dirname, "src/kernel/modules"),
      "@adapters": path.resolve(__dirname, "src/kernel/adapters"),
      "@features": path.resolve(__dirname, "src/features"),
    },
  },
});
