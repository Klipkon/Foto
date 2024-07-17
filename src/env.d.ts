/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly PUBLIC_STRAPI_URL: string;
  readonly STRAPI_API_TOKEN: string;
  readonly PUBLIC_GOOGLE_RECAPTCHA_SECRET: string;
}
