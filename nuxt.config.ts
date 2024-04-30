// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools : { enabled: true },
  modules  : [
    '@nuxtjs/eslint-module',
  ],
  eslint: {
    fix: true,
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
