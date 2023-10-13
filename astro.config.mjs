import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/_mixin.scss" as *;`,
        }
      }
    }
  },
  integrations: [react(), relativeLinks()]
});
