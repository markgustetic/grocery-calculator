import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GroceryRow from "./GroceryRow";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const defaultGroceries = [
  {
    groceryName: "",
    price: 0,
    owner: "split",
  },
];

function Calculator() {
  const classes = useStyles();

  const [groceries, setGroceries] = useState(() => {
    const localGroceries = window.localStorage.getItem("groceries");

    return localGroceries !== null
      ? JSON.parse(localGroceries)
      : defaultGroceries;
  });

  useEffect(() => {
    window.localStorage.setItem("groceries", JSON.stringify(groceries));
  }, [groceries]);

  const handlePriceChange = (i, e) => {
    let price = e.target.value.replace("$", "");

    if (price.startsWith("0")) {
      price = price.substring(1);
    }

    if (isNaN(price)) {
      return;
    }

    if (price.includes(".")) {
      let afterDecimal = price.split(".");
      let lastChars = afterDecimal[afterDecimal.length - 1];

      if (lastChars.length > 2) {
        return;
      }
    }

    const value = [...groceries];

    value[i] = {
      ...groceries[i],
      [e.target.name]: price,
    };

    setGroceries(value);
  };

  const handleGroceryChange = (i, e, v) => {
    if (e === null) {
      return;
    }

    const value = [...groceries];

    value[i] = {
      ...groceries[i],
      groceryName: v,
    };

    setGroceries(value);
  };

  const handleOptionChange = (i, e) => {
    setGroceries(
      groceries.map((item, index) =>
        i === index ? { ...item, owner: e.target.value } : item
      )
    );
  };

  const handleRemove = (i) =>
    setGroceries((groceries) => groceries.filter((item, index) => i !== index));

  const addGroceryRow = () =>
    setGroceries([...groceries, { groceryName: "", price: 0, owner: "split" }]);

  const resetGroceries = () => setGroceries([]);

  const totalGroceries = () =>
    groceries.reduce((a, item) => a + Number(item.price), 0);

  const totalByPerson = (name) =>
    groceries
      .filter((grocery) => grocery.owner === name || grocery.owner === "split")
      .reduce((a, item) => {
        return (
          a +
          (item.owner === "split" ? Number(item.price) / 2 : Number(item.price))
        );
      }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div>
      <div>
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Total: {formatter.format(totalGroceries())}
          </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Mark Total: {formatter.format(totalByPerson("mark"))}
          </Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Alissa Total: {formatter.format(totalByPerson("alissa"))}
          </Typography>
        </Container>
      </div>

      <div className={classes.root}>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                align="center"
                onClick={() => addGroceryRow()}
              >
                Add groceries
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                align="center"
                onClick={() => resetGroceries()}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <GroceryRow
              groceries={groceries}
              handleGroceryChange={handleGroceryChange}
              handlePriceChange={handlePriceChange}
              handleOptionChange={handleOptionChange}
              handleRemove={handleRemove}
            />
          </Grid>
        </div>
        <Fab color="primary" aria-label="add" onClick={() => addGroceryRow()}>
          <AddIcon />
        </Fab>
      </Container>
    </div>
  );
}

export default Calculator;
