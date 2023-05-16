import React, { useContext } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { UserContext } from '../../contexts/user';
import { EXPLORER, MYGAMES, PROFILE } from '../../core/app-urls';
import { CloseButton, DrawerButton, DrawerContainer } from '../../styles/components/Drawer';


const Drawer: React.FC = () => {
    const {open, setOpen} = useContext(UserContext);

    return (
        // <BackdropDrawer  >
        <DrawerContainer open={open}>
            <CloseButton onClick={() => setOpen(false)} >
                <AiOutlineCloseCircle size={30} />
            </CloseButton>
            <DrawerButton href={EXPLORER}>Explorer</DrawerButton>
            <DrawerButton href={MYGAMES}>My Games</DrawerButton>
            <DrawerButton href={PROFILE}>Profile</DrawerButton>
        </DrawerContainer>
        // </BackdropDrawer>
    );
};

export default Drawer;
