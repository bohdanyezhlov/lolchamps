/* eslint-disable import/no-cycle */
import _ from 'lodash';
import { render } from '../champions-page/render-champions.js';
import { getChampionData, getChampionsData } from '../getData.js';
import championsButtonCanvas from './champions-button-canvas.js';
import championTitleCanvas from './champion-title-canvas.js';
import abilitiesImageCanvas from './abilities-image-canvas.js';
import abilitiesVideoCanvas from './abilities-video-canvas.js';
import { abilitiesSlider, resetAbilitiesSlider } from './abilities-slider.js';
import skinsSlider, { resetSkinsSlider } from './skins-slider.js';
import { resetSearchInput } from '../champions-page/search-champion.js';
import { resetBgcDifficultyMenuButtons } from '../champions-page/filter-difficulty.js';

const dataDragon = await getChampionsData();

const pickRoleIcon = (role) => {
  const roleIcons = {
    Mage: '<path d="M84.48 77.3h13.41l-3.83-12.93h-9.58a36.73 36.73 0 00-27.54 12.45L50 85l-6.94-8.14a36.73 36.73 0 00-27.54-12.49H5.94L2.11 77.3h13.41a36.73 36.73 0 0127.54 12.45l.71.72h-9.1v7.42h30.9v-7.42h-9.1l.71-.72a35.85 35.85 0 0127.3-12.45"></path><path d="M56.23 54.31L50 62.21l-6.23-7.9a5.42 5.42 0 01-.24-6.47L50 37.31l6.47 10.53a5.42 5.42 0 01-.24 6.47M42.58 28.93l-7.91 12.69a13.37 13.37 0 00.72 15.09L50 75.14l14.61-18.43a13 13 0 00.72-15.09L50 17l-.48.72a5.58 5.58 0 01-4.31 1.68c-4.07 0-7.18-8.62 4.55-17.24 0 0-28.74 5.5-14.85 30.41z"></path>',
    Assassin: '<path d="M56.59 73.71l1.67-2.88c5.75-9.34 5.51-16 3.83-20.59a39.78 39.78 0 01-9.1 16 2 2 0 01-1.43.48H48.2a2.17 2.17 0 01-1.67-.72 39.78 39.78 0 01-9.1-16c-1.68 4.55-1.68 11.26 3.83 20.59l1.68 2.88-3.36 5.75 10.06 17.72L59.7 79.22z"></path><path d="M73.11 38.74c-3.35-4.31-6-10-6-18.91 0-4.07-3.59-8.15-7.66-12-4.79-4.31-5.75-5.74-9.58-5.74s-4.79 1.43-9.34 5.74c-4.07 3.83-7.66 7.91-7.66 12 0 8.86-2.88 14.6-6 18.68L12.76 52.87 2.23 45.69v12.93S2.47 84 39.58 97.89c0 0-14.13-7.18-16.28-31.13-.24-1.67-.24-9.1-.24-10.29A119.77 119.77 0 0036.71 74c-.72-1.2-1.44-2.64-2.16-3.83-5-10.54-4.07-18.2-1.67-23.47a22.77 22.77 0 017.42-8.86l9.58 9.58 9.58-9.58a22.77 22.77 0 017.42 8.86c2.4 5.27 3.59 12.93-1.43 23.23-.72 1.38-1.45 2.58-2.16 4.07a119.77 119.77 0 0013.65-17.53c0 1.19 0 8.62-.24 10.29-2.39 23.95-16.28 31.13-16.28 31.13C97.53 84 97.77 58.62 97.77 58.62V45.69l-10.53 7.18z"></path>',
    Marksman: '<path d="M28.69 27.25h6.94l1.92-6.94-13.41-7.91zM71.31 27.25l4.55-14.85-13.41 7.91 1.92 6.94zM71.31 35.39c-1.43 0-12.21-3.83-12.21-3.83L50 42.34l-9.1-10.78s-10.54 3.83-12.21 3.83c-7.67 0-4.79-7.18-4.79-7.18S4.26 48.32 2.11 64.13c0 0 5.74-8.86 24.42-13.17a26.22 26.22 0 0013.89 12.93c-.72-3.11-1.44-6.71-2.15-10.06a22.36 22.36 0 01-3.84-4.31c.72 0 7.19-.72 8.15-.72.71 2.64 4.55 28.74 4.55 28.74l-7 10.3v10L50 93.82l9.82 4.07V87.6l-7-10.3s3.84-26.1 4.55-28.74c.72 0 7.19.72 8.15.72a16.52 16.52 0 01-3.84 4.31 98.08 98.08 0 00-2.15 10.06 25.33 25.33 0 0013.94-12.93c18.68 4.55 24.42 13.17 24.42 13.17C95.74 48.32 76.1 28 76.1 28s2.88 7.42-4.79 7.42"></path> + <path d="M50 2.11l-7.66 21.31h.24L50 33.24l7.42-9.82h.24z"></path>',
    Fighter: '<path d="M67.84 56.35v5.5c8.62-8.62 14.37 0 14.37 0C112.14 40.78 90.35 2 90.35 2s-.72 17.24-15.08 27.77v16.52c-.24 4.79-3.84 7.9-7.43 10.06M17.79 62.09s4.07-6.46 10.78-2.63L20.91 48.2l6.7-16c-17.24-10.54-18-29.93-18-29.93S-12.14 41 17.79 62.09M26.89 83.89l5.51-18.68-.24-.48L19.23 77.9A17.78 17.78 0 017.5 83.17H3l-1 2.39 12 11.5zM92.27 83.89a16.24 16.24 0 01-11.74-5.27L68.8 66.88l3.83 17.72L85.8 98l12-11.49-1-2.4zM55.87 42.7c0 .24-.24.48-.24.71h.72c5.75.48 7.66 2.64 9.1 7.67a9.35 9.35 0 002.39-1.92c1-1 1.68-1.67 1.68-2.63V28.09a2 2 0 00-1.68-1.92l-31.37-5.74H36a2.39 2.39 0 00-2.39 2.39v6.71l24.9 3.35z"></path><path d="M60.18 54c-1.2-5.27-1.44-4.55-5.75-4.79L40.78 48v-3.87h5.51A4.09 4.09 0 0050.36 41l1-3.35L32.4 35l-5 12.22 11.74 17-5.54 18.47L49.88 98l16.53-15.07s-6.23-28.5-6.23-29M49.88 2.23l-4.79 10.29 4.79 3.83 4.79-3.83zM62.1 9.41l1.43 6h6l2.87-11zM30.25 15.4h6l.24-.72 1.2-5.27-10.3-5z"></path>',
    Support: '<path d="M90.4 2.11c0 27.3-25.4 36.63-25.4 36.63L60.94 61a8.39 8.39 0 00-.48 2.39 6.95 6.95 0 0013.89 0 6.7 6.7 0 00-5.75-6.7c6.71-11.5 16.29-6 16.29-6 1.43-1.44 2.63-2.88 3.83-4.07l-7.19-2.88h9.34a38.5 38.5 0 005.75-11.25L87 28.69h10.3a33 33 0 00-6.9-26.58M35.32 38.74S9.93 29.41 9.93 2.11c0 0-9.82 10.77-7.42 26.1h10.3L3.23 32a41.09 41.09 0 004.07 8.9h11l-8.61 3.59a39.83 39.83 0 005.27 6s9.58-5.51 16.29 6a6.7 6.7 0 00-5.75 6.7 6.95 6.95 0 1013.41-2.39zM45.14 22.7l2.63-6.7h4.79l2.63 6.94-5 13.89zm-1-16l-7 16 10.15 25.38v23.71l-5 16 5 10H53l5-10-5-16V48.08L63.1 22.7l-7-16z"></path>',
    Tank: '<path d="M85.92 63.89L55 90V67.48h7.42v-9.1H37.55v9.1H45v22.75L14.08 63.89 8.33 21l27.54-10.51a39.13 39.13 0 0128.26 0L91.67 21zM66.28 5a47.61 47.61 0 00-32.56 0L2.11 17.19l6.7 49.57L41.86 95A13 13 0 0050 97.89 12.5 12.5 0 0058.14 95l33.05-28.24 6.7-49.57z"></path><path d="M78.74 32.28L62 21.26v5.27H38v-5.27l-16.26 7.19a2.9 2.9 0 00-1.67 3.11l4.31 19.16a3.22 3.22 0 002.15 2.15l11.26 2.4V50h23.94v5.27l11.5-2.4a2.52 2.52 0 002.15-2.15l4.31-15.57a2.39 2.39 0 00-1-2.87M57.42 20.07H42.58L50 11.68z"></path>',
  };

  return roleIcons[role];
};

const fillDifficultyIcon = (difficulty, container) => {
  const difficultyMap = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 2,
    9: 2,
    10: 2,
  };

  const indicators = container.children;

  for (let i = 0; i < indicators.length; i += 1) {
    if (i <= difficultyMap[difficulty]) {
      indicators[i].classList.add('difficulty-value-item');
    } else {
      indicators[i].classList.add('difficulty-value-item-empty');
    }
  }
};

const fillDifficulty = (difficulty) => {
  const difficultyMap = {
    0: 'low',
    1: 'low',
    2: 'low',
    3: 'low',
    4: 'moderate',
    5: 'moderate',
    6: 'moderate',
    7: 'moderate',
    8: 'high',
    9: 'high',
    10: 'high',
  };

  return difficultyMap[difficulty];
};

const createSeeMoreButton = () => {
  const container = document.querySelector('[data-testid="overview:description"]');
  container.innerHTML = '<!-- --> <button data-testid="overview:seemorebutton">See More</button>';
};

const seeMoreDescription = (container, text) => {
  const seeMoreButton = document.querySelector('[data-testid="overview:seemorebutton"]');
  seeMoreButton.addEventListener('click', () => {
    // eslint-disable-next-line no-param-reassign
    container.textContent = text;
    championTitleCanvas();
  });
};

const createLinks = (links, name) => {
  links[0].setAttribute('href', `https://u.gg/lol/champions/${name}/build`);
  links[1].setAttribute('href', `https://na.op.gg/champion/${name}/statistics/`);
  links[2].setAttribute('href', `https://www.probuilds.net/champions/details/${name}`);
};

export const normalizeName = (name) => {
  let normalizedName = name;
  if (normalizedName === 'Nunu & Willump') {
    normalizedName = 'Nunu';
  }
  if (normalizedName === 'Wukong') {
    normalizedName = 'MonkeyKing';
  }
  if (normalizedName === 'Renata Glasc') {
    normalizedName = 'Renata';
  }
  if (normalizedName === 'Rek\'Sai') {
    normalizedName = 'RekSai';
  }
  if (normalizedName === 'Kog\'Maw') {
    normalizedName = 'KogMaw';
  }
  if (normalizedName === 'LeBlanc') {
    normalizedName = _.capitalize(normalizedName);
  }
  if (/\s/.test(normalizedName)) {
    normalizedName = normalizedName.replace(/ /g, '');
  }
  if (/[']/.test(normalizedName)) {
    normalizedName = _.capitalize(normalizedName.replace(/'/g, ''));
  }
  if (/[.]/.test(normalizedName)) {
    normalizedName = normalizedName.replace(/\./g, '');
  }

  return normalizedName;
};

const createOverviewSection = (championObj) => {
  const name = document.querySelector('[data-testid="overview:name"]');
  name.textContent = championObj.name;

  const introImages = document.querySelectorAll('.background-image, .section-inner-img');
  introImages.forEach((introImage) => {
    const defaultName = championObj.name;
    const correctName = normalizeName(defaultName);
    const image = introImage;

    image.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${correctName}_0.jpg`;
  });

  const subtitle = document.querySelector('[data-testid="overview:subtitle"]');
  subtitle.textContent = championObj.title;

  const roleicon = document.querySelector('[data-testid="overview:roleicon"]');
  roleicon.innerHTML = pickRoleIcon(championObj.tags[0]);

  const role = document.querySelector('[data-testid="overview:role"]');
  // eslint-disable-next-line prefer-destructuring
  role.textContent = championObj.tags[0];

  const difficultyIcon = document.querySelector('[data-testid="overview:difficultyicon"]');
  fillDifficultyIcon(championObj.info.difficulty, difficultyIcon);

  const difficulty = document.querySelector('[data-testid="overview:difficulty"]');
  difficulty.textContent = fillDifficulty(championObj.info.difficulty);

  createSeeMoreButton();
  const description = document.querySelector('[data-testid="overview:description"]');
  description.insertAdjacentText('afterbegin', championObj.blurb);
  seeMoreDescription(description, championObj.lore);

  const links = document.querySelectorAll('[data-testid="overview:link-0"], [data-testid="overview:link-1"], [data-testid="overview:link-2"]');
  createLinks(links, championObj.name);
};

const setProperty = (arr, propertyName, championObj) => {
  arr.forEach((element, i) => {
    const item = element;
    if (propertyName === 'image') {
      if (i === 0) {
        const value = championObj.passive.image.full;
        item.src = `http://ddragon.leagueoflegends.com/cdn/12.16.1/img/passive/${value}`;
      } else {
        const value = championObj.spells[i - 1].image.full;
        item.src = `https://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/${value}`;
      }
    }

    const mapHotKey = {
      1: 'q',
      2: 'w',
      3: 'e',
      4: 'r',
    };
    if (propertyName === 'hotkey') {
      if (i === 0) {
        item.textContent = 'Passive';
      } else {
        item.textContent = mapHotKey[i];
      }
    }

    if (propertyName === 'name') {
      if (i === 0) {
        const value = championObj.passive[propertyName];
        item.textContent = value;
      } else {
        const value = championObj.spells[i - 1][propertyName];
        item.textContent = value;
      }
    }

    if (propertyName === 'description') {
      if (i === 0) {
        const value = championObj.passive[propertyName];
        const clearText = value.replace(/<.*?>/g, '');
        item.textContent = clearText;
      } else {
        const value = championObj.spells[i - 1][propertyName];
        const clearText = value.replace(/<.*?>/g, '');
        item.textContent = clearText;
      }
    }
  });
};

const normalizeKey = (key) => {
  let resultKey = key;
  // eslint-disable-next-line prefer-destructuring
  let length = resultKey.length;
  const maxLength = 4;

  while (length < maxLength) {
    resultKey = `0${resultKey}`;
    length += 1;
  }
  return resultKey;
};

const getVideoKey = (i) => {
  const mapVideoKeys = {
    0: 'P1',
    1: 'Q1',
    2: 'W1',
    3: 'E1',
    4: 'R1',
  };

  return mapVideoKeys[i];
};

const setPropertyVideo = (arr, championObj) => {
  // eslint-disable-next-line no-unused-vars
  arr.forEach((abilitiesVideoContainer, i) => {
    const video = abilitiesVideoContainer.children[0];
    const championKey = normalizeKey(championObj.key);

    const value = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${championKey}/ability_${championKey}_${getVideoKey(i)}.webm`;
    if (!value) {
      video.remove();

      const noVideoContainer = document.createElement('div');
      noVideoContainer.classList.add('abilities-no-video-container');
      abilitiesVideoContainer.append(noVideoContainer);

      const noVideoBackgroundImage = document.createElement('img');
      noVideoBackgroundImage.classList.add('abilities-no-video-background-image');
      noVideoBackgroundImage.setAttribute('src', 'https://www.leagueoflegends.com/static/no-ability-background-fdc6db338e4adb76a0dc80e0728ed6d0.jpg');
      noVideoContainer.append(noVideoBackgroundImage);

      const noVideoContent = document.createElement('div');
      noVideoContent.classList.add('abilities-no-video-content');
      noVideoContainer.append(noVideoContent);

      const noVideoImage = document.createElement('img');
      noVideoImage.classList.add('abilities-no-video-image');
      noVideoImage.setAttribute('src', 'https://www.leagueoflegends.com/static/no-ability-icon-feb372ba66a6fcea09cdacb239b4f171.png');
      noVideoContent.append(noVideoImage);

      const noVideoText = document.createElement('div');
      noVideoText.classList.add('abilities-no-video-text');
      noVideoText.textContent = "CAN'T DISPLAY THIS ABILITY IN VIDEO FORMAT";
      noVideoContent.append(noVideoText);
    } else {
      // eslint-disable-next-line no-param-reassign
      abilitiesVideoContainer.innerHTML = `<video class="abilities-ability-video" preload="metadata" autoplay="" loop="" muted="" src=${value}></video>`;
    }
  });
};

const createAbilitiesSection = (championObj) => {
  const abilitiesImages = document.querySelectorAll('[data-testid="abilities:image"');
  setProperty(abilitiesImages, 'image', championObj);

  const abilitiesHotkeys = document.querySelectorAll('[data-testid="abilities:ability:hotkey"');
  setProperty(abilitiesHotkeys, 'hotkey', championObj);

  const abilitiesNames = document.querySelectorAll('[data-testid="abilities:ability:name"');
  setProperty(abilitiesNames, 'name', championObj);

  const abilitiesDescriptions = document.querySelectorAll('[data-testid="abilities:ability:description"');
  setProperty(abilitiesDescriptions, 'description', championObj);

  const abilitiesVideoContainers = document.querySelectorAll('[data-testid="abilities:video-container"');
  setPropertyVideo(abilitiesVideoContainers, championObj);

  const roleicon = document.querySelector('[data-testid="abilities:backgroundicon"]');
  roleicon.innerHTML = pickRoleIcon(championObj.tags[0]);
};

const creatingItems = (championObj) => {
  createOverviewSection(championObj);
  createAbilitiesSection(championObj);
  // createAvailableSkins(championObj);
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

// is it right?
const resetDifficulty = () => {
  const difficultyPlaceholder = document.querySelector('.difficulty-placeholder');
  const difficultySingleValue = document.querySelector('.difficulty-single-value');
  const difficultyIndicatorClear = document.querySelector('.difficulty-indicator-clear');
  difficultyPlaceholder.style.display = 'block';
  difficultySingleValue.style.display = 'none';
  difficultyIndicatorClear.style.display = 'none';
  // toggleDropDownMenu();
  resetBgcDifficultyMenuButtons();
};

const resetFillDifficultyIcon = () => {
  const difficultyIcon = document.querySelector('[data-testid="overview:difficultyicon"]');
  const indicators = difficultyIcon.children;
  for (let i = 0; i < indicators.length; i += 1) {
    indicators[i].className = '';
  }
};

const goTop = () => window.scrollTo(0, 0);

const backToList = () => {
  const button = document.querySelector('[data-testid="overview:championlistbutton"]');
  button.addEventListener('click', () => {
    const championsList = document.querySelector('.main');
    championsList.style.display = 'block';
    const championPage = document.querySelector('.champion-page');
    championPage.style.display = 'none';

    render(dataDragon);
    resetSearchInput();
    resetActiveTab();
    resetDifficulty();
    resetFillDifficultyIcon();
    resetAbilitiesSlider();
    resetSkinsSlider();
    goTop();
  });
};

const getChampionInfo = async (name) => {
  const championName = normalizeName(name);

  const dataDragonChampion = await getChampionData(championName);
  return dataDragonChampion;
};

const renderChampionPage = async () => {
  const links = document.querySelectorAll('.champions-list-item');
  // eslint-disable-next-line no-restricted-syntax
  for (const link of links) {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const championName = link.querySelector('.item-text').textContent;
      const championData = await getChampionInfo(championName);
      const { data } = championData;
      const championObj = Object.values(data)[0];
      creatingItems(championObj);

      const championsList = document.querySelector('.main');
      championsList.style.display = 'none';
      const championPage = document.querySelector('.champion-page');
      championPage.style.display = 'block';

      championsButtonCanvas();
      championTitleCanvas();
      abilitiesSlider();
      abilitiesImageCanvas();
      abilitiesVideoCanvas();
      skinsSlider(championObj);
      goTop();

      backToList();
    });
  }
};

export default () => {
  renderChampionPage();
};
