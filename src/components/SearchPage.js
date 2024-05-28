import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AppWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 300px;
  margin-right: 10px;
  
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
   border: none;
    background: black;
    color: white;
    font-weight: 500;
    font-size: 15px;
   
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
      margin-top: 30px;
  .card-body{
        display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Thumbnail = styled.div`
  margin: 10px;
`;

const ThumbnailImage = styled.img`
    width: 260px;
    height: 346px;
`;

const AddCaptionButton = styled.button`
  margin-top: 15px;
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

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=iJjP7jKeBwVDVUIvMqjkktv7O3myjYrxFr9AjrceBLE&query=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.slice(0, 4));
      } else {
        throw new Error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <AppWrapper>
      <h1>Image Search</h1>
      <SearchInput
        type="text"
        placeholder="Search images..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
      
      <ThumbnailWrapper>
        {searchResults.map((result) => (
            <Thumbnail className="card" style={{width:"18rem"}}  key={result.id}>
        <div className="card-body">
        <ThumbnailImage src={result.urls.thumb} alt={result.alt_description} />
          <Link to={`/canvas?imageUrl=${encodeURIComponent(result.urls.regular)}`}>
       <AddCaptionButton>Add Captions</AddCaptionButton>
         </Link>
        </div>
      </Thumbnail>
        ))}
      </ThumbnailWrapper>
  
    </AppWrapper>
  );
};

export default SearchPage;
