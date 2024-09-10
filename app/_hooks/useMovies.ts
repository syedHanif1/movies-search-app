import { useQuery } from "@tanstack/react-query";
import MovieService from "../_services/movieService";
import useMovieStore from "../_store/useMovieStore";
import { MovieDataResponse, MovieDetailResponse } from "../_types/Movie";

const defaultMovieResponse = { Search: [], totalResults: "", Response: "", Error: "" };

export const useMovies = (title: string, page: number = 1) => {
  const { movies, setMovies } = useMovieStore();

  return useQuery<MovieDataResponse, Error>({
    queryKey: ["movies", title, page, { pre: true }],
    queryFn: async () => {
      const response = await MovieService.getMovies(title, page);
      setMovies([...movies, ...response.Search]);
      return response;
    },
    enabled: !!title,
    staleTime: Infinity,
    placeholderData: (previousData) => (title ? previousData : defaultMovieResponse),
  });
};

export const useMovie = (movieId: string) => {
  const { cachedMovies, setCachedMovie } = useMovieStore();

  return useQuery<MovieDetailResponse, Error>({
    queryKey: ["movies", movieId],
    queryFn: async () => {
      const cachedData = cachedMovies[movieId];
      if (cachedData) {
        return cachedData;
      }
      const data = await MovieService.getMovieDetails(movieId);
      setCachedMovie(movieId, data);
      return data;
    },
    enabled: !!movieId,
    staleTime: Infinity,
  });
};
