import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (req) => {
  try {
    const token = cookies().get("token")?.value || "";
    const token_admin = cookies().get("token_admin")?.value || "";
    if (token)
      return NextResponse.json(
        { token: token, success: true },
        { status: 201 }
      );
    if (token_admin)
      return NextResponse.json(
        { token_admin: token_admin, success: true },
        { status: 201 }
      );
    if (!token_admin && !token)
      return NextResponse.json(
        { message: "not found cookie", success: false },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
};
