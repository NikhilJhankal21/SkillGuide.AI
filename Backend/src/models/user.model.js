const mongoose=require('mongoose')

const userScehma=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,'Account already exits with this email addrress'],
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

const userModel=mongoose.model('users',userScehma)

module.exports=userModel

