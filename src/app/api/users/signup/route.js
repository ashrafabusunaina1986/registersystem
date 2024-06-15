import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../../../../dbConfig/db";
import Students from "../../../../../models/students";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (req) => {
  try {
    const reqbody = await req.json();

    const { name, password, email } = await reqbody;

    const user = await Students.findOne({ email });
    if (user)
      return NextResponse.json(
        { message: "email is already", success: false },
        { status: 404 }
      );

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newStudent = await Students({
      name,
      email,
      password: hashPassword,
    });

    const saveStudent = await newStudent.save();
    if (saveStudent) {
      const response = NextResponse.json(
        {
          message: "new student saved",
          student: {
            name: newStudent.name,
            email: newStudent.email,
            id: newStudent._id,
          },
          success: true,
        },
        { status: 201 }
      );

      const dataToken = {
        id: newStudent._id,
        email: newStudent.email,
        name: newStudent.name,
      };

      const token = jwt.sign(dataToken, process.env.DATA_TOKEN);

      response.cookies.set("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      return response;
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};
