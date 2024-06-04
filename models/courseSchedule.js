import { Schema, models, model } from "mongoose";

const courseScheduleSchema = new Schema({
  day: String,
  startTime: String,
  endTime: String,
  roomId: String,
  courseId: String,
});

const CourseSchedule =
  models.CourseSchedule || model("CourseSchedule", courseScheduleSchema);

export default CourseSchedule;
