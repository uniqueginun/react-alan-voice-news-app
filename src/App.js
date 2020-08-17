import React, { useEffect, useState } from "react";
import "./App.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NewsItem from "./NewsItem";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const alanKey =
  "7210c5758f7569dc0d7e7c4fbe37ff962e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const classes = useStyles();
  const [articals, setArticals] = useState([]);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setArticals(articles);
        }
      },
    });
  }, []);
  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <b>
                <strong>News Voice Application, Try something like: </strong>
              </b>
            </Paper>
          </Grid>
          {articals.length ? (
            articals.map((article, i) => (
              <Grid key={i} item xs={3}>
                <NewsItem article={article} />
              </Grid>
            ))
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  "Give me the news from CNN"
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  "what's up with smartphones"
                </Paper>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default App;
