import Register from "../../../../../models/registe";
import connectDB from "../../../../../dbConfig/db";
import { NextResponse } from "next/server";
import { getToken } from "@/helper/getuser";
import jwt from "jsonwebtoken";
import CourseSchedule from "../../../../../models/courseSchedule";
import Courses from "../../../../../models/course";

export const POST = async (req) => {
  try {
    const { courseid, studentId } = await req.json();
    
    
    
    const new_schr = await Register({
      courseId: courseid,
      studentId: studentId,
    });

    const save_schr = new_schr.save();
    if (save_schr)
      return NextResponse.json(
        { success: true, message: "new course schedule is saved" },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { success: false, message: "new course schedule is not saved" },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
  //   return NextResponse.json({ success: true }, { status: 201 });
};
