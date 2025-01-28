import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const Level = styled.div`
  font-size: 1.2rem;
  color: #34495e;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const BlockContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  min-height: 400px;
`;

const Progress = styled.div`
  height: 20px;
  margin: 1rem 0;
  background-color: #ecf0f1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const Chance = styled.div`
  padding: 0.5rem;
  text-align: center;
  color: #e74c3c;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const MemoryBlocks = () => {
  return (
    <Background>
      <Title>Memory Blocks</Title>
      <Level>關卡資訊</Level>
      <BlockContainer>記憶方塊</BlockContainer>
      <Progress>進度條</Progress>
      <Chance>機會/命</Chance>
    </Background>
  );
};

export default MemoryBlocks;