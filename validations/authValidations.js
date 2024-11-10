import Joi from "joi";

function dateGgetter(){
  const dateObj = new Date();
  const month   = dateObj.getUTCMonth() + 1; // months from 1-12
  const day     = dateObj.getUTCDate();
  const year    = dateObj.getUTCFullYear();
  const newDate = `${month}-${day}-${year}`
  return newDate
}

export const registerSchema = Joi.object({
    username: Joi.string().required(), 
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    password_confirmation: Joi.ref('password'),   
}).with('password', 'password_confirmation');

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});


export const workoutSchema = Joi.object({
  plan: Joi.string().required(),
  excercises: Joi.array().items(Joi.object().keys({
    excerciseName: Joi.string().required(),
    sets: Joi.number().required(),
    weight: Joi.string().required()
  })),
  comments: Joi.string()
})


export const planSchema = Joi.object({
  workoutName: Joi.string().required(),
  sets: Joi.number().required(),
  weight:Joi.string().required(),
  date: Joi.date().min(dateGgetter())
})