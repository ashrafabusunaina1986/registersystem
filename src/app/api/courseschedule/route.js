import { NextResponse } from "next/server";
import connectDB from "../../../../dbConfig/db";
import CourseSchedule from "../../../../models/courseSchedule";

connectDB();

export const POST = async (req) => {
  return NextResponse.json({ l: "" });
};
