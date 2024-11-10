import mongoose from "mongoose"

const excerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String, 
    }, 
    category: {
        type:String,
        //cardio, strength, flexibility
        default: "Cardio"
    },
    muscleGroup:{
        type:String,
        //chest, back, legs, arms
        default: "Chest"
    }
}, {
    timestamps: true
})

excerciseSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const Excercise = mongoose.model("excercise", excerciseSchema)
export default Excercise