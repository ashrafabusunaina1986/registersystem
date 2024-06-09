import React from "react";
import Modal from "./modal/Modal";

export default function Student({ student, setIsShow, setMessage }) {
  const onHide = () => {
    setIsShow(false);
  };
  return <Modal onhide={onHide}></Modal>;
}
