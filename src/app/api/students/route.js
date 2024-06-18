import { NextResponse } from "next/server";
import Students from "../../../../models/students";


export const GET = async (req) => {
    try {
      const url = new URL(req.url);
      const searchParams = new URLSearchParams(url.searchParams);
      const student = searchParams.get("student");
      let dataStudents;
      if (!student) dataStudents = await Students.find();
      else
        dataStudents = await Students.find({
          $or: [ { name: student }, { email:student }],
        });
      if (dataStudents)
        return NextResponse.json(
          {
            students: dataStudents.reverse(),
            success: true,
            length: dataStudents.length,
            message:
              dataStudents.length === 0
                ? "Not found students"
                : "number of students is " + dataStudents.length,
          },
          { status: 201 }
        );
      else
        return NextResponse.json(
          {
            message: "Not fount students",
            success: false,
            length: dataStudents.length,
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

  export const DELETE = async (req) => {
    try {
      const { id } = await req.json();
      const delStudent = await Students.findByIdAndDelete({ _id: id });
      if (delStudent)
        return NextResponse.json(
          { success: true, message: "Student is deleted" },
          { status: 201 }
        );
      else
        return NextResponse.json(
          { success: false, message: "Student is not deleted" },
          { status: 201 }
        );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  };