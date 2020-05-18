import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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

function Calculator() {
  const classes = useStyles();

  const [groceries, setGroceries] = useState([
    {
      name: "Dog Food",
      price: 10.15,
      owner: "mark",
    },
    {
      name: "Cat Food",
      price: 11.5,
      owner: "alissa",
    },
    {
      name: "TV",
      price: 50.5,
      owner: "split",
    },
  ]);

  const handlePriceChange = (i, e) => {
    let price = e.target.value.replace("$", "");

    if (price.startsWith("0")) {
      price = price.substring(1);
    }

    if (isNaN(price)) {
      return;
    }

    if (price.includes(".")) {
      let after_decimal = price.split(".");
      let last_chars = after_decimal[after_decimal.length - 1];

      if (last_chars.length > 2) {
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

  const handleInputChange = (i, e) => {
    const value = [...groceries];

    value[i] = {
      ...groceries[i],
      [e.target.name]: e.target.value,
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
    setGroceries([...groceries, { name: "", price: 0, owner: "split" }]);

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

      <div>
        <Container>
          <Button
            variant="contained"
            color="primary"
            size="large"
            align="center"
            onClick={() => addGroceryRow()}
          >
            Add groceries
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="large"
            align="center"
            onClick={() => resetGroceries()}
          >
            Reset
          </Button>
        </Container>
      </div>
      <Container>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Grocery Name</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Price</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>Owner</Paper>
            </Grid>

            <GroceryRow
              groceries={groceries}
              handleInputChange={handleInputChange}
              handlePriceChange={handlePriceChange}
              handleOptionChange={handleOptionChange}
              handleRemove={handleRemove}
            />
          </Grid>
        </div>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => addGroceryRow()} />
        </Fab>
      </Container>
    </div>
  );
}

export default Calculator;
