import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification = ({ visible, message, type }) => {
  return !visible ? null :
  (
    type === 'success' ?
    (
      <div className="notificationContainer" style={{ borderColor: 'green', backgroundColor: 'rgb(230, 255, 230)' }}>
        <p style={{ color: 'green' }}><strong>Success! </strong>{message}</p>
      </div>
    ) : 
    (
      <div className="notificationContainer" style={{ borderColor: 'red', backgroundColor: 'rgb(255, 230, 230)' }}>
        <p style={{ color: 'red' }}><strong>Error: </strong>{message}</p>
      </div>
    )
  )
}

export default Notification