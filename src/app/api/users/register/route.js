import Register from "../../../../../models/registe";
import connectDB from "../../../../../dbConfig/db";
import { NextResponse } from "next/server";
import CourseSchedule from "../../../../../models/courseSchedule";
import Courses from "../../../../../models/course";
import { ConvertTimeToNum } from "@/helper/convertTimeToNum";

connectDB();
export const POST = async (req) => {
  try {
    const { courseid, studentId } = await req.json();
    var schedule = await CourseSchedule.find({ _id: courseid });
    if (schedule && schedule.length > 0) {
      const courseIdr = await Register.find({
        courseId: JSON.stringify(schedule[0]),
      });
      if (courseIdr && courseIdr.length > 0) {
        return NextResponse.json(
          {
            success: false,
            courseIdr,
            message: "new course schedule is not saved,it is forbidden to repeat",
          },
          { status: 400 }
        );
      } else {
        const day = schedule[0].day,
          courseday = schedule[0].courseId;
        const daycourse = await Register.find();
        if (daycourse && daycourse.length > 0) {
          let count = 0;
          daycourse.map((course) => {
            const cdr = JSON.parse(course.courseId);
            if (cdr.day === day && cdr.courseId === courseday) count += 1;
            return count;
          });
          if (count === 0) {
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

      // const new_schr = await Register({
      //   courseId: JSON.stringify(schedule[0]),
      //   studentId: studentId,
      // });

      // const save_schr = new_schr.save();
      // if (save_schr)
      //   return NextResponse.json(
      //     {
      //       success: true,
      //       new_schr: JSON.parse(new_schr.courseId),
      //       message: "new course schedule is saved",
      //     },
      //     { status: 201 }
      //   );
      // else
      //   return NextResponse.json(
      //     { success: false, message: "new course schedule is not saved" },
      //     { status: 400 }
      //   );

      // return NextResponse.json({ success: true, schedule }, { status: 201 });
    }
    // const schedule_rs = await Register.find({ courseId: courseid });
    // if (schedule_rs && schedule_rs.length > 0)
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: `Error:course schedule register student is already`,
    //       schedule_rs,
    //     },
    //     { status: 400 }
    //   );
    // else {
    //   var schedule = await CourseSchedule.find({ _id: courseid });
    //   if (schedule && schedule.length > 0) {
    //     const schedules_rs = await Register.aggregate([
    //       {
    //         $lookup: {
    //           from: "courseschedules",
    //           localField: "courseId",
    //           foreignField: "_id",
    //           as: "cr",
    //         },
    //       },
    //     ]);
    //     if (schedules_rs && schedules_rs.length > 0) {
    //       return NextResponse.json(
    //         { success: true, schedules_rs },
    //         { status: 201 }
    //       );
    //     } else {
    //     }
    //   }
    const new_schr = await Register({
      courseId: courseid,
      studentId: studentId,
    });

    const save_schr = new_schr.save();
    if (save_schr)
      return NextResponse.json(
        { success: true, message: "new course schedule is saved" },
        { status: 201 }
      );
    else
      return NextResponse.json(
        { success: false, message: "new course schedule is not saved" },
        { status: 400 }
      );
    // }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
  //   return NextResponse.json({ success: true }, { status: 201 });
};
