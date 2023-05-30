import styled from "styled-components";

type CategoryLabelProps = {
    color: string;
};

export const AstronautLoading = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 50px;
`;

export const BackdropWrapper = styled.div`
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
`;



export const Body = styled.main`
    position: relative;
    height: 100vh;`

export const ImageContainer = styled.div`
    height: auto;
    width: 35%;
    flex-direction: column;
    margin-top: 24px;
    margin-left: 2rem;
    margin-bottom: 24px;
    max-width: 500px;
    
    @media (max-width: 1200px) {
        max-width: 350px;
        -moz-box-sizing: border-box; 
        -webkit-box-sizing: border-box; 
        box-sizing: border-box;
        margin: 0px;
        margin-top: 24px;
        padding: 0px 8px;
    }
`

export const SettingsContainer = styled.div`
    height: 100%;
    width: 60%;
    flex-direction: column;
    padding-left: 2%;
    margin-bottom: 2rem;

    @media (max-width: 1200px) {
        -moz-box-sizing: border-box; 
        -webkit-box-sizing: border-box; 
        box-sizing: border-box;
      padding: 0px 8px;
    }
`

export const SettingsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow: hidden;

    @media (max-width: 1200px) {
        ${ImageContainer} {
            width: 100%;
            order: 1;
        }
        ${SettingsContainer} {
            width: 100%;
            order: 2;
        }
    }
`

export const Title = styled.h1`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 30px;
    margin: 0px;
    margin-top: 1rem;
    margin-left: 24px;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-top: 12px;
        margin-left: 12px;
        margin-right: 12px;
    }
`
export const Separator = styled.hr`
    border-bottom: 1px solid #ccc;
    opacity: 30%;
`
export const LoadingText = styled.span`
    color: white;
    font-family: FiraCode-light;
    font-size: 18px;
`
export const Titles = styled.p`
    color: white;
    font-family: FiraCode-light;
    font-weight: 600;
    font-size: 18px;
`
export const TitleInput = styled.input`
    background-color: #30354B;
    color: white;
    width: 100%;
    height: 70px;
    border-radius: 0.7em;
    border: none;
    margin-bottom: 0.7em;
    padding-right: 12px;
    padding-left: 12px;
    padding-bottom: 1em;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 16px;
    text-align: start;
    outline: none;

    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;

    ::placeholder{
        color: white;
    }
`
export const DescriptionInput = styled.textarea`
    background-color: #30354B;
    text-align: justify;
    white-space: pre-line;
    color: white;
    width: 100%; 
    height: 200px;
    border-radius: 0.7em;
    border: none;
    margin-bottom: 0.7em;
    padding-top: 12px;
    padding-left: 8px;
    padding-bottom: 1em;
    padding-right: 12px;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 15px;
    resize: none;
    outline: none;  
    margin: 8px 0px;
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
    box-sizing: border-box;
    font-family: 'FiraCode-Light';

    ::placeholder{
        color: white;
    }
    
    
`

export const CategoryLabelEditingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    opacity: 1;
    transition: all 0.2s ease-in-out;
    /* border-radius: 16px; */
    overflow: hidden;
    width: 100%;
    flex-wrap: wrap;
    column-gap: 8px;
    &:hover {
        transform: scale(1.01);
    }

`

export const ListCategories = styled.div`
    flex-direction: row;
    display: inline-block;
    margin-right: 15px;
`

export const GptIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const RandomDescriptionWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

export const RandomDescriptionButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: left;
    align-items: center;
    padding: 5px 1rem;
    margin-bottom: 0.5em;
    gap: 2rem;
    border-style: none;
    cursor: pointer;

    width: 100%;
    max-width: 300px;
    height: 35px;

    background: #75CD73;
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;

    color: #FFFFFF;
    font-size: 10pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   
    &:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
`


export const CategoriesLabel = styled.span<CategoryLabelProps>`
   font-size: 10px;
    font-weight: 500;
    /* background-color: ${(props) => props.color}; */
    background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color + 'AD'});
    color: #ffffff;
    padding: 4px 8px;
`
export const AddButton = styled.button`
  border: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  background-color: #30354B;
  /* background: linear-gradient(to right, #ff00ff, #00ffff); */
  color: #ffffff;
  padding: 4px 14px;
  cursor: pointer;
`
export const WrapTextButton = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const TitlesInfo = styled.p`
    color: white;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 16px;
    padding-bottom: 0.7em;
    width: 60%;

    @media (max-width: 768px) {
        width: 100%;
    }
`
export const DeleteButton = styled.a`
    background-color: #E03140;
    width: 10%;
    height: 20%;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    align-content: center;
    align-self: center;
    font-family: FiraCode-Regular;
    font-weight: 400;
    font-size: 14px;
    padding: 0.5em;

    @media (max-width: 768px) {
        width: 100%;
    }
`
export const SaveButton = styled.button`
    background-color: #568EA3;
    width: 10%;
    height: 5%;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    align-self: center;
    font-family: FiraCode-Regular;
    font-weight: 400;
    font-size: 14px;
    padding: 0.5em;
    margin-bottom: 2rem;
`
export const CategorySettingsLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const CategorySettingsLabel = styled.button.attrs((props: {content: string, color: string}) => props)`
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color + 'AD'});
  color: #ffffff;
  padding: 4px 8px;
  outline: 0;
  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover::after {
        content: " ${(props) => props.content}"
    }

  @media (max-width: 767px) { /* Adicione a media query para telas menores, como dispositivos móveis */
    &:after {
    content: "${(props) => props.content}"; /* Exibe o conteúdo fixo em vez do hover */
    padding: 2px 6px;
    }
    }
`;


export const ImageUploaderContainer = styled.div`
    display: flex;
    flex-direction: column;

    input {
        text-decoration: none;
        border-style: none;
        font-size: 12px;
        border-radius: 5px;
        background-color: #568EA3;
    }
  `;

export const ImagePreview = styled.img`
    max-width: 300px;
    max-height: 300px;
    margin-top: 1rem;
`;


export const ActionsImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 1.5rem;
    margin-bottom: 1rem;

    
    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 8px;
    }
`
export const FileInput = styled.input`
    display: none;
`;

export const UploadImageButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    gap: 2rem;
    border-style: none;
    cursor: pointer;
    height: 35px;

    background-color: #568EA3;
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;

    color: #FFFFFF;
    font-size: 10pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   
    &:hover {
        cursor: pointer;
    }
 
    @media (max-width: 768px) {
        width: 100%;
        font-size: 12px;
    }
`

export const GenerateRandomImageButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-items: center;
    gap: 2rem;
    border-style: none;
    height: 35px;
    width: 65%;

    border: 1px solid #66AB4E;
    color: #66AB4E;
    background-color: transparent;
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;

    color: #FFFFFF;
    font-size: 10pt;
    transition: all 0.3s ease-in-out 0.2s;
    font-family: FiraCode-Regular;
    font-weight: 300;
    text-decoration: none;
   
    &:hover {
        transform: scale(1.01);
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 100%;
        font-size: 12px;
    }
`
export const ImagePlaceholder = styled.div`
    height: 320px;
    width: 100%;
    background-color: #D9D9D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-family: 'FiraCode-Regular';
    gap: 1rem;

`

export const ImageGameContainer = styled.img`
    height: auto;
    width: 100%;
    border-radius: 8px;

    @media (max-width: 1200px) {
        max-width: 350px;
    }
`;

export const ErrorSnackBar = styled.div`
    position: fixed;
    bottom: 10px;
    left: 20px;
`