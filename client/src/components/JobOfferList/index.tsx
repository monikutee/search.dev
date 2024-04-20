import React, { useContext } from "react";
import Api from "../../api";
import { UserContext } from "../../helpers/UserStore";
import Loader from "../Global/Loader";
import Typography from "@mui/material/Typography";
import { StyledJobOfferItem } from "./styled";
import Chip from "@mui/material/Chip";
import {
  ExperienceLevelText,
  JobTypeText,
  RemoteText,
} from "../../helpers/constants/JobOffer";
import Button from "@mui/material/Button";
import { RouteList } from "../../routes";
import { generatePath, Link } from "react-router-dom";

export const JobOfferList = () => {
  const [list, setList] = React.useState<any>(null);
  const { userId } = useContext(UserContext);

  React.useEffect(() => {
    if (userId)
      try {
        Api.jobOffer
          .fetchAllUsersJobOffers(userId)
          .then((res) => setList(res.data));
      } catch {
        console.log("error");
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return list ? (
    <div className="d-flex flex-column gap-3">
      {list.length === 0 && (
        <Typography variant="body1" color="primary" align="center">
          You don't have any job offers
        </Typography>
      )}
      {list.map((item: any, index: number) => (
        <StyledJobOfferItem key={index}>
          <div className="d-flex justify-content-between gap-2">
            <Typography variant="h5" color="primary">
              {item.title}
            </Typography>
            <Typography variant="body1" color="primary" align="right">
              {new Date(item.updatedAt).toLocaleString("lt", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                hour12: false,
                minute: "2-digit",
              })}
            </Typography>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <Chip label={JobTypeText[item.jobType]} />
            <Chip label={RemoteText[item.remote]} />
            <Chip label={ExperienceLevelText[item.experienceLevel]} />
            <Chip label={`${item.city}, ${item.country}`} />
          </div>
          <Typography
            variant="body1"
            color="primary"
            style={{ whiteSpace: "pre-line" }}
          >
            {item.description}
          </Typography>
          <div className="d-flex justify-content-end">
            <Link
              to={generatePath(RouteList.EDIT_JOB_OFFER, {
                jobOfferId: item.id,
              })}
            >
              <Button variant="contained">Edit</Button>
            </Link>
          </div>
        </StyledJobOfferItem>
      ))}
    </div>
  ) : (
    <div className="d-flex align-items-center justify-content-center">
      <Loader />
    </div>
  );
};
