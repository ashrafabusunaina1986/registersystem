import { getToken } from "@/helper/getuser";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  const token_admin = await getToken(req, "token_admin");
  try {
    const token_admin = await getToken(req,'token_admin');
    if (token_admin) {
      const data = jwt.verify(token_admin, process.env.DATA_ADMIN);

      return NextResponse.json({ data, success: true }, { status: 201 });
    } else
      return NextResponse.json(
        { message: "not found admin", success: false },
        { status: 401 }
      );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        token_admin,
        message: error.message,
      },
      { status: 500 }
    );
  }
};
