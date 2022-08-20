// eslint-disable-next-line import/no-cycle
import { render } from './render-champions.js';
import data from './getData.js';
import championsButtonCanvas from './champions-button-canvas.js';

const pickRoleIcon = (role) => {
  const roleIcons = {
    mage: '<path d="M84.48 77.3h13.41l-3.83-12.93h-9.58a36.73 36.73 0 00-27.54 12.45L50 85l-6.94-8.14a36.73 36.73 0 00-27.54-12.49H5.94L2.11 77.3h13.41a36.73 36.73 0 0127.54 12.45l.71.72h-9.1v7.42h30.9v-7.42h-9.1l.71-.72a35.85 35.85 0 0127.3-12.45"></path><path d="M56.23 54.31L50 62.21l-6.23-7.9a5.42 5.42 0 01-.24-6.47L50 37.31l6.47 10.53a5.42 5.42 0 01-.24 6.47M42.58 28.93l-7.91 12.69a13.37 13.37 0 00.72 15.09L50 75.14l14.61-18.43a13 13 0 00.72-15.09L50 17l-.48.72a5.58 5.58 0 01-4.31 1.68c-4.07 0-7.18-8.62 4.55-17.24 0 0-28.74 5.5-14.85 30.41z"></path>',
    assasin: '<path d="M56.59 73.71l1.67-2.88c5.75-9.34 5.51-16 3.83-20.59a39.78 39.78 0 01-9.1 16 2 2 0 01-1.43.48H48.2a2.17 2.17 0 01-1.67-.72 39.78 39.78 0 01-9.1-16c-1.68 4.55-1.68 11.26 3.83 20.59l1.68 2.88-3.36 5.75 10.06 17.72L59.7 79.22z"></path><path d="M73.11 38.74c-3.35-4.31-6-10-6-18.91 0-4.07-3.59-8.15-7.66-12-4.79-4.31-5.75-5.74-9.58-5.74s-4.79 1.43-9.34 5.74c-4.07 3.83-7.66 7.91-7.66 12 0 8.86-2.88 14.6-6 18.68L12.76 52.87 2.23 45.69v12.93S2.47 84 39.58 97.89c0 0-14.13-7.18-16.28-31.13-.24-1.67-.24-9.1-.24-10.29A119.77 119.77 0 0036.71 74c-.72-1.2-1.44-2.64-2.16-3.83-5-10.54-4.07-18.2-1.67-23.47a22.77 22.77 0 017.42-8.86l9.58 9.58 9.58-9.58a22.77 22.77 0 017.42 8.86c2.4 5.27 3.59 12.93-1.43 23.23-.72 1.38-1.45 2.58-2.16 4.07a119.77 119.77 0 0013.65-17.53c0 1.19 0 8.62-.24 10.29-2.39 23.95-16.28 31.13-16.28 31.13C97.53 84 97.77 58.62 97.77 58.62V45.69l-10.53 7.18z"></path>',
    marksman: '<path d="M28.69 27.25h6.94l1.92-6.94-13.41-7.91zM71.31 27.25l4.55-14.85-13.41 7.91 1.92 6.94zM71.31 35.39c-1.43 0-12.21-3.83-12.21-3.83L50 42.34l-9.1-10.78s-10.54 3.83-12.21 3.83c-7.67 0-4.79-7.18-4.79-7.18S4.26 48.32 2.11 64.13c0 0 5.74-8.86 24.42-13.17a26.22 26.22 0 0013.89 12.93c-.72-3.11-1.44-6.71-2.15-10.06a22.36 22.36 0 01-3.84-4.31c.72 0 7.19-.72 8.15-.72.71 2.64 4.55 28.74 4.55 28.74l-7 10.3v10L50 93.82l9.82 4.07V87.6l-7-10.3s3.84-26.1 4.55-28.74c.72 0 7.19.72 8.15.72a16.52 16.52 0 01-3.84 4.31 98.08 98.08 0 00-2.15 10.06 25.33 25.33 0 0013.94-12.93c18.68 4.55 24.42 13.17 24.42 13.17C95.74 48.32 76.1 28 76.1 28s2.88 7.42-4.79 7.42"></path> + <path d="M50 2.11l-7.66 21.31h.24L50 33.24l7.42-9.82h.24z"></path>',
    fighter: '<path d="M67.84 56.35v5.5c8.62-8.62 14.37 0 14.37 0C112.14 40.78 90.35 2 90.35 2s-.72 17.24-15.08 27.77v16.52c-.24 4.79-3.84 7.9-7.43 10.06M17.79 62.09s4.07-6.46 10.78-2.63L20.91 48.2l6.7-16c-17.24-10.54-18-29.93-18-29.93S-12.14 41 17.79 62.09M26.89 83.89l5.51-18.68-.24-.48L19.23 77.9A17.78 17.78 0 017.5 83.17H3l-1 2.39 12 11.5zM92.27 83.89a16.24 16.24 0 01-11.74-5.27L68.8 66.88l3.83 17.72L85.8 98l12-11.49-1-2.4zM55.87 42.7c0 .24-.24.48-.24.71h.72c5.75.48 7.66 2.64 9.1 7.67a9.35 9.35 0 002.39-1.92c1-1 1.68-1.67 1.68-2.63V28.09a2 2 0 00-1.68-1.92l-31.37-5.74H36a2.39 2.39 0 00-2.39 2.39v6.71l24.9 3.35z"></path><path d="M60.18 54c-1.2-5.27-1.44-4.55-5.75-4.79L40.78 48v-3.87h5.51A4.09 4.09 0 0050.36 41l1-3.35L32.4 35l-5 12.22 11.74 17-5.54 18.47L49.88 98l16.53-15.07s-6.23-28.5-6.23-29M49.88 2.23l-4.79 10.29 4.79 3.83 4.79-3.83zM62.1 9.41l1.43 6h6l2.87-11zM30.25 15.4h6l.24-.72 1.2-5.27-10.3-5z"></path>',
    support: '<path d="M90.4 2.11c0 27.3-25.4 36.63-25.4 36.63L60.94 61a8.39 8.39 0 00-.48 2.39 6.95 6.95 0 0013.89 0 6.7 6.7 0 00-5.75-6.7c6.71-11.5 16.29-6 16.29-6 1.43-1.44 2.63-2.88 3.83-4.07l-7.19-2.88h9.34a38.5 38.5 0 005.75-11.25L87 28.69h10.3a33 33 0 00-6.9-26.58M35.32 38.74S9.93 29.41 9.93 2.11c0 0-9.82 10.77-7.42 26.1h10.3L3.23 32a41.09 41.09 0 004.07 8.9h11l-8.61 3.59a39.83 39.83 0 005.27 6s9.58-5.51 16.29 6a6.7 6.7 0 00-5.75 6.7 6.95 6.95 0 1013.41-2.39zM45.14 22.7l2.63-6.7h4.79l2.63 6.94-5 13.89zm-1-16l-7 16 10.15 25.38v23.71l-5 16 5 10H53l5-10-5-16V48.08L63.1 22.7l-7-16z"></path>',
    tank: '<path d="M85.92 63.89L55 90V67.48h7.42v-9.1H37.55v9.1H45v22.75L14.08 63.89 8.33 21l27.54-10.51a39.13 39.13 0 0128.26 0L91.67 21zM66.28 5a47.61 47.61 0 00-32.56 0L2.11 17.19l6.7 49.57L41.86 95A13 13 0 0050 97.89 12.5 12.5 0 0058.14 95l33.05-28.24 6.7-49.57z"></path><path d="M78.74 32.28L62 21.26v5.27H38v-5.27l-16.26 7.19a2.9 2.9 0 00-1.67 3.11l4.31 19.16a3.22 3.22 0 002.15 2.15l11.26 2.4V50h23.94v5.27l11.5-2.4a2.52 2.52 0 002.15-2.15l4.31-15.57a2.39 2.39 0 00-1-2.87M57.42 20.07H42.58L50 11.68z"></path>',
  };

  return roleIcons[role];
};

const fillDifficaltyIcon = (difficalty, container) => {
  const difficaltyMap = {
    low: 0,
    moderate: 1,
    high: 2,
  };

  const indicators = container.children;

  for (let i = 0; i < indicators.length; i += 1) {
    // console.log(i, difficalty, difficaltyMap[difficalty]);
    if (i <= difficaltyMap[difficalty]) {
      // console.log('if');
      indicators[i].classList.add('difficalty-value-item');
    } else {
      // console.log('else');
      indicators[i].classList.add('difficalty-value-item-empty');
    }
  }
};

const firstPartOfDescription = (description) => {
  const maxSize = 260;
  const minSize = 245;
  let result = '';
  for (let i = 0; i < maxSize; i += 1) {
    const currentChar = description[i];
    const nextChar = description[i + 1];

    if (i >= minSize && nextChar === ' ' && currentChar !== ('.' || ',') && nextChar !== ('.' || ',')) { // fix this Ahri
      // console.log(description[i], nextChar);
      result = description.slice(0, i + 1);
      break;
    }
  }

  return `${result}...`;
};

const createSeeMoreButton = () => {
  const container = document.querySelector('[data-testid="overview:description"]');
  container.innerHTML = '<!-- --> <button data-testid="overview:seemorebutton">See More</button>';
};

const seeMoreDescription = (container, text) => {
  const seeMoreButton = document.querySelector('[data-testid="overview:seemorebutton"]');
  // console.log(seeMoreButton, 'this bag');
  seeMoreButton.addEventListener('click', () => {
    // eslint-disable-next-line no-param-reassign
    container.textContent = text;
  });
};

const createLinks = (links, name) => {
  links[0].setAttribute('href', `https://u.gg/lol/champions/${name}/build`);
  links[1].setAttribute('href', `https://na.op.gg/champion/${name}/statistics/`);
  links[2].setAttribute('href', `https://www.probuilds.net/champions/details/${name}`);
};

const creatingOverwiev = (championObj) => {
  const introImages = document.querySelectorAll('.background-image, .section-inner-img');
  introImages.forEach((introImage) => {
    const image = introImage;
    image.src = championObj.largeImage;
  });

  const subtitle = document.querySelector('[data-testid="overview:subtitle"]');
  subtitle.textContent = championObj.subtitle;

  const name = document.querySelector('[data-testid="overview:name"]');
  name.textContent = championObj.name;

  const roleicon = document.querySelector('[data-testid="overview:roleicon"]');
  roleicon.innerHTML = pickRoleIcon(championObj.role);

  const role = document.querySelector('[data-testid="overview:role"]');
  role.textContent = championObj.role;

  const difficaltyicon = document.querySelector('[data-testid="overview:difficaltyicon"]');
  fillDifficaltyIcon(championObj.difficalty, difficaltyicon);

  const difficalty = document.querySelector('[data-testid="overview:difficalty"]');
  difficalty.textContent = championObj.difficalty;

  createSeeMoreButton();
  const description = document.querySelector('[data-testid="overview:description"]');
  description.insertAdjacentText('afterbegin', firstPartOfDescription(championObj.description));
  // console.log(description, 'now');
  seeMoreDescription(description, championObj.description);

  const links = document.querySelectorAll('[data-testid="overview:link-0"], [data-testid="overview:link-1"], [data-testid="overview:link-2"]');
  createLinks(links, championObj.name);
};

const creatingAbilities = (championObj) => {
  const roleicon = document.querySelector('[data-testid="abilities:backgroundicon"]');
  roleicon.innerHTML = pickRoleIcon(championObj.role);
  // console.log(championObj);
};

const creatingItems = (championObj) => {
  creatingOverwiev(championObj);
  creatingAbilities(championObj);
};

// is it right?
const resetActiveTab = () => {
  const buttons = document.querySelectorAll('.role-btn');

  buttons.forEach(() => {
    buttons.forEach((item) => item.classList.remove('role-active'));
    const activeButton = document.querySelector('.role-btn');
    activeButton.classList.add('role-active');
  });
};

const resetDifficalty = () => {
  const difficaltyPlaceholder = document.querySelector('.difficalty-placeholder');
  const difficaltySingleValue = document.querySelector('.difficalty-single-value');
  const difficaltyIndicatorClear = document.querySelector('.difficalty-indicator-clear');
  difficaltyPlaceholder.style.display = 'block';
  difficaltySingleValue.style.display = 'none';
  difficaltyIndicatorClear.style.display = 'none';
  // toggleDropDownMenu();
};

const goTop = () => window.scrollTo(0, 0);

const backToList = () => {
  const button = document.querySelector('[data-testid="overview:championlistbutton"]');
  button.addEventListener('click', () => {
    const championsList = document.querySelector('.main');
    championsList.style.display = 'block';
    const championPage = document.querySelector('.champion-page');
    championPage.style.display = 'none';

    render(data);
    resetActiveTab();
    resetDifficalty();
    goTop();
  });
};

const getChampionInfo = (championName, dataChampions) => {
  const { champions } = dataChampions;
  const filterChampion = champions.filter((champion) => champion.name === championName);
  return filterChampion[0];
};

const renderChampionPage = (dataChampions) => {
  const links = document.querySelectorAll('.champions-list-item');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const championName = link.querySelector('.item-text').textContent;
      // eslint-disable-next-line no-unused-vars
      const championObj = getChampionInfo(championName, dataChampions);
      creatingItems(championObj);

      const championsList = document.querySelector('.main');
      championsList.style.display = 'none';
      const championPage = document.querySelector('.champion-page');
      championPage.style.display = 'block';

      championsButtonCanvas();
      goTop();

      backToList();
    });
  });
};

export default () => {
  renderChampionPage(data);
};
