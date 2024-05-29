import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AppWrapper = styled.div`
  text-align: center;
  padding: 20px;
  .search{
    border:0.5px solid black;
    padding:50px 0px;
  }
  .heading{
    margin-bottom:20px;
  }
  .inputSearch{
    padding-top:20px;
  }
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
  .card-body {
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
  height: 280px;
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
  cursor: pointer;
  border-radius: 8px;
`;

const Bio=styled.div`
font-size:18px;
text-align:start;
`
const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=iJjP7jKeBwVDVUIvMqjkktv7O3myjYrxFr9AjrceBLE&query=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results.slice(0, 4));
      } else {
        throw new Error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppWrapper className="fluid-container">
      <h1 className="heading">Search Page</h1>
      <div className="search">
        <Bio className="container">
            <div><strong>Name:</strong> Shivani Kashyap</div>
            <div><strong>Email:</strong> shivani1999kashyap@gmail.com</div>
        </Bio>
        <div className="inputSearch">
      <SearchInput
        type="text"
        placeholder="Search images..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchButton onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </SearchButton>
      </div>
      <ThumbnailWrapper>
        {searchResults.map((result) => (
          <Thumbnail className="card" style={{ width: "18rem" }} key={result.id}>
            <div className="card-body">
              <ThumbnailImage src={result.urls.thumb} alt={result.alt_description} />
              <Link to={`/canvas?imageUrl=${encodeURIComponent(result.urls.regular)}`}>
                <AddCaptionButton>Add Captions</AddCaptionButton>
              </Link>
            </div>
          </Thumbnail>
        ))}
      </ThumbnailWrapper>
      </div>
    </AppWrapper>
  );
};

export default SearchPage;
