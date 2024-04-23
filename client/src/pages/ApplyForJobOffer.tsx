import React from "react";
import { Layout } from "../containers";
import { useParams, useNavigate } from "react-router-dom";
// import Api from "../api";
import { RouteList } from "../routes";

export const ApplyForJobOffer = () => {
  // const [jobOffer, setJobOffer] = React.useState<any | null>(null);
  const { jobOfferId } = useParams<{ jobOfferId: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (jobOfferId) {
      try {
        // Api.jobOffer
        //   .fetchOneJobOfferApply(jobOfferId)
        //   .then((res) => setJobOffer(res.data));
      } catch {
        console.log("error");
      }
    } else {
      navigate(RouteList.HOME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobOfferId]);

  return <Layout>apply</Layout>;
};
