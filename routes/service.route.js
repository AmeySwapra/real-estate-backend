import express from "express";
import { getServices, postService } from "../controllers/service.contoller.js";


const router = express();

router.post("/post-service", postService);
router.get("/get-service", getServices)


export default router;