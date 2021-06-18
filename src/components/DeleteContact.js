import React from "react";
import { Link } from "react-router-dom";

const DeleteContact = (props) => {
  return (
    <div className="main">
      <h2>Confirm deletion of name</h2>
      <h2>Confirm deletion of name</h2>
      <Link
        to={{ pathname: "/", state: { contact: props.contact } }}
      >
        <button className="ui button blue">Yes</button>
      </Link>

      <Link to="/">
        <button className="ui button blue">No</button>
      </Link>
    </div>
  );
};

export default DeleteContact;
