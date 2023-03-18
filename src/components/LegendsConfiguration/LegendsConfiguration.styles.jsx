import { Button } from 'react-bootstrap';
import styled from 'styled-components';

/**
 * This component consists of stylings for the legends
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

export const MainChartContainer = styled.div`
  background: #131722;
  padding-top: 70px;
  width: 80%;
  margin: 0 20px auto;
  display: flex;
`;

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
    return props.bg;
  }};
`;

export const ChartContainer = styled.div`
  width: 70%;
  max-height: ${(props) => {
    return props.height;
  }};
`;

export const Container = styled.div`
  background: #131722;
  min-height: 100vh;
`;

export const CloseButton = styled(Button)`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
