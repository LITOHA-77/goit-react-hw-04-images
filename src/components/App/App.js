import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

import { Button } from '../Button/Button';

import getPicturesPixabayApi from '../../services/pixabay-api';

export function App() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [images, setImages] = useState([]);

  const handleFormSubmit = query => {
    setValue(query);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (value) {
      setStatus('pending');
      getPicturesPixabayApi(value, page)
        .then(res => {
          if (res.hits.length === 0) {
            toast.warn('There are no images for this search');
            setStatus('resolved');
            return;
          }

          setImages(prevState => [...prevState, ...res.hits]);

          setStatus('resolved');
          setShowButton(page < Math.ceil(res.totalHits / 12));
        })

        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [value, page]);

  const pageScroll = () => {
    if (images.length < 12) {
      return;
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  pageScroll();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = (tags, largeImageURL) => {
    setTags(tags);
    setLargeImageURL(largeImageURL);
    toggleModal();
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery
        images={images}
        error={error}
        status={status}
        onLoadMore={loadMore}
        onClick={onImageClick}
      />
      {showButton && <Button loadMore={loadMore} />}

      {showModal && (
        <Modal
          onClose={toggleModal}
          tags={tags}
          largeImageURL={largeImageURL}
        />
      )}
      <ToastContainer autoClose={4000} />
    </div>
  );
}
