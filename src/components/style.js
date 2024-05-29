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
    position:relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    .canvass {
    flex:0.5;

    
    }
    .download{
        position:absolute;
        margin-left:30px;
        bottom:0;
    }

    .wrapper {
    
        flex:0.5;
            border-left: 0.5px solid black;
        height: 100%;
        width:100%;
        text-align:center;

    }

    @media (max-width: 768px) {
        flex-direction: column;

        .canvass, .wrapper {
        flex: 1 1 100%;
        }
    }
    `;

    export const ButtonWrapper = styled.div`
    position:absolute;
    top:5%;

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



    export const AppWrapper = styled.div`
    text-align: center;
    padding: 20px;
    `;

    export const SearchWrapper = styled.div`
    border: 0.5px solid black;
    padding: 20px;
    `;

    export const TopHeading = styled.h1`
    margin-bottom: 20px;
    `;

    export const InputSearch = styled.input`
    padding: 10px;
    font-size: 16px;
    width: 300px;
    margin-right: 10px;
    `;

    export const SearchButton = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background: black;
    color: white;
    font-weight: 500;
    font-size: 15px;
    `;

    export const ThumbnailWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
    `;

    export const Thumbnail = styled.div`
    margin: 10px;
    width: 18rem;
    `;

    export const ThumbnailImage = styled.img`
    width: 260px;
    height: 280px;
    `;

    export const AddCaptionButton = styled.button`
    margin-top: 15px;
    border: none;
    background: black;
    color: white;
    font-weight: 500;
    font-size: 15px;
    padding: 10px 20px;
    transition: 0.3s color ease-out;
    cursor: pointer;
    border-radius: 8px;
    `;

    export const Bio = styled.div`
    font-size: 18px;
    text-align: start;
    `;