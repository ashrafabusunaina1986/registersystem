import React, { Fragment } from "react";

const BackDrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] z-20 border-none bg-slate-900 opacity-50" />
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="fixed top-10 left-1/4 w-2/4 p-5 h-[500px]  rounded-lg overflow-y-auto bg-gray-100 z-50 shadow-xl backdrop:bg-blue-700">
      <div className="">{children}</div>
    </div>
  );
};

function Modal({ children }) {
  
  return (
    <Fragment>
      <BackDrop />
      <ModalOverlay>{children}</ModalOverlay>
    </Fragment>
  );
}

export default Modal;
