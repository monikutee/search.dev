import React from "react";
import { Layout } from "../containers";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RouteList } from "../routes";
import Loader from "../components/Global/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Api from "../api";
import { JobOfferApplyMiniDto } from "../api/types/jobOffer";

export const ViewJobOffer = () => {
  const [jobOffer, setJobOffer] = React.useState<JobOfferApplyMiniDto | null>(
    null
  );
  const { jobOfferId } = useParams<{ jobOfferId: string }>();
  const navigate = useNavigate();

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
      <Grid container>
        <Grid item xs={12} md={3}>
          <Link to={RouteList.ALL_JOB_OFFERS}>
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
            <div>{jobOffer.title}</div>
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
