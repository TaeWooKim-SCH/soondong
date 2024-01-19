namespace NodeJS {
  interface ProcessEnv {
    KAKAO_CLIENT_ID: string;
    KAKAO_SECRET_ID: string;
    NEXT_AUTH_SECRET: string;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    BUSINESS_NAME: string;
    ADMIN_EMAIL: string;
    GOOGLE_APP_PASSWORD: string;
    AES_SECRET_KEY: string;
    NEXT_PUBLIC_AES_SECRET_KEY: string;
  }
}