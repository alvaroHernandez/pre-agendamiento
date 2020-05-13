import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { httpClient } from "../../clients/httpClient";

const API_URL = `${process.env.REACT_APP_API_MANAGEMENT_URL}/healthcarefacilities`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [healthFacilities, setHealthFacilities] = useState([]);

  useEffect(() => {
    httpClient(
      API_URL,
      "GET",
      (json) => {
        setHealthFacilities(json);
      },
      (error) => {
        console.log(error);
        setHealthFacilities([]);
      }
    );
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        { healthFacilities.map( (healthFacility, i) =>
          <ListItem
            key={i}
            button
            selected={selectedIndex === i}
            onClick={(event) => handleListItemClick(event, i)}
          >
            <ListItemText primary= {healthFacility.name} />
        </ListItem>
        )
      }
      </List>
    </div>
  );
}
