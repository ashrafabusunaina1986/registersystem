import React from 'react'

export default function Interface({v}) {
  return (
    <section className="flex flex-col gap-3 w-1/4 bg-blue-950 rounded-md p-3 h-max">
          {
            v.map((item,ind)=>{
                return <button key={ind}
                onClick={item.go}
                className={
                  " inline-flex items-center  justify-center px-3 py-1 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg w-[230px] hover:bg-blue-400"
                }
              >
                {item.name}
              </button>
            })
          }
          {/* <button
            onClick={goCourseScheduleHandler}
            className={
              " inline-flex items-center  justify-center py-1 px-3 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg w-[230px] hover:bg-blue-400"
            }
          >
            Add Course Schedule
          </button>

          <button
            onClick={goStudents}
            className={
              " inline-flex items-center  justify-center px-3 py-1 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg w-[230px] hover:bg-blue-400 "
            }
          >
            Students
          </button>
          <button
            onClick={goCourses}
            className={
              " inline-flex items-center  justify-center px-3 py-1 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg w-[230px] hover:bg-blue-400 "
            }
          >
            Courses
          </button>
          <button
            onClick={goStudents}
            className={
              " inline-flex items-center  justify-center px-3 py-1 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg w-[230px] hover:bg-blue-400 "
            }
          >
            Courses Schedule
          </button> */}
        </section>
  )
}
