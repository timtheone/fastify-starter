declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: number;
      HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      DATABASE_URL: string;
    }
  }
}

export {};
