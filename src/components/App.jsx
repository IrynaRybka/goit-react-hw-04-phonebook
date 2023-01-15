import { useState, useEffect } from 'react';
import shortid from 'shortid';

import ContactForm from './ContactForm/ContactForm';
import ContactsFilter from './ContactFilter/ContactsFilter';
import ContactList from './ContactsList/ContactsList';

import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.contacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilterContact = text => {
    setFilter(text.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizeNameContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeNameContact)
    );
  };

  const includeThisName = contactName => {
    if (contacts.some(contact => contact.name === contactName)) {
      alert(`${contactName} is alredy in contacts`);
      return true;
    }
    return false;
  };

  const takeDataFormSubmit = data => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };
    setContacts([contact, ...contacts]);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmitForm={takeDataFormSubmit}
        onincludeThisName={includeThisName}
      />
      <h2>Contacts</h2>
      <ContactsFilter onChange={changeFilterContact} value={filter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
