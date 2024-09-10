import React, { useEffect, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import Modal from "../Modal";
import { useMovie } from "@/app/_hooks/useMovies";
import Loader from "../Loader";
import FallbackImage from "../../_assets/fallback.png";

const MovieDetails = ({ movieId, clearMovieId }: { movieId: string; clearMovieId: () => void }) => {
  const { data, isLoading } = useMovie(movieId);

  const [imageSrc, setImageSrc] = useState<string>(FallbackImage.src);

  useEffect(() => {
    if (data && data.Poster && data.Poster !== "N/A") setImageSrc(data.Poster.toString());
  }, [data]);

  return (
    <Modal open={true} onClose={clearMovieId}>
      {isLoading && <Loader />}
      {data && (
        <>
          <div style={{ position: "relative", height: 500, backgroundImage: `url(${imageSrc})`, inset: 0, backgroundPosition: "center top", borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundRepeat: "no-repeat", boxShadow: "10px 10px 20px rgba(0, 11, 13, 0.5)", backgroundSize: "100% 100%", marginBottom: 10 }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to right bottom , rgba(22, 22, 22, 0.7) 30%, rgba(22, 22, 22, 0) 100%)" }} />
          </div>
          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={1}>
              {[data.Year, data.Runtime, ...data.Genre.split(",").filter((e) => e != "N/A")].map((genre) => (
                <Chip label={genre} key={genre} sx={{ color: "white", borderRadius: 2 }} variant="outlined" />
              ))}
            </Stack>
            <Typography variant="body2" sx={{ color: "white", pt: 1 }}>
              Actors:{" "}
              {data.Actors.split(",").map((actor) => (
                <span style={{ color: "#1C8394" }} key={actor}>
                  {actor}
                </span>
              ))}
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
