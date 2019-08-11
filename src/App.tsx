import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import SearchBox from "./components/search-box/SearchBox";
import { Paper, AppBar, Box } from "@material-ui/core";
import ResultList, {
  IResultListProps,
  IResult
} from "./components/result-list/ResultList";
import Search from "./components/Search/Search";

const App: React.FC = () => {
  return (
    <>
      <AppBar position="static">TEST</AppBar>
      <Search></Search>
    </>
  );
};

export default App;
