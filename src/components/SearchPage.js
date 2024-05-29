import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as Styled from "./style";


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=iJjP7jKeBwVDVUIvMqjkktv7O3myjYrxFr9AjrceBLE&query=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.AppWrapper className="fluid-container">
      <Styled.TopHeading>Search Page</Styled.TopHeading>
      <Styled.SearchWrapper className="search">
        <Styled.Bio className="container">
          <div>
            <strong>Name:</strong> Shivani Kashyap
          </div>
          <div>
            <strong>Email:</strong> shivani1999kashyap@gmail.com
          </div>
        </Styled.Bio>
        <div className="inputSearch">
          <Styled.InputSearch
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Styled.SearchButton onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Styled.SearchButton>
        </div>
        {error && <div>Error: {error}</div>}
        <Styled.ThumbnailWrapper>
          {searchResults.map((result) => (
            <Styled.Thumbnail className="card" style={{ width: "18rem" }} key={result.id}>
              <div className="card-body">
                <Styled.ThumbnailImage src={result.urls.thumb} alt={result.alt_description} />
                <Link to={`/canvas?imageUrl=${encodeURIComponent(result.urls.regular)}`}>
                  <Styled.AddCaptionButton>Add Captions</Styled.AddCaptionButton>
                </Link>
              </div>
            </Styled.Thumbnail>
          ))}
        </Styled.ThumbnailWrapper>
      </Styled.SearchWrapper>
    </Styled.AppWrapper>
  );
};

export default SearchPage;
