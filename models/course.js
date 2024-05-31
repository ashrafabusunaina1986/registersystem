import { model, models, Schema } from "mongoose";
const coursesSchema = new Schema({
  code: {
    type: String,
    required: [true, "provide a course code"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "provide a name course"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "provide a description course"],
  },
  prerequisites: {
    type: String,
    required: [true, "provide a prerequisites course"],
  },
  instructor: {
    type: String,
    required: [true, "provide a instructor course"],
  },
  capacity: String,
});

const Courses = models.courses || model("courses", coursesSchema);

export default Courses;
