import { config } from "dotenv";

config();

export class Env {
    static readonly LISTEN_PORT = parseInt(process.env.LISTEN_PORT || "3000");
    
    static readonly DB_URI = process.env.DB_URI || "mongodb://localhost:27017";
    static readonly DB_USER = process.env.DB_USER  || "";
    static readonly DB_PASS = process.env.DB_PASS || "";
    static readonly DB_NAME = process.env.DB_NAME || "numerology";
}