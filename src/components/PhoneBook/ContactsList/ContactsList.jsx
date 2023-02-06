import PropTypes from 'prop-types';
import css from './ContactsList.module.scss';

const ContactsList = ({ removeContact, contacts }) => {
  const contactsList = contacts.map(({ id, name, number }) => (
    <li key={id} className={css.item}>
      {name}: {number}
      <button onClick={() => removeContact(id)} className={css.delete}>
        Delete Contact
      </button>
    </li>
  ));

  return <ol className={css.list}>{contactsList}</ol>;
};

export default ContactsList;

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
