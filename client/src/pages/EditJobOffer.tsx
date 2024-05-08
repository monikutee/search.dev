import React, { useContext } from "react";
import { Layout } from "../containers";
import Grid from "@mui/material/Grid";
import { JobOffer } from "../components/JobOfferItemAuth";
import { RouteList } from "../routes";
import Button from "@mui/material/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../api";
import { UserContext } from "../helpers/UserStore";
import Loader from "../components/Global/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const EditJobOffer = () => {
  const [jobOffer, setJobOffer] = React.useState<any>(null);
  const { userId } = useContext(UserContext);
  const { jobOfferId } = useParams<{ jobOfferId: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (jobOfferId && userId) {
      Api.jobOffer
        .fetchOneJobOfferUsers(userId, jobOfferId)
        .then((res) => setJobOffer(res.data))
        .catch((e) => {
          console.error(e);
          navigate(RouteList.HOME);
        });
    } else {
      navigate(RouteList.HOME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobOfferId]);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Link to={RouteList.MY_JOB_OFFERS_LIST} className="sidebar">
            <Button
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              startIcon={<ArrowBackIcon />}
            >
              Back to the list
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={9}>
          {jobOffer ? (
            <JobOffer data={jobOffer} />
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
