import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  DB_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 4000,
  APP_URL: process.env.APP_URL,
};

export default config;
