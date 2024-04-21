import React from "react";
import Api from "../api";
import { JobOfferApplyMiniDto } from "../api/types/jobOffer";
import { Layout } from "../containers";
import Loader from "../components/Global/Loader";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {
  ExperienceLevelText,
  JobTypeText,
  RemoteText,
} from "../helpers/constants/JobOffer";
import { RouteList } from "../routes";
import { generatePath, Link } from "react-router-dom";

export const AllJobOffers = () => {
  const [list, setList] = React.useState<JobOfferApplyMiniDto[] | null>(null);

  React.useEffect(() => {
    try {
      Api.jobOffer.fetchAllJobOffers().then((res) => setList(res.data));
    } catch {
      console.log("error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {list ? (
        <>
          {list.map((item, index) => (
            <div key={index}>
              <div className="job-offer-apply">
                <Link
                  to={generatePath(RouteList.VIEW_JOB_OFFER, {
                    jobOfferId: item.id,
                  })}
                >
                  <Typography variant="h6" color="primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    {item.user.name}
                  </Typography>
                  <div className="d-flex gap-2 flex-wrap mt-2">
                    <Chip label={JobTypeText[item.jobType]} />
                    <Chip label={ExperienceLevelText[item.experienceLevel]} />
                    <Chip
                      label={`${item.city}, ${item.country} (${
                        RemoteText[item.remote]
                      })`}
                    />
                  </div>
                </Link>
              </div>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      )}
    </Layout>
  );
};
