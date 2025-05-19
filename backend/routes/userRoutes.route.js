import express from 'express'
import protectRoute from '../utils/protectRoute.js'
import { getUsersForSidebar } from '../controllers/users.controllers.js'

const router=express.Router()

router.get('/',protectRoute,getUsersForSidebar)

export default router