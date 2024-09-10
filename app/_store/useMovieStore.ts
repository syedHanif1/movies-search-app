import { create } from "zustand";
import { Movie } from "../_types/Movie";

interface MovieStore {
  cachedMovies: Record<string, Movie>;
  setCachedMovie: (imdbID: string, data: Movie) => void;

  movies: Movie[];
  setMovies: (movies: Movie[]) => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;

  page: number;
  setPage: (page: number) => void;

  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  cachedMovies: {},
  setCachedMovie: (imdbID, data) =>
    set((state) => ({
      cachedMovies: { ...state.cachedMovies, [imdbID]: data },
    })),

  movies: [],
  setMovies: (movies) => set({ movies }),

  searchTerm: "",
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),

  page: 1,
  setPage: (page) => set(() => ({ page })),

  hasMore: true,
  setHasMore: (hasMore) => set(() => ({ hasMore })),
}));

export default useMovieStore;
