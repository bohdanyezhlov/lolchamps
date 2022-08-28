import { render } from './render-champions.js';
import data from '../getData.js';

const renderSearchChampion = (dataChampions) => {
  const { champions } = dataChampions;
  const searchButtons = document.querySelectorAll('.search-dropdown-content-item');
  const search = document.querySelector('.search-input');
  const searchPlaceholder = document.querySelector('.search-placeholder');
  searchButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const championButtons = document.querySelectorAll('.search-dropdown-content-item');
      championButtons.forEach((championButton) => {
        const buttonUpdate = championButton;
        buttonUpdate.style.display = 'block';
      });

      const choosenChampionName = button.textContent;
      search.value = '';
      searchPlaceholder.style.display = 'block';
      searchPlaceholder.textContent = choosenChampionName;
      searchPlaceholder.classList.remove('search-placeholder-focused');
      const choosenChampion = champions.filter(({ name }) => name === choosenChampionName);
      render({
        champions: choosenChampion,
      });
    });
  });
};

const toggleDropdownContent = () => {
  const searchButton = document.querySelector('.search-container');
  const contentContainer = document.querySelector('.search-dropdown-content');
  contentContainer.classList.toggle('display-block');

  const searchIcon = document.querySelector('.search-value');
  searchIcon.classList.toggle('search-icon-focused');

  const searchInput = document.querySelector('.search-input');
  searchInput.classList.toggle('search-input-focused');

  const search = document.querySelector('.search');
  search.classList.toggle('search-is-focused');

  const searchPlaceholder = document.querySelector('.search-placeholder');
  if (searchPlaceholder.textContent === '' || searchPlaceholder.textContent.toLocaleLowerCase() === 'search') {
    searchPlaceholder.classList.toggle('search-placeholder-focused');
  }

  document.addEventListener('click', (e) => {
    const isClickInside = searchButton.contains(e.target);
    if (!isClickInside) {
      contentContainer.classList.remove('display-block');
      searchIcon.classList.remove('search-icon-focused');
      searchInput.classList.remove('search-input-focused');
      search.classList.remove('search-is-focused');
      searchPlaceholder.classList.remove('search-placeholder-focused');
    }
  });
};

const searchChampion = (dataChampions) => {
  const { champions } = dataChampions;
  const searchButton = document.querySelector('.search-container');
  const contentContainer = document.querySelector('.search-dropdown-content');
  const search = document.querySelector('.search-input');

  searchButton.addEventListener('click', () => {
    toggleDropdownContent();
    search.focus();

    if (!contentContainer.children.length) {
      champions.forEach((champion) => {
        const championName = champion.name;
        const championButton = document.createElement('div');
        championButton.classList.add('search-dropdown-content-item');
        championButton.textContent = championName;
        contentContainer.append(championButton);
      });
      renderSearchChampion(dataChampions);
    }
  });

  search.addEventListener('keyup', (e) => {
    const searchInput = document.querySelector('.search-input');
    const searchPlaceholder = document.querySelector('.search-placeholder');
    searchPlaceholder.style.display = 'block';
    if (searchInput.value) {
      searchPlaceholder.style.display = 'none';
    }

    const text = e.target.value.toLowerCase();
    const championButtons = document.querySelectorAll('.search-dropdown-content-item');
    championButtons.forEach((championButton) => {
      const button = championButton;
      button.style.display = 'none';

      const buttonText = championButton.textContent.toLocaleLowerCase();
      if (buttonText.includes(text)) {
        button.style.display = 'block';
      }
    });
  });
};

export default () => {
  searchChampion(data);
};