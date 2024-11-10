import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/authMiddleware.js";
import User from "../database/schema/userSchema.js";
import planWorkout from "../database/schema/planWorkoutSchema.js";
let message;


export const createWorkout = async(plan, excercises, comments)=>{

    try {
      const userToDisplay = await User.findById(userId)
      
      let planToAdd = {}
      planToAdd[plan] = {excercises, comments}

      userToDisplay.workoutPlan.forEach(element => {
        if(plan in element){
         throw new ErrorWithStatus("Plan Already Exists", 500)
        }
      });

      userToDisplay.workoutPlan.push(planToAdd)
      userToDisplay.markModified("workoutPlan")
      await userToDisplay.save()

      return{
        message: "Plan Added"
      }  

    } catch (error) {
       throw new ErrorWithStatus(error.message, 500)
    }

}

export const updateWorkout = async(plan, excercises, comments)=>{

    try {
     const userToDisplay = await User.findById(userId)

    userToDisplay.workoutPlan.forEach((element) => {
        if(element[plan]){
            element[plan] = {excercises, comments}
           userToDisplay.markModified("workoutPlan")
           message = "Plan modified"
        } else {
            message = "Plan Doesn't exist"
        }
    
    });

      await userToDisplay.save()

      return {
        message: message
      }

    } catch (error) {
       throw new ErrorWithStatus(error.message, 500)
    }

}

export const deleteWorkout = async(plan)=>{

    try {
    const userToDisplay = await User.findById(userId)
    userToDisplay.workoutPlan.forEach((element, index) => {
        if(element[plan]){
            userToDisplay.workoutPlan.splice(index,1)
           userToDisplay.markModified("workoutPlan")
        } else {
            throw new ErrorWithStatus("Plan doesn't exist", 500)
        }
    
    });

      await userToDisplay.save()

      return {
        message: "Plan Deleted"
      }

    } catch (error) {
       throw new ErrorWithStatus(error.message, 500)

    }

}

export const scheduleWorkout = async(workoutName,sets,weight, date)=>{

    try {
      const newSchedule = new planWorkout({
        workoutName,sets,weight,date
      })

      const userToDisplay = await User.findById(userId)
      userToDisplay.scheduledExcercises.push(newSchedule)
      userToDisplay.markModified("scheduledExcercises")
      await userToDisplay.save()
      
      return{
        message: "Scheduled"
      }

    } catch (error) {
   throw new ErrorWithStatus(error.message, 500)
    }

}

export const listWorkout = async()=>{

    try {
      const userToDisplay = await User.findById(userId)
      let list = userToDisplay.scheduledExcercises.sort((a,b)=>{
        return new Date(b.date) - new Date(a.date)
      })

      return {
       listOfWorkout: list
      }
        
    } catch (error) {
   throw new ErrorWithStatus(error.message, 500)
  
    }

}

export const generateWorkout = async()=>{

    try {
        
    } catch (error) {
     throw new ErrorWithStatus(error.message, 500)

    }


}