import { getToken } from "@/helper/getuser";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    const token = await getToken(req, "token");
    if (token) {
      const data = jwt.verify(token, process.env.DATA_TOKEN);

      return NextResponse.json({ data, success: true }, { status: 201 });
    } else
      return NextResponse.json(
        { message: "not found user", success: false },
        { status: 401 }
      );
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
