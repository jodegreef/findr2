import React from "react";

export interface IResult {
  id: string;
  name: string;
}

export interface IResultListProps {
  blabla: IResult[];
}

export default (props: IResultListProps) => {
  return (
    <ul>
      {props.blabla.map(x => (
        <li>{x.name}</li>
      ))}
    </ul>
  );
};
