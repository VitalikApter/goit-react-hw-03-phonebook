import { Component } from 'react';
import PropTypes from 'prop-types';

import css from '../PhoneBook.module.scss';

class PhoneBookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.setState({ name: '', number: '' });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label>
            Name <br />
            <input
              onChange={handleChange}
              value={name}
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
        </div>
        <div className={css.formGroup}>
          <label>
            Number <br />
            <input
              onChange={handleChange}
              value={number}
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
        </div>
        <button className={css.button_add} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

export default PhoneBookForm;

PhoneBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
