import { NextResponse } from "next/server";
import connectDB from "../../../../dbConfig/db";
import CourseSchedule from "../../../../models/courseSchedule";
import { ConvertTimeToNum } from "@/helper/convertTimeToNum";

connectDB();

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { day, course, startTime, endTime, roomId } = await body;

    var start = ConvertTimeToNum(startTime),
      end = ConvertTimeToNum(endTime);

    const day_roomid = await CourseSchedule.find({ day: day, roomId: roomId });
    if (day_roomid) {
      let count = 0;
      if (day_roomid.length > 0) {
        day_roomid.map((item) => {
          let st = ConvertTimeToNum(item.startTime),
            et = ConvertTimeToNum(item.endTime);
          if ((start >= st && start <= et) || (end >= st && end <= et))
            count += 1;

          return count;
        });
        if (count > 0)
          return NextResponse.json(
            {
              success: false,
              message: "Error:course schedule like before courses schedule",
            },
            { status: 400 }
          );
        else {
          const newScedule = await CourseSchedule({
            day,
            startTime: startTime,
            endTime: endTime,
            roomId: roomId && roomId.trim(),
            courseId: course,
          });
          const saveSchedule = newScedule.save();
          return NextResponse.json(
            { success: true, message: "course schedule is added" },
            { status: 201 }
          );
        }
      } else {
        const newScedule = await CourseSchedule({
          day,
          startTime: startTime,
          endTime: endTime,
          roomId: roomId && roomId.trim(),
          courseId: course,
        });
        const saveSchedule = newScedule.save();
        return NextResponse.json(
          { success: true, message: "course schedule is added" },
          { status: 201 }
        );
      }
    }
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
    const { startTime, endTime, roomId, day, id } = await body;

    const uptateCourse = await CourseSchedule.findByIdAndUpdate(
      { _id: id },
      {
        endTime: endTime,
        startTime: startTime,
        roomId: roomId && roomId.trim(),
        day: day,
      }
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
