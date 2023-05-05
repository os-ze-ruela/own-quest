import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar/Sidebar";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 24px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const ContentContainer = styled.div`
  width: 600px;
  height: 400px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const VisualizationTest = () => {
  return (
    <MainContainer>
      <Title>Creation</Title>
      <PageContainer>
        <Sidebar />
        <ContentContainer>
          <p>Aqui está o conteúdo da página.</p>
        </ContentContainer>
      </PageContainer>
    </MainContainer>
  );
};

export default VisualizationTest;
