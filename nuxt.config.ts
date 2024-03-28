// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiToken: process.env.BLYNK_AUTH_TOKEN,
  },
  css: ["~/assets/scss/main.scss"],
});
