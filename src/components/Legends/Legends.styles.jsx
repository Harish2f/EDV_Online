import styled from 'styled-components';

export const LegendContainer = styled.div`
  max-height: 80vh;
  width: 25%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  min-width: fit-content;
  font-size: 13px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TagDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${(props) => {
    // @ts-ignore
    return props.bg;
  }};
`;
