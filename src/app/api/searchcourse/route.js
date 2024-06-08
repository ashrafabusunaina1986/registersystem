import { NextResponse } from "next/server";
import connectDB from "../../../../dbConfig/db";
import Courses from "../../../../models/course";

connectDB()

export const POST = async (req) => {
  try {
    const {course}=await req.json()
    const courses=await Courses.find({$or:[{name:course},{code:course},{instructor:course}]})
    return NextResponse.json({success:true,courses},{status:201})
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
