import React, { useContext } from "react";
import { Layout } from "../containers";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RouteList } from "../routes";
import Loader from "../components/Global/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Api from "../api";
import { JobOfferApplyMiniDto } from "../api/types/jobOffer";
import Typography from "@mui/material/Typography";
import {
  ExperienceLevelText,
  JobTypeText,
  RemoteText,
  RoleText,
} from "../helpers/constants/JobOffer";
import Chip from "@mui/material/Chip";
import { UserContext } from "../helpers/UserStore";

import TimeAgo from "javascript-time-ago";
import { useGlobalModalContext } from "../components/Global/GlobalModal";
import { ApplicantContactInfoModal } from "../components/ApplicantContactInfoModal";

export const ViewJobOffer = () => {
  const [jobOffer, setJobOffer] = React.useState<JobOfferApplyMiniDto | null>(
    null
  );
  const { userId } = useContext(UserContext);
  const { showModal } = useGlobalModalContext();
  const { jobOfferId } = useParams<{ jobOfferId: string }>();
  const navigate = useNavigate();
  const timeAgo = new TimeAgo("en-US");

  React.useEffect(() => {
    if (jobOfferId) {
      try {
        Api.jobOffer
          .fetchOneJobOfferInfo(jobOfferId)
          .then((res) => setJobOffer(res.data));
      } catch {
        console.log("error");
      }
    } else {
      navigate(RouteList.HOME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobOfferId]);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div className="sidebar">
            <Link to={RouteList.ALL_JOB_OFFERS}>
              <Button
                component="label"
                role={undefined}
                variant="text"
                startIcon={<ArrowBackIcon />}
              >
                Back to the list
              </Button>
            </Link>

            {jobOffer && jobOfferId && !userId && (
              <Button
                variant="contained"
                onClick={() => {
                  showModal(
                    <ApplicantContactInfoModal
                      id={jobOfferId}
                      haveQuiz={
                        jobOffer.quizzes ? jobOffer.quizzes.length > 0 : false
                      }
                    />
                  );
                }}
              >
                Apply
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={9}>
          {jobOffer ? (
            <>
              <div className="d-flex align-items-center justify-content-between gap-2 mt-md-0 mt-4">
                <Typography variant="h5" color="primary">
                  {jobOffer.title}
                </Typography>
                <div>
                  <Typography variant="body1" color="secondary" noWrap>
                    {jobOffer?.applicantCount} applicants
                  </Typography>
                  {jobOffer?.updatedAt && (
                    <Typography variant="body1" color="secondary">
                      {timeAgo.format(new Date(jobOffer.updatedAt).getTime())}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="d-flex gap-2 flex-wrap mt-2">
                <Chip label={JobTypeText[jobOffer.jobType]} />
                <Chip label={RoleText[jobOffer.role]} />
                <Chip label={ExperienceLevelText[jobOffer.experienceLevel]} />
                <Chip
                  label={`${jobOffer.city}, ${jobOffer.country} (${
                    RemoteText[jobOffer.remote]
                  })`}
                />
              </div>
              <Typography
                variant="body1"
                color="primary"
                mt={3}
                style={{ whiteSpace: "pre-line" }}
              >
                {jobOffer.description}
              </Typography>

              <Typography variant="body1" color="primary" mt={3}>
                BENEFITS:
              </Typography>
              <ul>
                {jobOffer.benefits.map((benefit, i) => {
                  return <li key={i}>{benefit}</li>;
                })}
              </ul>

              <Typography variant="body1" color="primary" mt={3}>
                COMMITMENTS:
              </Typography>
              <ul>
                {jobOffer.commitments.map((commitment, i) => {
                  return <li key={i}>{commitment}</li>;
                })}
              </ul>

              <div>
                <Typography variant="body1" color="primary" mt={3}>
                  COMPANY DETAILS
                </Typography>
                <Typography variant="body1" color="secondary" mt={2}>
                  {jobOffer.user.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="secondary"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {jobOffer.user.about}
                </Typography>
                <Typography variant="body1" color="secondary">
                  Email:{" "}
                  <a href={`mailto:${jobOffer.user.email}`}>
                    {jobOffer.user.email}
                  </a>
                </Typography>
                <Typography variant="body1" color="secondary">
                  Phone number:{" "}
                  <a href={`tel:${jobOffer.user.phoneNumber}`}>
                    {jobOffer.user.phoneNumber}
                  </a>
                </Typography>
              </div>

              {/* TODO add application process time from user input */}
              {jobOffer.quizzes?.length ? (
                <div>
                  <Typography variant="body1" color="primary" mt={3}>
                    Application process:
                  </Typography>
                  <ul>
                    {jobOffer.openTypeCount ? (
                      <li>{jobOffer.openTypeCount} open questions</li>
                    ) : null}
                    {jobOffer.choiceTypeCount ? (
                      <li>{jobOffer.choiceTypeCount} choice questions</li>
                    ) : null}
                    {jobOffer.codeTypeCount ? (
                      <li>{jobOffer.codeTypeCount} code questions</li>
                    ) : null}
                    <li>{jobOffer.totalQuestionCount} total questions</li>
                  </ul>
                </div>
              ) : null}

              {jobOffer && jobOfferId && !userId && (
                <div className={"d-md-none w-100"}>
                  <Button
                    variant="contained"
                    className={"w-100"}
                    onClick={() => {
                      showModal(
                        <ApplicantContactInfoModal
                          id={jobOfferId}
                          haveQuiz={
                            jobOffer.quizzes
                              ? jobOffer.quizzes.length > 0
                              : false
                          }
                        />
                      );
                    }}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <Loader />
            </div>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};
