import styled from "@emotion/styled";

export const BackdropDrawer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6 );
  position: fixed;
  top: 0;
  z-index: 50;
`

export const CloseButton = styled.button`
  position: absolute;
  height: 40px;
  top: 10px;
  right: 10px; 
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
`

export const DrawerContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  z-index: 50;
  right: ${({ open }) => (open ? '0' : '-300px')};
  height: 100vh;
  width: 300px;
  background-color: #202331;
  transition: right 0.3s ease-in-out;
  padding: 1rem 1.5rem;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box; 
`;

export const DrawerButton = styled.a`
  display: flex;
  width: 100%;
  padding: 18px 8px;
  border-radius: 8px;
  background-color: red;
  gap: 1rem;
  border: none;
  background-color: transparent;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  color: #f1f1f1;
  font-family: 'FiraCode-Regular';
  font-size: 1rem;

  &:hover {
    background-color: #ddd;
  }
`;