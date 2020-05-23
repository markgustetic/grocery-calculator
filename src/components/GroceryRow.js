import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RemoveIcon from "@material-ui/icons/Remove";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: "wrap",
  },
  paper: {
    textAlign: "center",
    height: "100%",
    color: theme.palette.text.secondary,
  },
  formpaper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    height: 55,
  },
  closebutton: {
    height: 53,
  },
  removeButton: {
    marginTop: 15,
  },
}));

const groceryList = [
  { name: "Dog Food" },
  { name: "Cat Food" },
  { name: "Frozen Chicken" },
  { name: "Bottled Water" },
  { name: "Onions" },
  { name: "Chicken Wings" },
  { name: "Chicken Breast" },
  { name: "Steak" },
  { name: "Cheese" },
  { name: "Tortillas" },
];

export default function GroceryRow(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.groceries.map((grocery, i) => {
        return (
          <Grid key={i} container spacing={1}>
            <Grid item xs={3}>
              <Autocomplete
                freeSolo
                className={classes.paper}
                value={grocery.name}
                options={groceryList.map((option) => option.name)}
                onChange={(e) => props.handleInputChange(i, e)}
                renderInput={(params) => (
                  <TextField
                    type="text"
                    id={`${i}-name outlined-basic`}
                    variant="outlined"
                    {...params}
                    label="Grocery Name"
                    margin="normal"
                    onChange={(e) => props.handleInputChange(i, e)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                className={classes.paper}
                type="text"
                id={`${i}-price outlined-basic`}
                variant="outlined"
                name="price"
                margin="normal"
                label="Price"
                value={grocery.price}
                onChange={(e) => props.handlePriceChange(i, e)}
              />
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.formpaper}>
                <FormControl margin="normal" component="fieldset">
                  <RadioGroup
                    row
                    aria-label="mark"
                    value={grocery.owner}
                    onChange={(e) => props.handleOptionChange(i, e)}
                  >
                    <FormControlLabel
                      value="mark"
                      control={<Radio />}
                      label="Mark"
                    />
                    <FormControlLabel
                      value="alissa"
                      control={<Radio />}
                      label="Alissa"
                    />
                    <FormControlLabel
                      value="split"
                      control={<Radio />}
                      label="Split"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item>
              <Fab
                className={classes.removeButton}
                color="secondary"
                aria-label="remove"
                onClick={() => props.handleRemove(i)}
              >
                <RemoveIcon />
              </Fab>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
