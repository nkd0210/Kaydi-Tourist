import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000", //run on localhost
        target: "https://kaydi-tourist-backend.vercel.app", // deploy on vercel
        secure: false,
      },
    },
  },
  plugins: [react()],
});
