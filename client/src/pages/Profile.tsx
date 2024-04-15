import React from "react";
import { Layout } from "../containers";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ProfileInfo } from "../components/ProfileInfo";
import Typography from "@mui/material/Typography";

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

export const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Tabs
            value={value}
            orientation={"vertical"}
            onChange={handleChange}
            sx={{
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <Tab label="Profile Info" {...a11yProps(0)} />
            <Tab label="My job offers" {...a11yProps(1)} />
            <Tab label="Create new job offer" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={9}>
          <TabPanel value={value} index={0}>
            <ProfileInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Active job offers
          </TabPanel>
          <TabPanel value={value} index={2}>
            New job offer
          </TabPanel>
        </Grid>
      </Grid>
    </Layout>
  );
};
