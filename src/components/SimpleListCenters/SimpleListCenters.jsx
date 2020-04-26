import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const centersNames = [
  "ACHS Silicon Valley",
  "ACHS Hillvalley",
  "ACHS Abbey Road",
];

const CenterNamesList = (props) => {
  const { centersNames } = props;
  const listItems = centersNames.map((centerName) => (
    <ListItem button>
      <ListItemText primary={centerName} />
    </ListItem>
  ));
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {listItems}
    </List>
  );
};

const SimpleListCenters = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CenterNamesList centersNames={centersNames} />
    </div>
  );
};

export default SimpleListCenters;
