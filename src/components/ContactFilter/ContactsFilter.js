import React from 'react';
import PropTypes from 'prop-types';

import css from './ContactsFilter.module.css';

const ContactsFilter = ({ onChange, value }) => {
  return (
    <section>
      <label className={css.mark_name}>
        Find contacts by name
        <input onChange={onChange} value={value} type="text"></input>
      </label>
    </section>
  );
};
ContactsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ContactsFilter;
