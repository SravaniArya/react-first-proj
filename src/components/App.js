import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import { uuid } from "uuidv4";
import DeleteContact from "./DeleteContact";
import api from "../api/contacts";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchWord, setSearcWord] = useState("");
  const [searchResults, setSearcResults] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {

    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  useEffect(() => {
    // const retreiveContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retreiveContacts) setContacts(retreiveContacts);
    const getAllContacts = async () => {
      const allContacts = await retreiveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  const retreiveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const searchHandler = async (searchWord) => {
    setSearcWord(searchWord);
    if (searchWord !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      });
      setSearcResults(newContactList)
    }
    else{
      setSearcResults(contacts)
    }
  };

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchWord <1 ?contacts:searchResults}
                getContactId={removeContactHandler}
                word={searchWord}
                searchKey={searchHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetails} />
          {/* <Route path="/delete/:id" component={<DeleteContact />}/> */}
          <Route
            path="/delete"
            render={(props) => (
              <DeleteContact
                {...props}
                removeContactHandler={removeContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
