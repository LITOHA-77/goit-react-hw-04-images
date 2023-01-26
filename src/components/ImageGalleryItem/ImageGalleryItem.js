import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
  onClick,
}) {
  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItem__image}
        onClick={() => onClick(tags, largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
