import { NextResponse } from "next/server";
import connectDB from "../../../../dbConfig/db";
import CourseSchedule from "../../../../models/courseSchedule";

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
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const schedule = searchParams.get("schedule");
    let courseSchedules;
    if (!schedule) courseSchedules = await CourseSchedule.find();
    else
      courseSchedules = await CourseSchedule.find({
        $or: [{ courseId: schedule }, { day: schedule }, { roomId: schedule }],
      });
    if (courseSchedules)
      return NextResponse.json(
        { success: true, courseSchedules: courseSchedules.reverse() },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { success: false, message: "not courses schedules" },
        { status: 400 }
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

export const PUT = async (req) => {
  try {
    const body = await req.json();
    const { startTime, endTime, roomId, dayValue, id } = await body;

    const uptateCourse = await CourseSchedule.findByIdAndUpdate(
      { _id: id },
      { endTime: endTime, startTime: startTime, roomId: roomId, day: dayValue }
    );
    if (uptateCourse) {
      return NextResponse.json(
        {
          message: "course schedule is updated",
          success: true,
        },
        { status: 201 }
      );
    } else
      return NextResponse.json(
        { message: "Not update course schedule", success: false },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
