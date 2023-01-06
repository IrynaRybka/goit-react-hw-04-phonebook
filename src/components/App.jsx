import React, { Component } from 'react';
import shortid from 'shortid';

import ContactForm from './ContactForm/ContactForm';
import ContactsFilter from './ContactFilter/ContactsFilter';
import ContactList from './ContactsList/ContactsList';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  takeDataFormSubmit = data => {
    console.log(data);
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilterContact = text => {
    this.setState({ filter: text.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizeNameContact = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeNameContact)
    );
  };

  includeThisName = contactName => {
    if (this.state.contacts.some(contact => contact.name === contactName)) {
      alert(`${contactName} is alredy in contacts`);
      return true;
    }
    return false;
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if(parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmitForm={this.takeDataFormSubmit}
          onincludeThisName={this.includeThisName}
        />
        <h2>Contacts</h2>
        <ContactsFilter onChange={this.changeFilterContact} value={filter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
