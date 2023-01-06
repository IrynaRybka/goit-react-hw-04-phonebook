import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

const ContactListItem = ({ name, number, onClick }) => {
  return (
    <li className={css.contact_list}>
      <p>
        <span>{name}:</span>
        <span>{number}</span>
      </p>
      <button type="button" onClick={onClick}>
        Delete
      </button>
    </li>
  );
};
ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ContactListItem;
