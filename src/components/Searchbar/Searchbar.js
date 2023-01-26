import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.error('Enter a normal query!');
    }
    onSubmit(query);
    setQuery('');
  };

  const handlEqueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchForm__button}>
          <AiOutlineSearch size={25} fill={'black'} />
        </button>
        <input
          className={css.searchForm__input}
          type="text"
          name="search"
          placeholder="Search images and photos"
          onChange={handlEqueryChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
