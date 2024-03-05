import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { serverBaseURL } from "./src/data/serverBaseURL";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: { serverBaseURL },
			},
		},
	},
});
