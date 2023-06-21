import { PrismaClient } from "@prisma/client";
import express, { Router, Response, Request } from "express";
import { generateException } from "../exceptions";


const router: Router = express.Router();
const prisma = new PrismaClient();

router.get("/announcements", async (req: Request, res: Response) => {
    // Gather all announcements
    const announcements = await prisma.announcement.findMany();
    res.json(announcements);
});

router.post("/announcement", async (req: Request, res: Response) => {
    // Create a new announcement
    try {
        if (req.body.title && req.body.content && req.body.userId) {
            const title = String(req.body.title);
            const content = String(req.body.content);
            const userId = Number(req.body.userId);
            const announcement = await prisma.announcement.create({
                data: {
                    title, content, userId
                }
            });
            res.json(announcement);
        } else {
            res.status(400).send("The following are required: content, title, userId (Roach)");
        }
    } catch (e: any) {
        generateException(res, e);
    }
});


router.delete("/announcement", async (req: Request, res: Response) => {
    try {
        if (req.body.id) {
            const id = Number(req.body.id);
            const deletedAnnouncement = await prisma.announcement.delete({
                where: {
                    id
                }
            });
            res.json(deletedAnnouncement);
        } else {
            res.status(400).send("This API requires: id");
        }
    } catch (e: any) {
        generateException(res, e);
    }
});

export default router;