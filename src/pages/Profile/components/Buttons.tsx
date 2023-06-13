import { useState } from 'react';
import { BtnOpt } from '../../../styles/Profile';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineLockPerson } from 'react-icons/md';
import { AiOutlineHistory } from 'react-icons/ai';

export const ButtonComponent = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
  };

  return (
    <>
      <BtnOpt
        onClick={() => handleButtonClick(1)}
        className={activeButton === 1 ? 'active' : ''}
      >
        <BiUserCircle />
        Sua conta
      </BtnOpt>
      <BtnOpt
        onClick={() => handleButtonClick(2)}
        className={activeButton === 2 ? 'active' : ''}
      >
        <MdOutlineLockPerson />
        Login e Segurança
      </BtnOpt>
      <BtnOpt
        onClick={() => handleButtonClick(3)}
        className={activeButton === 3 ? 'active' : ''}
      >
        <AiOutlineHistory />
        Histórico de jogos
      </BtnOpt>
    </>
  );
};
