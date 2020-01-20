import { useState, useEffect } from "react";
import { POPULAR_BASE_URL } from "../../config";

export const useHomeFetch = searchTerm => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async endpoint => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search("page");

    try {
      // first await the fetch, then when we have the data await when parsing to json
      const result = await (await fetch(endpoint)).json();
      setState(prev => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...result.results]
            : [...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  // Fetch popular movies initially on mount
  useEffect(() => {
    if (sessionStorage.homeState) {
      console.log("Grabbing from sessionStorage");
      setState(JSON.parse(sessionStorage.homeState));
      setLoading(false);
    } else {
      console.log("Grabbing from API");
      fetchMovies(POPULAR_BASE_URL);
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return [{ state, loading, error }, fetchMovies];
};
