import styled from "styled-components";
export const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ImageItem = styled.div`
  margin: 10px;
`;

export const Image = styled.img`
  max-width: 300px;
  max-height: 300px;
`;


export const CanvasWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
 border: none;
    background: black;
    color: white;
    font-weight: 500;
    font-size: 15px;
    padding: 10px 20px;
    transition: 0.3s color ease-out;
    cursor:pointer;
    border-radius:8px;
`;