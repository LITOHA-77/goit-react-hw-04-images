import PropTypes from 'prop-types';

import css from './Button.module.css';

export const Button = ({ loadMore }) => {
  return (
    <div className={css.container}>
      <button type="button" className={css.button} onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
