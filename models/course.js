import { model, models, Schema } from "mongoose";
const coursesSchema = new Schema({
  code: {
    type: String,
    required: [true, "provide a course code"],
  },
  name: {
    type: String,
    required: [true, "provide a name course"],
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
  schedule: String,
});

const Courses = models.courses || model("courses", coursesSchema);

export default Courses;
