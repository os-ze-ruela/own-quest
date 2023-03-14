import React from 'react';
import Card from '../../components/Cards/Card';
import {LoggedStyle, Title } from '../../styles/HomeLogged';
import styled from 'styled-components';
import EmptyCard from '../../components/Cards/EmptyCard';
import Header from '../../components/Header/Header';

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
    image: "https://source.unsplash.com/random/300x200",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis diam semper, molestie sapien id, vehicula turpis.",
    categories: ["fashion", "food"],
  },
  {
    id: 2,
    title: "Card 2",
    image: "https://source.unsplash.com/random/300x200",
    description:
      "Nulla facilisi. In in risus at libero dapibus suscipit quis nec augue. Proin efficitur sollicitudin volutpat.",
    categories: ["health", "food"],
  },
  {
    id: 3,
    title: "Card 3",
    image: "https://source.unsplash.com/random/300x200",
    description:
      "Aliquam auctor congue sapien, eu accumsan nulla feugiat vel. Sed nec est quis enim varius finibus eget sed eros.",
    categories: ["fashion", "travel"],
  },
  {
    id: 4,
    title: "Card 4",
    image: "https://source.unsplash.com/random/300x200",
    description:
      "Vivamus venenatis ante vitae nisi tristique, nec maximus tortor ullamcorper. Quisque fermentum quam vel lacinia varius.",
    categories: ["technology", "food"],
  },
];

const HomeLogged = () => {
  return (
    <>
    <Header page='Criar' redirect='/create'/>
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