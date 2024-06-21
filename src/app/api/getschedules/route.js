import { NextResponse } from "next/server";
import Register from "../../../../models/registe";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const student = searchParams.get("student");
    const student_csr = await Register.find({ studentId: student });
    if (student_csr && student_csr.length > 0)
      return NextResponse.json(
        { csr: student_csr, success: true },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { message: "Not found courses schedules", success: false },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
