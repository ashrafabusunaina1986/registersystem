"use client";
import SearchValue from "@/components/SearchValue";
import Student from "@/components/Student";
import ViewData from "@/components/ViewData";
import React, { Fragment, useEffect, useRef, useState } from "react";

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

    const res = await fetch(`/api/users/students?student=${search.student}`);
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
    const res = await fetch(
      `/api/users/students?student=${searchRef.current.value}`
    );
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
    console.log(id);
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
    <Fragment>
      <SearchValue
        name={"NAME - EMAIL"}
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
    </Fragment>
  );
}
