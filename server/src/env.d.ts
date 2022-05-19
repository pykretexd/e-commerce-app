declare namespace NodeJS {
  export interface ProcessEnv {
    STRIPE_SK_KEY: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    DB_SECRET: string;
  }
}
