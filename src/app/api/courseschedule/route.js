import { NextResponse } from "next/server";
import connectDB from "../../../../dbConfig/db";
import CourseSchedule from "../../../../models/courseSchedule";
import Courses from "../../../../models/course";

connectDB();

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { dayValue, courseValue, startTime, endTime, roomId } = await body;

    const newScedule = await CourseSchedule({
      day: dayValue,
      startTime: startTime,
      endTime: endTime,
      roomId,
      courseId: courseValue,
    });
    const saveSchedule = newScedule.save();
    return NextResponse.json(
      { success: true, message: "course schedule is added" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const courseSchedules = await CourseSchedule.find();
    return NextResponse.json(
      { success: true, courseSchedules: courseSchedules.reverse() },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const { id } = await req.json();
    const delSechedule = await CourseSchedule.findByIdAndDelete({ _id: id });
    if (delSechedule)
      return NextResponse.json(
        { success: true, message: "course schedule is deleted" },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { success: false, message: "course schedule is not deleted" },
        { status: 201 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
