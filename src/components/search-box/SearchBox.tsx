import React from "react";
import { Box } from "@material-ui/core";

export default (props: any) => {
  return (
    <Box>
      <input
        type="text"
        onChange={event => props.onSearch(event.target.value)}
      ></input>
    </Box>
  );
};
