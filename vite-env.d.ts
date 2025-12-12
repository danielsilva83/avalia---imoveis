declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string | undefined;
    [key: string]: string | undefined;
  }
}
