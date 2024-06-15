import { model, models, Schema } from "mongoose";
const registerSchema = new Schema({
  studentId: String,
  courseId: { type: String, unique: true },
  complete: { type: Boolean, default: false },
  success: { type: Boolean, default: false },
});

const Register = models.registers || model("registers", registerSchema);

export default Register;
