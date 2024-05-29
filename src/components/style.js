import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
 
`;

export const Heading=styled.div`
   .heading{
    margin-bottom:20px;
    display:flex;
    justify-content:center;
  }
 
`

export const CanvasWrapper = styled.div`
    border:0.5px solid black;
    padding:50px 0px;
  
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  .canvass {
    flex: 1 1 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .wrapper {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .canvass, .wrapper {
      flex: 1 1 100%;
    }
  }
`;

export const ButtonWrapper = styled.div`
display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: black;
  color: white;
  font-weight: 500;
  font-size: 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s background ease;

  &:hover {
    background: darkgray;
  }
`;
