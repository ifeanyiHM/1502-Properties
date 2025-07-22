import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/")[1].split("/");
            const name = parts[0].startsWith("@")
              ? `${parts[0]}/${parts[1]}`
              : parts[0];
            return `vendor-${name}`;
          }
        },
      },
    },
  },
});
