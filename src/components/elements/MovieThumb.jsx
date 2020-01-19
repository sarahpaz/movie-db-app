import React from "react";
import { Link } from "@reach/router";

import { StyledMovieThumb } from "../styles/StyledMovieThumb";

const MovieThumb = ({ image, movieId, clickable, movieName }) => (
  <StyledMovieThumb>
    <Link to={`${movieId}`}>
      {clickable ? (
        <img className="clickable" src={image} alt={movieName} />
      ) : (
        <img src={image} alt={movieName} />
      )}
    </Link>
  </StyledMovieThumb>
);
export default MovieThumb;
