const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const app=express() 
app.use(express.json())  
app.use(cookieParser()) 

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://skill-guide-ai.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true    
}))

/* Requires all the routes here */
const authRouter=require('./routes/auth.routes')
const interviewRouter=require('./routes/interview.routes')

/* Using all the routes here  */
app.use('/api/auth',authRouter) 
app.use('/api/interview',interviewRouter)

module.exports=app