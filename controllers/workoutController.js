import * as  workoutService from "../services/workoutService.js"


export const createWorkout = async(req, res)=>{

    try {

        const {plan, excercises, comments} = req.body
        const result = await workoutService.createWorkout(plan, excercises,comments)
        res.status(200).json(result)

    } catch (error) {
     res.status(500).json({message: error.message})
  
    }

}

export const updateWorkout = async(req, res)=>{

    try {

        const {plan, excercises, comments} = req.body
        const result = await workoutService.updateWorkout(plan, excercises,comments)
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({message: error.message})

    }

}

export const deleteWorkout = async(req, res)=>{

    try {
        const {plan} = req.body
        const result = await workoutService.deleteWorkout(plan)
        res.status(200).json(result)

    } catch (error) {
       res.status(500).json({message: error.message}) 
    }

}

export const scheduleWorkout = async(req, res)=>{

    try {
        const {workoutName, sets, weight, date} = req.body
        const result = await workoutService.scheduleWorkout(workoutName, sets, weight, date)
        res.status(200).json(result)
        
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }

}

export const listWorkout = async(req, res)=>{

    try {
        const result = await workoutService.listWorkout()
        res.status(200).json(result)       
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export const generateWorkout = async(req, res)=>{

    try {
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}