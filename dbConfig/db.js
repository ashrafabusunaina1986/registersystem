import mongoose from "mongoose";

const connectDB=()=>{
    try {
        mongoose.connect(process.env.MONGO)
        console.log('database successful connected')
    } catch (error) {
        alert(error)
    }
}
export default connectDB