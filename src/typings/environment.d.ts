declare global {
  namespace NodeJS {
    interface ProcessEnv {
      INSTANCE_ID: string;
      NODE_ENV: "development" | "production";
      SERVER_PORT: string;
      LOCATION: string;
      EMAIL_PASS: string;
    }
  }
}

export {};
