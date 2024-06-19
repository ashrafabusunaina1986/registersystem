import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    //req.cookies.delete("token");
    const del = cookies().delete("token_admin") || cookies().delete("token");

    return NextResponse.json(
      {
        success: true,
        del,
      },
      { status: 201 }
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
