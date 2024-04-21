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
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

export const Homepage = () => {
  const { showModal } = useGlobalModalContext();
  const { userId } = useContext(UserContext);

  const steps = [
    {
      title: "Job offers",
      description:
        "At the outset, applicants take the initiative to search for job opportunities that match their expertise and ambitions. ",
      icon: <ScreenSearchDesktopIcon className="step-icon" color="primary" />,
    },
    {
      title: "Async interview",
      description:
        "The second stage is the asynchronous interview, which is a modern approach to the traditional interview process. ",
      icon: <QuizIcon className="step-icon" color="primary" />,
    },
    {
      title: "Results",
      description:
        "In the final stage, the outcomes of the recruitment process are communicated to the candidates. ",
      icon: <AutoGraphIcon className="step-icon" color="primary" />,
    },
  ];

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
          <div className="h-100 d-flex align-items-center">
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
          <Typography color={"primary"} variant="h3">
            Process of recruitment
          </Typography>
          <Typography color={"primary"} variant="body1" mt={3}>
            Here you can see detailed process of recruitment process in our
            platform
          </Typography>
          <Grid container spacing={3} mt={3}>
            {steps.map((step, index) => (
              <Grid
                key={index}
                item
                sm={12}
                md={4}
                className="d-flex flex-column align-items-center"
              >
                {step.icon}
                <Typography color={"primary"} variant="h6" textAlign={"center"}>
                  {step.title}
                </Typography>
                <Typography
                  color={"primary"}
                  variant="body1"
                  textAlign={"justify"}
                >
                  {step.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};
