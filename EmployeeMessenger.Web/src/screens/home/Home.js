import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { getWorkspaces } from "../../api/getWorkspaces";

export const Home = () => {
  useEffect(() => {
    getWorkspaces().then((response) => console.log(response));
  }, []);
  return (
    <>
      <Typography style={{ color: "white" }}>Home Page</Typography>
    </>
  );
};
