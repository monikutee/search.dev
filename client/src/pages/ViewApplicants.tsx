import React, { useContext } from "react";
import { Layout } from "../containers";
import Grid from "@mui/material/Grid";
import { RouteList } from "../routes";
import Button from "@mui/material/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import Api from "../api";
import { UserContext } from "../helpers/UserStore";
import Loader from "../components/Global/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ApplicantAnswerDto, ApplicantFullI } from "../api/types/applicant";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { AnswerTypeEnum } from "../helpers/enums/JobOfferEnums";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import { JobOfferApplyMiniDto } from "../api/types/jobOffer";
import {
  RoleText,
  ExperienceLevelText,
  JobTypeText,
  RemoteText,
} from "../helpers/constants/JobOffer";
import TimeAgo from "javascript-time-ago";

export const ViewApplicants = () => {
  const [applicants, setApplicants] = React.useState<ApplicantFullI[]>([]);
  const [jobOffer, setJobOffer] = React.useState<JobOfferApplyMiniDto | null>(
    null
  );
  const { userId } = useContext(UserContext);
  const { jobOfferId } = useParams<{ jobOfferId: string }>();
  const navigate = useNavigate();
  const timeAgo = new TimeAgo("en-US");

  React.useEffect(() => {
    if (jobOfferId && userId) {
      try {
        Api.jobOffer.fetchApplicants(userId, jobOfferId).then((res) => {
          setApplicants(res.data.applicants);
          setJobOffer(res.data.jobOffer);
        });
      } catch {
        console.log("error");
      }
    } else {
      navigate(RouteList.HOME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobOfferId]);

  const QuestionWrapper: React.FC<{
    answer: ApplicantAnswerDto;
  }> = ({ answer }) => {
    switch (answer.question.questionType) {
      case AnswerTypeEnum.MULTI:
        return (
          <div>
            {answer.question.questionChoices?.length > 0 && (
              <div>
                Correct {answer.correctCount} <br />
                {answer.question.questionChoices.map((qChoice, ai) => (
                  <div key={ai}>
                    <Checkbox
                      disabled
                      checked={answer.questionChoices.some(
                        (aChoice) => aChoice.id === qChoice.id
                      )}
                    />
                    <b>{qChoice.choiceText}</b>
                    {qChoice.isCorrect ? (
                      <CheckIcon fontSize="small" color="success" />
                    ) : (
                      <ClearIcon fontSize="small" color="error" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case AnswerTypeEnum.CODE:
        return (
          <div className="d-flex flex-column gap-2">
            <TextField
              fullWidth
              disabled
              value={answer.answerText}
              multiline
              rows={5}
            />
            <TextField
              fullWidth
              disabled
              value={answer.codeOutput}
              multiline
              rows={5}
            />
          </div>
        );
      case AnswerTypeEnum.OPEN:
        return (
          <TextField
            fullWidth
            disabled
            value={answer.answerText}
            multiline
            rows={5}
          />
        );
      default:
        return <div>Unknown Question Type</div>;
    }
  };

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
              Back
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={9}>
          {jobOffer && (
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
              <div className="d-flex gap-2 flex-wrap mt-2 mb-5">
                <Chip label={JobTypeText[jobOffer.jobType]} />
                <Chip label={RoleText[jobOffer.role]} />
                <Chip label={ExperienceLevelText[jobOffer.experienceLevel]} />
                <Chip
                  label={`${jobOffer.city}, ${jobOffer.country} (${
                    RemoteText[jobOffer.remote]
                  })`}
                />
              </div>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={3} />
        <Grid item xs={12} md={9}>
          {applicants.length > 0 ? (
            <div className="mt-3 mt-md-0">
              {applicants.map((applicant, i) => (
                <div key={i} className="mb-3">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className="d-flex flex-column"
                    >
                      <Typography color="primary" variant="h6" marginRight={1}>
                        {applicant.name} {applicant.surname}
                      </Typography>
                      <div className="d-flex gap-2 flex-wrap">
                        {applicant.phoneNumber && (
                          <Chip
                            label={`Phone number: ${applicant.phoneNumber}`}
                          />
                        )}
                        {applicant.email && (
                          <Chip
                            label={
                              <div>
                                Email:{" "}
                                {
                                  <a
                                    href={`mailto:${applicant.email}`}
                                    onClick={(e: any) => e.stopPropagation()}
                                  >
                                    {applicant.email}
                                  </a>
                                }
                              </div>
                            }
                          />
                        )}
                        {applicant.city && applicant.country && (
                          <Chip
                            label={`${applicant.city}, ${applicant.country}`}
                          />
                        )}
                        {applicant.overallCorrectCount && (
                          <Chip
                            color={
                              Number(applicant.overallCorrectCount) > 0
                                ? "success"
                                : "warning"
                            }
                            label={`Result from choice questions: ${
                              Number(applicant.overallCorrectCount) * 100
                            } (%)`}
                          />
                        )}
                        {applicant.applyDate && (
                          <Chip
                            label={`Apply date: ${new Date(
                              applicant.applyDate
                            ).toLocaleString("lt", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              hour12: false,
                              minute: "2-digit",
                            })}`}
                          />
                        )}
                        {applicant.applied && (
                          <Chip
                            label={`Answered application details`}
                            color="primary"
                          />
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {applicant.about && (
                        <Typography
                          color="primary"
                          variant="body1"
                          marginBottom={3}
                        >
                          {applicant.about}
                        </Typography>
                      )}
                      {applicant.answers.length > 0 &&
                        applicant.answers.map((answer, i) => (
                          <div key={i}>
                            <hr />
                            <Typography
                              color="primary"
                              variant="body1"
                              marginBottom={1}
                            >
                              {answer.question.questionText}
                            </Typography>
                            <QuestionWrapper answer={answer} />
                          </div>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
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
