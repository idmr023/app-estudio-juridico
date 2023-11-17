import React from "react";
import { Box, Typography } from "@mui/material";

const Complete = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">!Gracias por tu registro¡</Typography>
      <Img className="w-16" src="/complete.png" />
    </Box>
  );
};

export default Complete;
