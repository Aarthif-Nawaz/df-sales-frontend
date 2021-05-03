import React, { Component, useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "../Assets/Style/card.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 355,
    WebkitAnimation: "mover 1s infinite  alternate",
    animation: "mover 1s infinite  alternate",
  },
  media: {
    height: 300,
  },
});

function MediaCard(props) {
  const [functions, setFunctions] = useState();

  

  const classes = useStyles();

  return (
    <Card id="card" className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MediaCard;
