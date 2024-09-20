import express from 'express'
import { shouldBeAdmin, shouldBeLogined } from '../controllers/test.controller.js'


const router = express.Router()


router.get('/should-be-logined', shouldBeLogined)

router.get('/should-be-admin', shouldBeAdmin)

export default router;