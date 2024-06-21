import { NextResponse } from "next/server";
import Students from "../../../../models/students";
import Register from "../../../../models/registe";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const student = searchParams.get("student");
    let dataStudents;
    if (!student) dataStudents = await Students.find();
    else
      dataStudents = await Students.find({
        $or: [{ name: student }, { email: student }],
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
    const student = await Students.findById({ _id: id });
    const sr = await Register.find({ studentId: student.email });
    if (sr && sr.length > 0)
      return NextResponse.json(
        {
          count: sr.length,
          success: false,
          message:
            "Unable to delete the student because he is using some courses",
        },
        { status: 401 }
      );
    else {
      const delStudent = await Students.findByIdAndDelete({ _id: id });
      if (delStudent)
        return NextResponse.json(
          { success: true, message: "Student is deleted" },
          { status: 201 }
        );
      else
        return NextResponse.json(
          { success: false, message: "Student is not deleted" },
          { status: 401 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    const { studentId, complete } = await req.json();
    const updateStudent = await Register.updateMany(
      { studentId: studentId },
      { complete: true }
    );
    if (updateStudent)
      return NextResponse.json(
        { success: true, message: "registration of student is complete " },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { success: false, message: "registration of student is not complete" },
        { status: 401 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
