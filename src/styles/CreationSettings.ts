import styled from "styled-components";

type CategoryLabelProps = {
    color: string;
  };

export const Body = styled.div`
    height: 100%;
`

export const SettingsContainer = styled.div`
    height: 100%;
    width: 68%;
    flex-direction: column;
    padding-left: 2%;
    margin-bottom: 2rem;
`
export const Title = styled.h1`
    color: white;
    font-family: FiraCode-Bold;
    font-weight: 600;
    font-size: 30px;
`
export const Separator = styled.hr`
    border-bottom: 1px solid #ccc;
    opacity: 30%;
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
    height: 7%;
    border-radius: 0.7em;
    border: none;
    margin-bottom: 0.7em;
    padding-left: 12px;
    padding-bottom: 1.5em;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 16px;
    text-align: start;
    outline: none;
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
    height: 150px;
    border-radius: 0.7em;
    border: none;
    margin-bottom: 0.7em;
    padding-top: 12px;
    padding-left: 8px;
    padding-bottom: 1em;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 16px;
    resize: none;
    outline: none;  
    margin: 8px 0px;

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
    border-radius: 16px;
    overflow: hidden;
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
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const TitlesInfo = styled.p`
    color: white;
    font-family: FiraCode-light;
    font-weight: 400;
    font-size: 16px;
    padding-bottom: 0.7em;
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

export const CategorySettingsLabel = styled.span<CategoryLabelProps>`
  font-size: 14px;
  font-weight: 500;
  background: linear-gradient(to right, ${(props) => props.color}, ${(props) => props.color + 'AD'});
  color: #ffffff;
  padding: 4px 8px;
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