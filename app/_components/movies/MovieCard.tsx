import React, { useState, MouseEvent } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
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
    <Card onClick={() => viewDetails(movie.imdbID)} sx={{ height: "400px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "12px", boxShadow: 3, overflow: "hidden", cursor: "pointer" }}>
      <CardMedia component="img" image={imageSrc} onError={handleImageError} sx={{ width: "100%", height: "80%", objectFit: "cover" }} />
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ fontSize: "12px", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis" }}>
            {movie.Title}
          </Typography>
        }
        action={<IconButton onClick={handleBookmarkToggle} IconComponent={isBookmarked ? BookmarkIcon : BookmarkBorderIcon} iconStyle={{ color: "green" }} />}
        sx={{ padding: "16px", height: "20%" }}
      />
    </Card>
  );
};

export default React.memo(MovieCard);
