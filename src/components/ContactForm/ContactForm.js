import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

function ContactForm({ onincludeThisName, onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const phoneInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const formSubmit = event => {
    event.preventDefault();
    if (onincludeThisName(name)) {
      return;
    }
    onSubmitForm({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <div>
      <section>
        <form
          autoComplete="off"
          className={css.form_phonebook}
          onSubmit={formSubmit}
        >
          <label htmlFor="name" className={css.mark_name}>
            Name
            <input
              value={name}
              onChange={phoneInputChange}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label htmlFor="number" className={css.mark_number}>
            Number
            <input
              value={number}
              onChange={phoneInputChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </section>
    </div>
  );
}
ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onincludeThisName: PropTypes.func.isRequired,
};
export default ContactForm;
