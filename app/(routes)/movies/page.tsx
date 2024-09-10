"use client";
import React, { useEffect, ChangeEvent } from "react";
import { Alert, Box, Typography, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMovies } from "@/app/_hooks/useMovies";
import TextInput from "@/app/_components/Input";
import useDebounce from "@/app/_hooks/useDebounce";
import MovieList from "@/app/_components/movies/MovieList";
import useMovieStore from "@/app/_store/useMovieStore";

const Movies = () => {
  const { movies, searchTerm, page, hasMore, error, setMovies, setPage, setHasMore, setSearchTerm, setError } = useMovieStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching } = useMovies(debouncedSearchTerm, page);

  useEffect(() => {
    if (data?.totalResults && movies.length >= parseInt(data.totalResults)) {
      setHasMore(false);
    }
  }, [movies.length, data?.totalResults]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setSearchTerm(e.target.value);
  };

  const loadMoreMovies = () => setPage(page + 1);

  return (
    <Box className={movies.length === 0 ? "centeredContainer" : "shrinkedContainer"}>
      <Typography variant="h6" gutterBottom className={movies.length === 0 ? "boldLabel" : ""}>
        What are you looking for?
      </Typography>
      <TextInput value={searchTerm} onChange={handleSearch} label={"Search For Movies"} placeholder="Title" icon={<SearchIcon />} />
      {movies.length > 0 && <MovieList movies={movies} isFetching={isFetching} loadMore={loadMoreMovies} hasMore={hasMore} />}
      {error && (
        <Alert severity="error" sx={{ my: 5, fontSize: 16 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Movies;
