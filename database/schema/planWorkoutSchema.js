import mongoose from "mongoose"



const planWorkoutSchema = mongoose.Schema({
    workoutName: {
        type: String,
        required: true,
        trim: true,
    },
    sets:{
        type: Number,
        required: true,
    }, 
    weight: {
        type:String,
        default: "Cardio"
    },
    date: {
        type: Date,
    }
}, {
    timestamps: true
})

planWorkoutSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const planWorkout = mongoose.model("planWorkout", planWorkoutSchema)
export default planWorkout