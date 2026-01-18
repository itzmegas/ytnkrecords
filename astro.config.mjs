// @ts-check

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  image: {
    domains: ["geo-media.beatport.com", "backend.beatport.com"],
  },
  site: "https://ytnkrecords.com",
});
