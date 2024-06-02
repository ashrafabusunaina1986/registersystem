import { NextResponse } from "next/server";
import connectDB from "../../../../dbConfig/db";
import Courses from "../../../../models/course";

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
        code,
        name,
        description,
        prerequisites,
        instructor,
        capacity,
        schedule,
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
    const dataCourses = await Courses.find();
    if (dataCourses.length > 0)
      return NextResponse.json(
        {
          courses: dataCourses.reverse(),
          success: true,
          length: dataCourses.length,
        },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { message: "Not fount courses", success: false },
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
        description: description,
        capacity: capacity,
        prerequisites: prerequisites,
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

    console.log(id);
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
