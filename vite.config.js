import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Other optimizeDeps settings...
    needsInterop: ["overlay-navbar"], // Add the problematic module here
  },


  // server: {
  //   host:true,
  //   proxy: {
  //     "/api/v1": " http://192.168.0.102:4000/",
  //   },
  // },
});
