import Register from "../../../../../models/registe";
import connectDB from "../../../../../dbConfig/db";
import { NextResponse } from "next/server";
import CourseSchedule from "../../../../../models/courseSchedule";
import { ConvertTimeToNum } from "@/helper/convertTimeToNum";
import { getToken } from "@/helper/getuser";
import jwt from "jsonwebtoken";

connectDB();
export const POST = async (req) => {
  try {
    const { courseid, studentId } = await req.json();

    var schedule = await CourseSchedule.find({ _id: courseid });
    if (schedule && schedule.length > 0) {
      const courseIdr = await Register.find({
        studentId: studentId,
        courseId: JSON.stringify(schedule[0]),
      });
      if (courseIdr && courseIdr.length > 0) {
        return NextResponse.json(
          {
            success: false,
            courseIdr,
            message:
              "new course schedule is not saved,it is forbidden to repeat",
          },
          { status: 400 }
        );
      } else {
        const day = schedule[0].day,
          courseday = schedule[0].courseId;
        const daycourse = await Register.find({ studentId: studentId });
        if (daycourse && daycourse.length > 0) {
          let count = 0;
          daycourse.map((course) => {
            const cdr = JSON.parse(course.courseId);
            if (cdr.day === day && cdr.courseId === courseday) count += 1;
            return count;
          });
          if (count === 0) {
            let countd = 0;
            daycourse.map((course) => {
              const cdr = JSON.parse(course.courseId);
              if (cdr.day === day) count += 1;
              return countd;
            });
            if (countd === 0) {
              const new_schr = await Register({
                courseId: JSON.stringify(schedule[0]),
                studentId: studentId,
              });

              const save_schr = new_schr.save();
              if (save_schr)
                return NextResponse.json(
                  {
                    success: true,
                    new_schr: JSON.parse(new_schr.courseId),
                    message: "new course schedule is saved",
                  },
                  { status: 201 }
                );
              else
                return NextResponse.json(
                  {
                    success: false,
                    message: "new course schedule is not saved",
                  },
                  { status: 400 }
                );
            } else {
              let tcount = 0,
                start = ConvertTimeToNum(schedule[0].startTime),
                end = ConvertTimeToNum(schedule[0].endTime);
              console.log(start, end);
              daycourse.map((course) => {
                const cdr = JSON.parse(course.courseId);
                const st = ConvertTimeToNum(cdr.startTime),
                  et = ConvertTimeToNum(cdr.endTime);
                console.log(st, et);
                if ((start >= st && start <= et) || (end >= st && end <= et))
                  tcount += 1;
                return tcount;
              });
              if (tcount === 0) {
                const new_schr = await Register({
                  courseId: JSON.stringify(schedule[0]),
                  studentId: studentId,
                });

                const save_schr = new_schr.save();
                if (save_schr)
                  return NextResponse.json(
                    {
                      success: true,
                      new_schr: JSON.parse(new_schr.courseId),
                      message: "new course schedule is saved",
                    },
                    { status: 201 }
                  );
                else
                  return NextResponse.json(
                    {
                      success: false,
                      message: "new course schedule is not saved",
                    },
                    { status: 400 }
                  );
              } else
                return NextResponse.json(
                  {
                    success: false,
                    message:
                      "new course schedule is not saved, not found different in time",
                  },
                  { status: 400 }
                );
            }
          } else {
            return NextResponse.json(
              {
                success: false,
                message: "Course is forbidden to repeat the cycle in one day",
              },
              { status: 400 }
            );
          }
        } else {
          const new_schr = await Register({
            courseId: JSON.stringify(schedule[0]),
            studentId: studentId,
          });

          const save_schr = new_schr.save();
          if (save_schr)
            return NextResponse.json(
              {
                success: true,
                new_schr: JSON.parse(new_schr.courseId),
                message: "new course schedule is saved",
              },
              { status: 201 }
            );
          else
            return NextResponse.json(
              {
                success: false,
                message: "new course schedule is not saved",
              },
              { status: 400 }
            );
        }
      }
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const token = await getToken(req, "token");
    const data = jwt.verify(token, process.env.DATA_TOKEN);

    if (data && Object.values(data)) {
      const studentId = data.email;
      const student_csr = await Register.find({ studentId: studentId });
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
    } else
      return NextResponse.json(
        { message: "Not found student", success: false },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
