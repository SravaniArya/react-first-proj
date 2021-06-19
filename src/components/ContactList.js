import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputWord = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  const getSerachWord = () => {
    props.searchKey(inputWord.current.value)
  };

  return (
    <div className="main">
      <h2> Contact list </h2>
      <h2>
        Contact list
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputWord}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.word}
            onChange={getSerachWord}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
