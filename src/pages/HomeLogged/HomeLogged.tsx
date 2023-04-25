import React, { useContext } from 'react';
import Card from '../../components/Cards/Card';
import {LoggedStyle, Title } from '../../styles/HomeLogged';
import styled from 'styled-components';
import EmptyCard from '../../components/Cards/EmptyCard';
import HeaderLogged from '../../components/Header/HeaderLogged';
import { AuthContext } from '../../contexts/auth';

const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  width: 48%;
  margin-bottom: 20px;
`;

const cards = [
  {
    id: 1,
    title: "Card 1",
    image: "https://picsum.photos/300/200?random=1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis diam semper, molestie sapien id, vehicula turpis.",
    categories: ["fashion", "food"],
  },
  {
    id: 2,
    title: "Card 2",
    image: "https://picsum.photos/300/200?random=2",
    description:
      "Nulla facilisi. In in risus at libero dapibus suscipit quis nec augue. Proin efficitur sollicitudin volutpat.",
    categories: ["health", "food"],
  },
  {
    id: 3,
    title: "Card 3",
    image: "https://picsum.photos/300/200?random=3",
    description:
      "Aliquam auctor congue sapien, eu accumsan nulla feugiat vel. Sed nec est quis enim varius finibus eget sed eros.",
    categories: ["fashion", "travel"],
  },
  {
    id: 4,
    title: "Card 4",
    image: "https://picsum.photos/300/200?random=4",
    description:
      "Vivamus venenatis ante vitae nisi tristique, nec maximus tortor ullamcorper. Quisque fermentum quam vel lacinia varius.",
    categories: ["technology", "food"],
  },
];

const HomeLogged = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
    <HeaderLogged nickname={user.nickname} img={"https://100k-faces.glitch.me/random-image"}/>
    <LoggedStyle>
    <Title>Histórias mais bem avaliadas</Title>
    <PageWrapper>
      {cards.map((card) => (
        <CardWrapper key={card.id}>
          <Card
            title={card.title}
            imageSrc={card.image}
            description={card.description}
            categories={card.categories}
          />
        </CardWrapper>
      ))}
    </PageWrapper>
    <Title>Minhas histórias</Title>
    <PageWrapper>
        <CardWrapper>
        <EmptyCard onClick={() => {}}/>
        </CardWrapper>
    </PageWrapper>
    </LoggedStyle>
    </>
  );
};

export default HomeLogged;