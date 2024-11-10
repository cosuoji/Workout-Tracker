import mongoose from "mongoose";
import dotenv from "dotenv"
import Excercise from "../database/schema/workoutSchema.js";


dotenv.config()
const {MONGODB_URI} = process.env

async function seedWorkouts(workOutname,workoutDescription,workoutCategory, workoutGroup){
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    //check if the workout exists
    const existingWorkout =  await Excercise.findOne({name: workOutname})

    if(!existingWorkout){
        //create workout information 
        const workoutInformation = {
            name: workOutname,
            description: workoutDescription, 
            category: workoutCategory,
            muscleGroup: workoutGroup
        }
     await Excercise.create(workoutInformation)
     console.log("Workout Created Succesfully")
  }  else {
    console.log("Workout already exists");
  }

// Close the database connection
//   await mongoose.disconnect();
}

seedWorkouts("Lunges", "Lunges and Things", "Cardio", "Legs").then(()=>{
  console.log("Workout seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding workout:", err);
  process.exit(1);
});

seedWorkouts("DeadLifts", "Deadlifs and Things", "Strength", "Arms").then(()=>{
  console.log("Workout seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding workout:", err);
  process.exit(1);
});