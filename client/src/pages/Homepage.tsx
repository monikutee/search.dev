import React, { useContext } from "react";
import { Layout } from "../containers";
import { useGlobalModalContext } from "../components/Global/GlobalModal";
import { UserContext } from "../helpers/UserStore";
import { LoginSignUpModal } from "../components/LoginSignup";
import { Link } from "react-router-dom";

import LAPTOP from "../assets/images/laptop.jpg";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { RouteList } from "../routes";

export const Homepage = () => {
  const { showModal } = useGlobalModalContext();
  const { userId } = useContext(UserContext);

  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography color={"primary"} variant="h3">
            Hey you
          </Typography>
          <Typography color={"primary"} variant="body1" mt={2}>
            Are you tired of sifting through countless resumes and conducting
            endless interviews to find the perfect IT professionals for your
            company? Look no further! dev.tech is here to revolutionize your
            hiring process.
          </Typography>
          <Typography color={"primary"} variant="body1" mt={2}>
            We understand that finding top-tier IT talent can be a daunting
            task, which is why we've designed a unique and innovative platform
            that combines the power of quizzes and programming challenges to
            help you identify the best candidates quickly and efficiently.
          </Typography>
          <div className="mt-3 d-flex gap-3 flex-wrap">
            {userId ? (
              <Link to={RouteList.CREATE_JOB_OFFER}>
                <Button variant="contained">Create job offer</Button>
              </Link>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  showModal(<LoginSignUpModal />);
                }}
              >
                Create job offer
              </Button>
            )}
            <Link to={RouteList.ALL_JOB_OFFERS}>
              <Button variant="outlined">View job offers</Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <img className="mw-100" src={LAPTOP} alt="laptop" />
          </div>
        </Grid>
      </Grid>
      <Grid container mt={10}>
        <Grid
          item
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Typography color={"primary"} variant="h2">
            Process of recruitment
          </Typography>
          <Typography color={"primary"} variant="body1" mt={3}>
            Here you can see detailed process of recruitment process in our
            platform
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};
