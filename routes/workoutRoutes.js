import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
import * as workoutController from "../controllers/workoutController.js"
import { planSchema, workoutSchema } from "../validations/authValidations.js";

const workoutRoute = Router()

workoutRoute.post("/create", authMiddleware,generateMiddleware(workoutSchema),workoutController.createWorkout)
workoutRoute.put("/update/", authMiddleware, generateMiddleware(workoutSchema), workoutController.updateWorkout)
workoutRoute.delete("/delete/", authMiddleware, workoutController.deleteWorkout)
workoutRoute.post("/schedule",authMiddleware, generateMiddleware(planSchema),workoutController.scheduleWorkout)
workoutRoute.get("/list", authMiddleware,  workoutController.listWorkout)
workoutRoute.get("generate",authMiddleware, workoutController.generateWorkout)

export default workoutRoute

