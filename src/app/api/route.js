import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async (req) => {
  try {
    const token = cookies().get("token") || "";
    const token_admin = cookies().get("token_admin") || "";
    // if (token)
    return NextResponse.json(
      { token, token_admin, success: true },
      { status: 201 }
    );
    // if (token_admin)
    //   return NextResponse.json(
    //     { token_admin: token_admin, success: true },
    //     { status: 201 }
    //   );
    // else if (!token_admin && !token)
    //   return NextResponse.json(
    //     { message: "not found cookie", success: false },
    //     { status: 400 }
    // );
  } catch (error) {
    NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
};
