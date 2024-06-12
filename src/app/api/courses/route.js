import { NextResponse } from "next/server";
import connectDB from "../../../../dbConfig/db";
import Courses from "../../../../models/course";
import CourseSchedule from "../../../../models/courseSchedule";

connectDB();

export const POST = async (req) => {
  try {
    const reqbody = await req.json();
    const {
      code,
      name,
      description,
      prerequisites,
      instructor,
      capacity,
      schedule,
    } = await reqbody;
    const codeCourse = await Courses.findOne({ code });
    const nameCourse = await Courses.findOne({ name });
    if (codeCourse || nameCourse) {
      const e = {};
      if (codeCourse) e.code = "code is already";
      if (nameCourse) e.name = "name is already";

      return NextResponse.json(
        { success: false, message: "course is already", error: e },
        { status: 400 }
      );
    } else {
      const newCourse = await Courses({
        code: code && code.trim(),
        name: name && name.trim(),
        description: description && description.trim(),
        prerequisites: prerequisites && prerequisites.trim(),
        instructor: instructor && instructor.trim(),
        capacity,
        schedule: schedule && schedule.trim(),
      });

      const saveCourse = newCourse.save();
      if (saveCourse)
        return NextResponse.json(
          { newCourse, success: true, message: "new course saved" },
          { status: 201 }
        );
      else
        return NextResponse.json(
          { message: "new course not save", success: false },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const course = searchParams.get("course");
    let dataCourses;
    if (!course) dataCourses = await Courses.find();
    else
      dataCourses = await Courses.find({
        $or: [{ code: course }, { name: course }, { instructor: course }],
      });
    if (dataCourses)
      return NextResponse.json(
        {
          courses: dataCourses.reverse(),
          success: true,
          length: dataCourses.length,
          message:
            dataCourses.length === 0
              ? "Not found courses"
              : "number of courses is " + dataCourses.length,
        },
        { status: 201 }
      );
    else
      return NextResponse.json(
        {
          message: "Not fount courses",
          success: false,
          length: dataCourses.length,
        },
        { status: 400 }
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
    const { prerequisites, capacity, description, id } = await body;
    const uptateCourse = await Courses.findByIdAndUpdate(
      { _id: id },
      {
        description: description && description.trim(),
        capacity: capacity,
        prerequisites: prerequisites && prerequisites.trim(),
      }
    );
    if (uptateCourse) {
      return NextResponse.json(
        {
          message: "course is updated",
          success: true,
        },
        { status: 201 }
      );
    } else
      return NextResponse.json(
        { message: "Not update courses", success: false },
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
    const reqbody = await req.json();
    const { id } = await reqbody;

    const course = await Courses.findById({ _id: id });

    const name_course = course.name;
    const courseSchedulesName = await CourseSchedule.find({
      courseId: name_course,
    });
    if (courseSchedulesName.length > 0)
      return NextResponse.json(
        {
          name_course,
          courseSchedulesName,
          length: courseSchedulesName.length,
          success: false,
          message:
            "course is not deleted because he has details information of course schedules\nnumber of course schedules :" +
            courseSchedulesName.length,
        },
        { status: 404 }
      );
    const delCourse = await Courses.deleteOne({ _id: id });

    if (delCourse)
      return NextResponse.json(
        { success: true, message: "course is deleted" },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { success: false, message: "course is not deleted" },
        { status: 404 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
