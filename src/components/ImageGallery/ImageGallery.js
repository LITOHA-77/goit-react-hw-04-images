import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onClick, status }) {
  if (status === 'pending') {
    return Loader();
  }
  if (status === 'resolved' && images.length !== 0) {
    return (
      <>
        <ul className={css.imageGallery}>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={onClick}
            />
          ))}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
