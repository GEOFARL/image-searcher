import { v4 as uuidv4 } from 'uuid';
import { languages } from '.';

export const navItems = [
  {
    id: uuidv4(),
    title: {
      [languages[0].id]: 'Головна',
      [languages[1].id]: 'Home',
    },
    link: '/',
  },
  {
    id: uuidv4(),
    title: {
      [languages[0].id]: 'Про нас',
      [languages[1].id]: 'About',
    },
    link: '/about',
  },
];

export const imageSearch = {
  searchButton: {
    id: uuidv4(),
    title: {
      [languages[0].id]: 'Пошук',
      [languages[1].id]: 'Search',
    },
  },
  inputElements: {
    searchInput: {
      placeholder: {
        id: uuidv4(),
        title: {
          [languages[0].id]: 'Train',
          [languages[1].id]: 'Потяг',
        },
      },
    },
  },
  errors: {
    notFound: {
      id: uuidv4(),
      title: {
        [languages[0].id]: 'Зображення за даним запитом не знайдені',
        [languages[1].id]: 'Images was not found',
      },
    },
    unknownError: {
      id: uuidv4(),
      title: {
        [languages[0].id]: 'Сталася невідома помилка',
        [languages[1].id]: 'Some error occurred',
      },
    },
  },
};

export const home = {
  heading: {
    id: uuidv4(),
    title: {
      [languages[0].id]: 'Шукай зображення, що тобі до душі',
      [languages[1].id]: 'Search images that interest you',
    },
  },
};
