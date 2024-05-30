import { Schema, models, model } from "mongoose";

const courseScheduleSchema = new Schema({
  day: String,
  startTime: Date,
  endTime: Date,
  roomId: String,
});

const CourseSchedule =
  models.CourseSchedule || model("CourseSchedule", courseScheduleSchema);

export default CourseSchedule;
