import React from "react";
import { Layout } from "../containers";
import LAPTOP from "../assets/images/laptop.jpg";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Profile = () => {
  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          main
        </Grid>
        <Grid item xs={12} md={6}>
          edit info
        </Grid>
      </Grid>
    </Layout>
  );
};
