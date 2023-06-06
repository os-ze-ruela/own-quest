import React, { useContext } from 'react';
import { AiOutlineAim, AiOutlineCloseCircle, AiOutlineCompass, AiOutlineUser } from 'react-icons/ai';
import { UserContext } from '../../contexts/user';
import { EXPLORER, MYGAMES, PROFILE } from '../../core/app-urls';
import { CloseButton, DrawerButton, DrawerContainer } from '../../styles/components/Drawer';

const Drawer: React.FC = () => {
  const { open, setOpen } = useContext(UserContext);

  return (
    <DrawerContainer open={open}>
      <CloseButton onClick={() => setOpen(false)}>
        <AiOutlineCloseCircle size={30} />
      </CloseButton>
      <DrawerButton href={EXPLORER}>
        <AiOutlineCompass size={20} />
        Explorar
      </DrawerButton>
      <DrawerButton href={MYGAMES}>
        <AiOutlineAim size={20} />
        Meus Jogos
      </DrawerButton>
      <DrawerButton href={PROFILE}>
        <AiOutlineUser size={20} />
        Meu Perfil
      </DrawerButton>
    </DrawerContainer>
  );
};

export default Drawer;
