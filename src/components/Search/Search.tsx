import React, { useState } from "react";
import { Box, TextField, Paper, Button, Container } from "@material-ui/core";
import SearchBox from "../search-box/SearchBox";
import ResultList from "../result-list/ResultList";

export default (props: any) => {
  var [filterValue, setFilterValue] = useState("");

  const results = [
    {
      id: "1",
      name: "test"
    },
    {
      id: "2",
      name: "test2"
    },
    {
      id: "3",
      name: "lego"
    },
    {
      id: "4",
      name: "utp kabels"
    }
  ];

  const onSearch = (value: any) => {
    console.log(value);
    setFilterValue(value.toLowerCase());
  };

  return (
    <>
      <SearchBox onSearch={onSearch}></SearchBox>
      <Box>
        <ResultList
          blabla={results.filter(x =>
            x.name.toLowerCase().includes(filterValue)
          )}
        ></ResultList>
      </Box>
    </>
  );
};
