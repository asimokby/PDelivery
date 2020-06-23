import React from "react";
import PropTypes from "prop-types";
// import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Reviews from "./Reviews";
import "../../profileCss/profileCss.css";
import AboutMe from "./AboutMe";
import RequestsTabs from "./RequestsTabs";
import MyTrips from './MyTrips';
import MyShipments from './MyShipments'


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // console.log(props);
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function DisabledTabs(props) {
  const [value, setValue] = React.useState(0);

  const [popUpToggleValue, setpopUpToggle] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const togglePopUp = () => {
    setpopUpToggle(!popUpToggleValue);
  };

  return (
    <div>
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
          centered
        >
          <Tab label="About me" />

          <Tab label="Trips" /> 
          <Tab label="Shipments" /> 
          {props.allowAccessAndEdit ? <Tab label="Requests" /> : <div />}

          <Tab label="Reviews" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <AboutMe userInfo={props.UserInfo} />
        </TabPanel>


        <TabPanel value={value} index={1}>
          <MyTrips session={props.session} trips={props.trips} midpoints={props.midpoints} unWantedCategories={props.unWantedCategories} />
        </TabPanel>


        <TabPanel value={value} index={2}>
          {console.log('items in horizontal', props.items)}
          <MyShipments session={props.session} shipments={props.shipments} items={props.items} itemsPics={props.itemsPics} />
        </TabPanel>

        {props.allowAccessAndEdit ? (
          <TabPanel value={value} index={3}>
            <RequestsTabs
              requests={props.requests}
              reqShipTrip={props.reqShipTrip}
              info={props.info}
            />
          </TabPanel>
        ) : (
            <div />
          )}

        <TabPanel value={value} index={4}>
          <Reviews reviews={props.reviews} />
        </TabPanel>
      </Paper>
    </div>
  );
}
