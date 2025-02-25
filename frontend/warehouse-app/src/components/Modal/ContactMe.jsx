import React, { useState } from "react";

export default function ContactMe({onClose}) {
  return (
    <dialog className="info-dialog" open={true}>
      <h2>Contact Us</h2>
      <p>
        You may contact us at: </p>
        <p>
         neilaronndiamzon@gmail.com
        </p>
          <button onClick={onClose}>Close</button>
        
    </dialog>
  );
}
