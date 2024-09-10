import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const MovieCardSkeletonLoader = () => {
  return (
    <React.Fragment>
      <Skeleton variant="rectangular" height={350} sx={{ backgroundColor: "white", borderRadius: "12px" }} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="20%" sx={{ backgroundColor: "white" }} />
        <Skeleton width="60%" sx={{ backgroundColor: "white" }} />
      </Box>
    </React.Fragment>
  );
};

export default MovieCardSkeletonLoader;
