import React from "react";
import { Link } from "react-router-dom";

class DeleteContact extends React.Component  {
   
  deleteContactId = (e) => {
    const id = this.props.location.state.id;
    this.props.removeContactHandler(id);
    this.props.history.push("/")
  };
  render(){
  return (
    <div className="main">
      <h2>Confirm deletion of name</h2>
      <h2>Confirm deletion of name</h2>
      <Link to={{ pathname: "/" }}>
        <button className="ui button blue" onClick={this.deleteContactId}>Yes</button>
      </Link>

      <Link to="/">
        <button className="ui button blue">No</button>
      </Link>
    </div>
  );
  }
};

export default DeleteContact;
