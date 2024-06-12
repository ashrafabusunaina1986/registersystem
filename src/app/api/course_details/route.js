import { NextResponse } from "next/server";
import Courses from "../../../../models/course";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const course = searchParams.get("course");
    let coursesstudents;
    if (!course)
      return NextResponse.json(
        { success: false, message: "course students not found" },
        { status: 404 }
      );
    else
      coursesstudents = await Courses.aggregate([
        { $match: { name: course } },
        {
          $lookup: {
            from: "courseschedules",
            localField: "name",
            foreignField: "courseId",
            as: "cs",
          },
        },
      ]);
    if (coursesstudents)
      return NextResponse.json(
        {
          success: true,
          length: coursesstudents.length,
          coursesstudents: coursesstudents,
        },
        { status: 201 }
      );
    else {
      return NextResponse.json(
        { success: false, message: "course students not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
