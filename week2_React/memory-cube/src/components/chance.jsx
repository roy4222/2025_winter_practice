import React from 'react';
import styled from 'styled-components';

const ChanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary}10;
`;

const ChanceIcon = styled.span`
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  transition: all 0.3s ease;
  opacity: ${({ $active }) => $active ? 1 : 0.3};
`;

const ChanceText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const Chance = ({ chances }) => {
  return (
    <ChanceContainer>
      <ChanceText>剩餘生命：</ChanceText>
      {[...Array(3)].map((_, index) => (
        <ChanceIcon key={index} $active={index < chances}>
          ❤️
        </ChanceIcon>
      ))}
    </ChanceContainer>
  );
};

export default Chance;