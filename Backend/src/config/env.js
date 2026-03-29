import { configDotenv } from "dotenv";
configDotenv({ quiet: true });
export const ENV={
    PORT:process.env.PORT,
    DB:process.env.DB
}