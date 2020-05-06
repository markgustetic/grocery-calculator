import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GroceryRow from "./GroceryRow";

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

  const [input, setInput] = useState({});

  const handleInputChange = (i, e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    const value = [...groceries];

    const targetValue =
      e.currentTarget.name === "price"
        ? Number(e.currentTarget.value)
        : e.currentTarget.value;

    value[i] = {
      ...groceries[i],
      [e.currentTarget.name]: targetValue,
    };

    console.log(value);
    setGroceries(value);
  };

  const handleOptionChange = (i, e) => {
    //debugger;

    setGroceries(
      groceries.map((item, index) =>
        i === index ? { ...item, owner: e.currentTarget.value } : item
      )
    );
  };

  const handleRemove = (i) =>
    setGroceries((groceries) => groceries.filter((item, index) => i !== index));

  const addGroceryRow = () =>
    setGroceries([...groceries, { name: "", price: 0, owner: "split" }]);

  const totalGroceries = () => groceries.reduce((a, item) => a + item.price, 0);

  const totalByPerson = (name) =>
    groceries
      .filter((grocery) => grocery.owner === name || grocery.owner === "split")
      .reduce((a, item) => {
        return a + (item.owner === "split" ? item.price / 2 : item.price);
      }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div>
      <p>Total: {formatter.format(totalGroceries())}</p>
      <p>Mark Total: {formatter.format(totalByPerson("mark"))}</p>
      <p>Alissa Total: {formatter.format(totalByPerson("alissa"))}</p>

      <div>
        <Button onClick={() => addGroceryRow()}>Add groceries</Button>
      </div>
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
            handleOptionChange={handleOptionChange}
            handleRemove={handleRemove}
          />
        </Grid>
      </div>
    </div>
  );
}

export default Calculator;
