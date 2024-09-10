"use client";
import React, { useEffect, ChangeEvent } from "react";
import { Alert, Typography } from "@mui/material";
import { useMovies } from "@/app/_hooks/useMovies";
import TextInput from "@/app/_components/Input";
import useDebounce from "@/app/_hooks/useDebounce";
import MovieList from "@/app/_components/movies/MovieList";
import useMovieStore from "@/app/_store/useMovieStore";

const Movies = () => {
  const { movies, searchTerm, page, hasMore, setMovies, setPage, setHasMore, setSearchTerm } = useMovieStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching } = useMovies(debouncedSearchTerm, page);

  useEffect(() => {
    if (data?.totalResults && movies.length >= parseInt(data.totalResults)) {
      setHasMore(false);
    }
  }, [movies.length]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setSearchTerm(e.target.value);
  };

  const loadMoreMovies = () => setPage(page + 1);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Search for movie titles to display below
      </Typography>
      <TextInput value={searchTerm} onChange={handleSearch} label={"Search For Movies"} placeholder="What are you looking for?" />
      <MovieList movies={movies} isFetching={isFetching} loadMore={loadMoreMovies} hasMore={hasMore} />
      {data?.Error && (
        <Alert severity="error" sx={{ my: 5, fontSize: 16 }}>
          {data?.Error}
        </Alert>
      )}
    </React.Fragment>
  );
};

export default Movies;
