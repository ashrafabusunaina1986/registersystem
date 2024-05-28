import { Schema, model, models } from 'mongoose'

const studentsSchema=new Schema({
    name:{
        type:String,
        required:[true,'provide a name']
    },
    email:{
        type:String,
        required:[true,'provide an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'provide a password']
    }
})

const Students=models.students|| model('students',studentsSchema)

export default Students