import React, { useState } from "react";

function Password({ className, title }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex w-full flex-col gap-2 items-center">
      {title && <label htmlFor="password">Password</label>}
      <input
        placeholder="enter password"
        className={className}
        type={show ? "text" : "password"}
        id="password"
        name="password"
      />
      <div className="flex w-full gap-3">
        <input
          type="checkbox"
          name="pass"
          id="pass"
          onChange={(e) => setShow(e.target.checked)}
        />
        <label htmlFor="pass" className="font-normal">
          show password
        </label>
      </div>
    </div>
  );
}

export default Password;
