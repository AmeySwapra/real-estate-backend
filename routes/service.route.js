import express from "express";
import { dropService, editService, getServices, postService } from "../controllers/service.contoller.js";


const router = express();

router.post("/post-service", postService);
router.get("/get-service", getServices);
router.put("/edit-service", editService);
router.delete("/delete-service", dropService)


export default router;