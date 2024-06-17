import { NextResponse } from "next/server";
import Register from "../../../../models/registe";

export const POST = async (req) => {
  try {
    const { id } = await req.json();
    const scheduls_r_id = await Register.find();
    if (scheduls_r_id && scheduls_r_id.length > 0) {
      let countid = 0;
      scheduls_r_id.map((r, ind) => {
        const c = JSON.parse(r.courseId);
        if (c._id === id) countid += 1;
        return countid;
      });
      if (countid === 0)
        return NextResponse.json(
          {
            success: true,
          },
          { status: 201 }
        );
      else
        return NextResponse.json(
          {
            success: false,
            message:
              "course schedule is not updated, Used by " +
              countid +
              " students",
          },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
