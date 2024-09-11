import React, { useEffect, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { useMovie } from "@/app/_hooks/useMovies";
import FallbackImage from "@/app/_assets/fallback.png";
import Modal from "../Modal";
import Loader from "../Loader";

const MovieDetails = ({ movieId, clearMovieId }: { movieId: string; clearMovieId: () => void }) => {
  const { data, isLoading } = useMovie(movieId);

  const [imageSrc, setImageSrc] = useState<string>(FallbackImage.src);

  useEffect(() => {
    if (data && data.Poster && data.Poster !== "N/A") setImageSrc(data.Poster.toString());
  }, [data]);

  // can show more detials using object dot notation (intellisense)
  return (
    <Modal open={true} onClose={clearMovieId}>
      {isLoading && (
        <Box sx={{ display: "flex", height: "55vh", alignItems: "center", justifyContent: "center" }}>
          <Loader />
        </Box>
      )}
      {data && (
        <>
          <div className="movie-header" style={{ backgroundImage: `url(${imageSrc})` }}>
            <div className="movie-header-overlay" />
          </div>
          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {[data.Year, data.Runtime, ...data.Genre.split(",").filter((e) => e !== "N/A")].map((genre) => (
                <Chip label={genre} key={genre} sx={{ color: "white", borderRadius: 2 }} variant="outlined" />
              ))}
            </Stack>
            <Typography variant="body2" sx={{ color: "white", pt: 1 }}>
              Actors: <span className="actor-name">{data.Actors}</span>
            </Typography>
            <Typography variant="body2" sx={{ color: "white", pt: 1 }}>
              Plot: {data.Plot}
            </Typography>
          </Box>
        </>
      )}
    </Modal>
  );
};

export default React.memo(MovieDetails);
