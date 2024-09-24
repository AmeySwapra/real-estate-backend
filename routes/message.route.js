import express from 'express'
import { getMessage, postMessage } from '../controllers/message.controller';


const router = express();

router.post("/post-message", postMessage)

router.get('/get-message', getMessage)


export default router