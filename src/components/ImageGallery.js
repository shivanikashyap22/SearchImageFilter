import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Styled from "./style";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/?client_id=iJjP7jKeBwVDVUIvMqjkktv7O3myjYrxFr9AjrceBLE&query=${searchQuery}`
        );
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          throw new Error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (searchQuery) {
      fetchImages();
    }
  }, [searchQuery]);

  return (
    <Styled.ImageWrapper>
      {Array.isArray(images) &&
        images.map((image) => (
          <Styled.ImageItem key={image.id}>
            <Styled.Image src={image.urls.regular} alt={image.alt_description} />
          </Styled.ImageItem>
        ))}
    </Styled.ImageWrapper>
  );
};

export default ImageGallery;
