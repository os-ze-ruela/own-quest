import { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
`;

const PopupContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.3);
  border-radius: 10px;

`;
const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #3e4357;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  opacity: 0;
  animation: fadeIn 1.5s 0.8s ease-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const PopupButton = styled.button`
  margin-top: 10px;
  color:white;
  font-family: FiraCode-Light;
  background-color: #282C3E;
  border: 0;
  border-radius: 5px;
  width: 100px;
  height: 30px;
`;

const PopupCheckbox = styled.button`
  color:white;
  font-family: FiraCode-Light;
  background-color: transparent;
  outline: none;
  border: 0;
`;

const PopupMessage = styled.button`
    font-family: FiraCode-Light;
    border: 0;
    background-color: transparent;
    color: white;

`;

interface PopupProps {
    message: string;
  }

const Popup = ({ message }: PopupProps) => {
  const [hidePopup, setHidePopup] = useState(false);
  const [hidePermanently, setHidePermanently] = useState(false);

  const handleClosePopup = () => {
    if (hidePermanently) {
      localStorage.setItem("hidePopup", "true");
    }
    setHidePopup(true);
  };

  if (hidePopup || localStorage.getItem("hidePopup")) {
    return null;
  }

  return (
    <>
     {/* <Overlay onClick={handleClosePopup} /> */}
      <PopupContainer>
        <PopupContent>
          <PopupMessage>{message}</PopupMessage>
          <PopupCheckbox>
            <Checkbox
              type="checkbox"
              checked={hidePermanently}
              onChange={() => setHidePermanently(!hidePermanently)}
            />
            Não mostrar novamente
          </PopupCheckbox>
          <PopupButton onClick={handleClosePopup}>Entendi</PopupButton>
        </PopupContent>
      </PopupContainer>
    </>
  );
};
  
  export default Popup