import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import PhoneBookForm from './PhoneBookForm/PhoneBookForm';

import css from './PhoneBook.module.scss';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('My-Contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.length !== contacts.length) {
      localStorage.setItem('My-Contacts', JSON.stringify(contacts));
    }
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return alert(`${name}. number: ${number} is already in contacts.`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name, number) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const { contacts } = this.state;
    const contact = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(contact);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
      );
    });

    return result;
  }

  render() {
    const { addContact, handleFilter, removeContact } = this;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length);
    return (
      <>
        <div className={css.wrapper}>
          <div className={css.form}>
            <h2 className={css.title}>Phonebook</h2>
            <PhoneBookForm onSubmit={addContact} />
          </div>
          <ContactsFilter handleChange={handleFilter} />
          {isContacts && (
            <ContactsList removeContact={removeContact} contacts={contacts} />
          )}
          {!isContacts && <p>No Contacts</p>}
        </div>
      </>
    );
  }
}

export default PhoneBook;
