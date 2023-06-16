import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import announcements from './routing/announcements';

const prisma = new PrismaClient();

const app = express().disable("x-powered-by");
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));


app.use('/', announcements);
app.get("/health", async (req, res) => {
  res.send("Healthpoint is running");  
});



app.listen(Number(port), "0.0.0.0", () => {
    console.log(`RoachAPI listening at http://localhost:${port}`);
});
