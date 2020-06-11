import React from "react";
import Helmet from "react-helmet";

export const Title = (props: { title; children }) => {
  var defaultTitle = "⚛️ app";
  return (
    <>
      <Helmet>
        <title>{props.title ? props.title : defaultTitle}</title>
      </Helmet>
      {props.children}
    </>
  );
};
