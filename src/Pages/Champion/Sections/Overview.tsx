import { useState } from 'react';

import { Champion } from '../../../types';
import getChampionLargeImageLink from '../../../utils/getChampionLargeImageLink';
import {
  BackgroundAsset,
  BackgroundImage,
  Dock,
  ForegroundAsset,
  Heading,
  Intro,
  MainImage,
  Name,
  OverviewSection,
  RevealWrapperName,
  RevealWrapperTitle,
  SectionInner,
  Title,
  WrapBackgroundImage,
  Wrapper,
} from './style';

type ChampionProps = {
  champion: Champion;
};

const Overview = ({ champion }: ChampionProps) => {
  const [isShown, setIsShown] = useState(false);

  const seeMoreHandler = () => setIsShown(true);

  return (
    <OverviewSection>
      <BackgroundAsset>
        <WrapBackgroundImage>
          <BackgroundImage
            src={getChampionLargeImageLink(champion.id)}
            alt={`${champion.name} image`}
          />
        </WrapBackgroundImage>
      </BackgroundAsset>
      <SectionInner>
        <ForegroundAsset>
          <MainImage
            src={getChampionLargeImageLink(champion.id)}
            alt={`${champion.name} image`}
          />
        </ForegroundAsset>
      </SectionInner>
      <Dock>
        <Name>
          <Wrapper>
            <Heading>
              <Intro>
                <RevealWrapperTitle>
                  <span>{champion.title}</span>
                </RevealWrapperTitle>
              </Intro>
              <Title>
                <RevealWrapperName>
                  <span>{champion.name}</span>
                </RevealWrapperName>
              </Title>
            </Heading>
          </Wrapper>
        </Name>
      </Dock>
      {/* <Info>
        <Specs>
          <SpecsList>
            <SpecsItem>
              <SpecsItemIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="style__StyledSpecsIcon-sc-8gkpub-17-c dnNsJq"
                >
                  <path d="M84.48 77.3h13.41l-3.83-12.93h-9.58a36.73 36.73 0 00-27.54 12.45L50 85l-6.94-8.14a36.73 36.73 0 00-27.54-12.49H5.94L2.11 77.3h13.41a36.73 36.73 0 0127.54 12.45l.71.72h-9.1v7.42h30.9v-7.42h-9.1l.71-.72a35.85 35.85 0 0127.3-12.45"></path>
                  <path d="M56.23 54.31L50 62.21l-6.23-7.9a5.42 5.42 0 01-.24-6.47L50 37.31l6.47 10.53a5.42 5.42 0 01-.24 6.47M42.58 28.93l-7.91 12.69a13.37 13.37 0 00.72 15.09L50 75.14l14.61-18.43a13 13 0 00.72-15.09L50 17l-.48.72a5.58 5.58 0 01-4.31 1.68c-4.07 0-7.18-8.62 4.55-17.24 0 0-28.74 5.5-14.85 30.41z"></path>
                </svg>
              </SpecsItemIcon>
              <SpecsItemType>Role</SpecsItemType>
              <SpecsItemValue>{champion.tags[0]}</SpecsItemValue>
            </SpecsItem>

            <SpecsItem>
              <SpecsItemIcon></SpecsItemIcon>
            </SpecsItem>
          </SpecsList>
        </Specs>
      </Info> */}
      <p>{isShown ? champion.lore : champion.blurb}</p>
      {!isShown && <button onClick={seeMoreHandler}>See more</button>}
      <div>{champion.tags[0]}</div>
      <div>{champion.info.difficulty}</div>
    </OverviewSection>
  );
};

export default Overview;
