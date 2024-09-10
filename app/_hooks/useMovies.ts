import { useQuery } from "@tanstack/react-query";
import MovieService from "../_services/movieService";
import useMovieStore from "../_store/useMovieStore";
import { MovieDataResponse, MovieDetailResponse } from "../_types/Movie";

const defaultMovieResponse = { Search: [], totalResults: "", Response: "", Error: "" };

export const useMovies = (title: string, page: number = 1) => {
  return useQuery<MovieDataResponse, Error>({
    queryKey: ["movies", title, page, { pre: true }],
    queryFn: () => MovieService.getMovies(title, page),
    enabled: !!title,
    staleTime: Infinity,
    placeholderData: (previousData) => (title ? previousData : defaultMovieResponse),
  });
};

export const useMovie = (movieId: string) => {
  const { movies, setMovie } = useMovieStore();

  return useQuery<MovieDetailResponse, Error>({
    queryKey: ["movies", movieId],
    queryFn: async () => {
      const cachedData = movies[movieId];
      if (cachedData) {
        return cachedData;
      }
      const data = await MovieService.getMovieDetails(movieId);
      setMovie(movieId, data);
      return data;
    },
    enabled: !!movieId,
    staleTime: Infinity,
  });
};
