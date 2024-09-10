import React, { useState, MouseEvent } from "react";
import { Card, CardHeader } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "../IconButton";
import FallbackImage from "../../_assets/fallback.png";
import { CardMedia, Typography } from "@mui/material";
import { Movie } from "../../_types/Movie";
import { useBookmarksStore } from "@/app/_store/useBookmarksStore";

const MovieCard = ({ movie, viewDetails }: { movie: Movie; viewDetails: (id: string) => void }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarksStore();
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.some((b) => b.imdbID === movie.imdbID));

  const [imageSrc, setImageSrc] = useState<string>(movie.Poster.toString());

  const handleImageError = () => setImageSrc(FallbackImage.src);

  const handleBookmarkToggle = (event: MouseEvent) => {
    event.stopPropagation();
    if (isBookmarked) {
      removeBookmark(movie.imdbID);
    } else {
      addBookmark(movie);
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card onClick={() => viewDetails(movie.imdbID)} className="movie-card">
      <CardMedia component="img" image={imageSrc} onError={handleImageError} className="movie-card-media" />
      <CardHeader
        title={
          <Typography variant="h6" component="div" className="movie-card-title">
            {movie.Title}
          </Typography>
        }
        action={<IconButton onClick={handleBookmarkToggle} IconComponent={isBookmarked ? BookmarkIcon : BookmarkBorderIcon} iconStyle={{ color: "green" }} />}
        className="movie-card-header"
      />
    </Card>
  );
};

export default React.memo(MovieCard);
