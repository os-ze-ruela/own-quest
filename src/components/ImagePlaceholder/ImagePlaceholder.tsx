import React from 'react';
import styled from 'styled-components';
import ASTROQUESTING from "../../assets/img/imageplaceholder.svg";

const ImagePlaceholderContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #568EA3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, #000, rgba(0,0,0,0.0));
  padding: 20px 0px;
  `;

const Image = styled.img`
  display: flex;
  height: 100%;
  width: 30%;
`;


function ImagePlaceholder()  {
  return (
    <ImagePlaceholderContainer>
      <Image src={ASTROQUESTING} alt="Image Placeholder" /> 
    </ImagePlaceholderContainer>
  );
};

export default ImagePlaceholder;
