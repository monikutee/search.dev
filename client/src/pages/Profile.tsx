import React, { useContext } from "react";
import { Layout } from "../containers";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ProfileInfo } from "../components/ProfileInfo";
import { JobOffer } from "../components/JobOfferItem";
import useWindowSize, { smallerThanLg } from "../helpers/useWindowSize";
import { RouteList } from "../routes";
import { JobOfferList } from "../components/JobOfferList";
import { UserContext } from "../helpers/UserStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const Profile: React.FC<{ value?: number }> = ({ value = 0 }) => {
  const { width } = useWindowSize();
  const isMobile = smallerThanLg(width);
  const { user, userId } = useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userId) {
      navigate("/");
      toast.error("You do not have access to this page", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return null;
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Tabs
            value={value}
            orientation={"vertical"}
            sx={{
              borderRight: 1,
              borderColor: "divider",
              position: isMobile ? undefined : "fixed",
            }}
            className="profile_tabs"
          >
            <Link to={RouteList.PROFILE}>
              <Tab
                sx={{
                  width: "100%",
                }}
                label="Profile Info"
                {...a11yProps(0)}
              />
            </Link>
            <Link to={RouteList.MY_JOB_OFFERS_LIST}>
              <Tab
                sx={{
                  width: "100%",
                }}
                label="My job offers"
                {...a11yProps(1)}
              />
            </Link>
            <Link to={RouteList.CREATE_JOB_OFFER}>
              <Tab
                sx={{
                  width: "100%",
                }}
                label="Create new job offer"
                {...a11yProps(2)}
              />
            </Link>
          </Tabs>
        </Grid>
        <Grid item xs={12} md={9}>
          <TabPanel value={value} index={0}>
            <ProfileInfo user={user} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <JobOfferList />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <JobOffer />
          </TabPanel>
        </Grid>
      </Grid>
    </Layout>
  );
};
