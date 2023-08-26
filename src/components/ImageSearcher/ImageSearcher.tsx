import { useContext, useState } from 'react';
import Card from '../Card/Card';
import classes from './ImageSearcher.module.css';
import { AppContext } from '../../context/context';
import { imageSearch } from '../../constants/uiContent';
import { MutatingDots } from 'react-loader-spinner';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaCopy,
  FaDownload,
  FaTelegram,
  FaViber,
  FaWhatsapp,
} from 'react-icons/fa6';
import { v4 } from 'uuid';
import {
  TelegramShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from 'react-share';
import { Tooltip } from 'react-tooltip';

type Image = {
  url: {
    min: string;
    full: string;
  };
  alt: string;
};

const IMAGES_PER_PAGE = '9';

const ImageSearcher: React.FC = () => {
  const { state } = useContext(AppContext);
  const { language, theme } = state!;
  const [imageName, setImageName] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: '0',
    totalPages: 0,
  });
  const [imageUrls, setImageUrls] = useState<Image[]>([]);
  const [formState, setFormState] = useState<
    'loading' | 'success' | 'error' | null
  >(null);
  const [error, setError] = useState('');

  const fetchPictures = async (page: string) => {
    setFormState('loading');

    const res = await fetch(
      'https://api.unsplash.com/search/photos/?' +
        new URLSearchParams({
          query: imageName,
          per_page: IMAGES_PER_PAGE,
          page: page,
        }),
      {
        headers: new Headers({
          'Authorization': 'Client-ID ' + import.meta.env.VITE_ACCESS_KEY,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (!data.results) {
      setError(imageSearch.errors.unknownError.title[language!]);
      setFormState('error');
      return;
    }

    if (data.results.length < 1) {
      setError(imageSearch.errors.notFound.title[language!]);
      setFormState('error');
      return;
    }

    setPagination({
      currentPage: page,
      totalPages: data.total_pages,
    });

    const imageUrls: Image[] = data.results.map(
      (image: {
        urls: { small: string; full: string };
        alt_description: string;
      }): Image => ({
        url: {
          min: image.urls.small,
          full: image.urls.full,
        },
        alt: image.alt_description,
      })
    );

    setImageUrls(imageUrls);
    setFormState('success');
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetchPictures('1');
  };

  const handlePagination = async (page: string) => {
    await fetchPictures(page);
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const downloadPicture = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const image = new Image();
      image.src = fileReader.result as string;

      const link = document.createElement('a');
      link.setAttribute('download', `${imageName}__${v4().slice(0, 5)}.png`);
      link.href = fileReader.result as string;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

    fileReader.readAsDataURL(blob);
  };

  return (
    <>
      <Card
        size="md"
        className={`${classes.imageSearch} ${
          theme === 'dark' ? classes.themeDark : ''
        }`}
      >
        <form className={classes.form} onSubmit={submitHandler}>
          <input
            type="text"
            placeholder={
              imageSearch.inputElements.searchInput.placeholder.title[language!]
            }
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            disabled={formState === 'loading'}
          />
          <button disabled={formState === 'loading'}>
            {imageSearch.searchButton.title[language!]}
          </button>
        </form>
      </Card>
      {formState === 'loading' && (
        <div className={`center ${classes.loader}`}>
          <MutatingDots
            height="100"
            width="100"
            color="#85144b"
            secondaryColor="#85144b"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            visible={true}
          />
        </div>
      )}
      {formState === 'error' && (
        <Card
          className={`${classes.errorBox} center ${
            theme === 'dark' ? classes.themeDark : ''
          }`}
          size="md"
        >
          {error}
        </Card>
      )}
      {formState === 'success' && (
        <>
          <div
            className={`${classes.imageGrid} ${
              theme === 'dark' ? classes.themeDark : ''
            }`}
          >
            {imageUrls.map(({ url, alt }) => (
              <Card key={alt} className={classes.imageCard} size="sm">
                <img src={url.min} alt={alt} />
                <div className={classes.buttons}>
                  <button
                    onClick={() => downloadPicture(url.full)}
                    data-tooltip-id={`download-image`}
                    data-tooltip-content="Download"
                    data-tooltip-variant={theme === 'dark' ? 'light' : 'dark'}
                  >
                    <FaDownload />
                  </button>
                  <div className={classes.shareButtons}>
                    <button>
                      <TelegramShareButton
                        title="Check out the image"
                        url={url.full}
                      >
                        <FaTelegram />
                      </TelegramShareButton>
                    </button>
                    <button>
                      <WhatsappShareButton
                        title="Check out the image"
                        url={url.full}
                      >
                        <FaWhatsapp />
                      </WhatsappShareButton>
                    </button>
                    <button>
                      <ViberShareButton
                        title="Check out the image"
                        url={url.full}
                      >
                        <FaViber />
                      </ViberShareButton>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(url.full);
                      }}
                      data-tooltip-id={`download-image`}
                      data-tooltip-content="Copy image URL"
                      data-tooltip-variant={theme === 'dark' ? 'light' : 'dark'}
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            <Tooltip id={`download-image`} className="tooltip" offset={8} />
            <Tooltip id={`copy-image`} className="tooltip" offset={8} />
          </div>
          <div className={`${classes.pagination} center`}>
            {+pagination.currentPage > 2 && (
              <button
                onClick={() => {
                  handlePagination('1');
                }}
              >
                <FaAnglesLeft />
              </button>
            )}
            {+pagination.currentPage > 1 && (
              <button
                onClick={() => {
                  handlePagination((+pagination.currentPage - 1).toString());
                }}
              >
                <FaAngleLeft />
              </button>
            )}
            <button>{pagination.currentPage}</button>
            {+pagination.currentPage < +pagination.totalPages && (
              <button
                onClick={() => {
                  handlePagination((+pagination.currentPage + 1).toString());
                }}
              >
                <FaAngleRight />
              </button>
            )}
            {+pagination.currentPage < pagination.totalPages - 1 && (
              <button
                onClick={() => {
                  handlePagination(pagination.totalPages.toString());
                }}
              >
                <FaAnglesRight />
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ImageSearcher;
