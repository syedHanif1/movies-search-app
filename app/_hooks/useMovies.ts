import { useQuery } from "@tanstack/react-query";
import MovieService from "../_services/movieService";
import useMovieStore from "../_store/useMovieStore";
import { MovieDataResponse, MovieDetailResponse } from "../_types/Movie";

const defaultMovieResponse = { Search: [], totalResults: "", Response: "", Error: "" };

export const useMovies = (title: string, page: number = 1) => {
  const { movies, setMovies, setError } = useMovieStore();
  return useQuery<MovieDataResponse, Error>({
    queryKey: ["movies", title, page],
    queryFn: async () => {
      console.log("title", title);
      if (!title) {
        setMovies([]);
        return defaultMovieResponse;
      }

      try {
        const response = await MovieService.getMovies(title, page);
        if (response.Error) {
          throw new Error(response.Error);
        }
        if (response.Search.length) {
          setMovies([...movies, ...response.Search]);
        }
        setError(undefined);
        return response;
      } catch (error: any) {
        console.log("ex: ", error);
        setError(error.message || "An unknown error occurred");
        throw error;
      }
    },
    enabled: !!title,
    staleTime: 0,
    placeholderData: defaultMovieResponse,
  });
};

export const useMovie = (movieId: string) => {
  const { cachedMovies, setCachedMovie } = useMovieStore();

  return useQuery<MovieDetailResponse, Error>({
    queryKey: ["movie", movieId],
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
