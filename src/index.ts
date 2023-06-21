import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import announcements from './routing/announcements';

const prisma = new PrismaClient();

const app = express().disable("x-powered-by");
const port = process.env.PORT || 3030;
const environment = process.env.RAILWAY_ENVIRONMENT || "local";
const host = process.env.RAILWAY_STATIC_URL || "localhost";

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

if (environment == "local")
  require("dotenv").config();

app.use('/', announcements);

app.get("/health", async (req, res) => {
  res.send("Healthpoint is running");  
});

app.listen(port, () => {
    console.log(`RoachAPI listening at http://${host}:${port}`);
});

/**
 * 
 * @returns The current environment given in the secret.
 */
export function getEnvironment() {
  return environment;
}