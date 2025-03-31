import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import relativeLinks from "astro-relative-links";

// https://astro.build/config
export default defineConfig({
  server: {
    open: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/_mixin.scss" as *;`,
        },
      },
    },
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react(), relativeLinks()],
});
