"use client";
import Menu from "@/components/Menu";
import SearchValue from "@/components/SearchValue";
import Student from "@/components/Student";
import ViewData from "@/components/ViewData";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { info } from "../page";
import Box from "@/components/Box";

export default function ViewStudents() {
  const searchRef = useRef();
  const [message, setMessage] = useState({});
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const searchStudentHandeler = async (e) => {
    // console.log(Object.keys(students[0])[0]);
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const search = Object.fromEntries(fd);
    const res = await fetch(`/api/students?student=${search.student}`);
    if (!res.ok) {
      const er = await res.json();
      // console.log(er);
      setMessage({ success: er.success, message: er.message });
      return;
    }
    const result = await res.json();
    // console.log(result);
    setStudents(result.students);
    setMessage({ success: result.success });
  };

  const getStudents = async () => {
    const res = await fetch(`/api/students?student=${searchRef.current.value}`);
    if (!res.ok) {
      const er = await res.json();
      setMessage({ success: er.success, message: er.message });
      // console.log(er);
      return;
    }
    const dataStudents = await res.json();
    setStudents(dataStudents.students);

    // console.log(dataStudents);
  };

  const delStudentHandler = async (id) => {
    const del = confirm("Are you sure student delete");
    if (del) {
      const res = await fetch("/api/students", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const er = await res.json();
        // console.log(er)
        alert(er.message);
        return;
      }
      const dels = await res.json();
      // console.log(dels);
      getStudents();
    }
  };
  const editStudentHandler = async (id) => {
    const student = students.find((student) => student._id === id);
    setStudent(student);
    setIsShow(true);
  };
  useEffect(() => {
    getStudents();
    // console.log(message.success);
    setMessage({ success: undefined });
  }, [message.success]);
  return (
    <div className="w-11/12 flex gap-20 sm:gap-0 md:gap-0">
      <div className="w-3/12 relative block sm:relative sm:hidden md:relative md:hidden ">
        <Menu info={info} d={"h"} />
      </div>
      <div className=" sm:relative sm:block md:relative md:block relative hidden sm:my-5 md:my-5">
        <Box menu={<Menu info={info} d={"h"} />} />
      </div>
      <section className="w-full sm:w-full md:w-full -mt-5 sm:relative sm:left-0 sm:top-10 md:relative md:left-0 md:top-10">
        <SearchValue
          name={"NAME - EMAIL"}
          id={"student"}
          searchHandeler={searchStudentHandeler}
          searchRef={searchRef}
        />
        <ViewData
          data={students}
          keys={students[0]}
          message="Students"
          editHandler={editStudentHandler}
          delHandler={delStudentHandler}
          isShow={isShow}
          page={
            <Student
              student={student}
              setIsShow={setIsShow}
              setMessage={setMessage}
            />
          }
        />
      </section>
    </div>
  );
}
