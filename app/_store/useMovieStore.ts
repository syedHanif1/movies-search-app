import { create } from "zustand";
import { Movie } from "../_types/Movie";

interface MovieStore {
  movies: Record<string, Movie>;
  setMovie: (imdbID: string, data: Movie) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  movies: {},
  setMovie: (imdbID, data) =>
    set((state) => ({
      movies: { ...state.movies, [imdbID]: data },
    })),
}));

export default useMovieStore;
