import { Button, Modal, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

/**
 * This component consists of stylings for the Search Modal
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

export const AppNavBar = styled(Navbar)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

export const NavBarButton = styled(Button)`
  background: #131722 !important;
  border: 1px solid #ffffff2b !important;
`;

export const Img = styled.img`
  width: ${(props) => {
    return props.width || '25px';
  }};
  height: ${(props) => {
    return props.height || '25px';
  }};
  margin-right: 6px;
`;

export const ModalHeader = styled(Modal.Header)`
  border-bottom: 1px solid #ffffff2e;
  color: #fff;
`;

export const SearchBar = styled.div`
  display: flex;
  border-bottom: 1px solid #80808087;
  align-items: center;
  padding: 0px 10px;
`;

export const I = styled.i`
  color: #4d4c4c;
`;

export const Input = styled.input`
  width: 100%;
  padding: 6px 10px;
  background: transparent;
  border: 0px solid #80808000;
  outline: none;
  color: #929292;
  font-weight: 500;
`;

export const OptionButton = styled.button`
  border: 0;
  margin: 5px;
  background: #2a2e39;
  color: #ffffffbf;
  padding: 5px 15px;
  border-radius: 47px;
  font-size: 14px;
  font-weight: 500;
`;

export const Symbol = styled.span`
  border: 0;
  margin: 5px;
  background: #2a2e39;
  color: #ffffffbf;
  padding: 5px 15px;
  border-radius: 47px;
  font-size: 14px;
  font-weight: 500;
`;

export const UL = styled.ul`
  height: 300px;
  overflow-y: scroll;
  margin-top: 22px;
  border-top: 1px solid #474a53;
  padding: 10px 0 0;
`;

export const SuggestionsGrid = styled.div`
  display: grid;
  align-content: baseline;
  grid-template-columns: repeat(3, 1fr);
  height: 300px;
  overflow-y: scroll;
  margin-top: 22px;
  border-top: 1px solid #474a53;
  padding: 10px 0 0;

  & > * {
    max-height: 31px;
  }
`;
