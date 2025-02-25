import React, { useState } from "react";

export default function AboutDeveloper({onClose}) {
  return (
    <dialog className="info-dialog" open={true}>
      <h2>About Developer</h2>
      <p>
        This application was developed by Neil Diamzon </p>
        <p>
          <a href="https://github.com/neildiamzon" target="_blank">Visit my GitHub</a>
        </p>
          <button onClick={onClose}>Close</button>
        
    </dialog>
  );
}
