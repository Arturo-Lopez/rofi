declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      DATABASE_URL: string;
      ENABLE_REQUEST_LOGGING: string;
      SESSION_TOKEN_SECRET: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      S3_ENDPOINT: string;
      S3_BUCKET_NAME: string;
      STRIPE_PUBLIC_KEY: string;
      STRIPE_SECRET_KEY: string;
      GOOGLE_ID: string;
    }
  }
}

export {};
