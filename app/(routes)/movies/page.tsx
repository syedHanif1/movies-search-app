"use client";
import React, { useEffect, useState } from "react";
import { useMovies } from "@/app/_hooks/useMovies";
import TextInput from "@/app/_components/Input";
import Alert from "@mui/material/Alert";
import useDebounce from "@/app/_hooks/useDebounce";
import { Typography } from "@mui/material";
import { Movie } from "@/app/_types/Movie";
import MovieList from "@/app/_components/movies/MovieList";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [page, setPage] = useState<number>(1); // State to track the current page
  const [hasMore, setHasMore] = useState<boolean>(true); // To manage if more data is available
  const [movies, setMovies] = useState<Movie[]>([]); // State to store combined movie data

  const { data, isFetching } = useMovies(debouncedSearchTerm, page);

  useEffect(() => {
    if (data?.Search) {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
    }
  }, [data]);

  useEffect(() => {
    if (data?.totalResults && movies.length >= parseInt(data.totalResults)) {
      setHasMore(false);
    }
  }, [movies.length]);

  const handleSearch = (e: any) => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setSearchTerm(e.target.value);
  };

  const loadMoreMovies = () => setPage((e) => e + 1);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
        Search for movie titles to display below
      </Typography>
      <TextInput value={searchTerm} onChange={handleSearch} label={"Search For Movies"} />
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
