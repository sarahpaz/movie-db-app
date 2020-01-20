import React from "react";
import PropTypes from "prop-types";

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

MovieThumb.propTypes = {
  img: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
  movieName: PropTypes.string
};

export default MovieThumb;
