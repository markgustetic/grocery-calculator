import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/Textfield";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

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
}));

export default function GroceryRow(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.groceries.map((grocery, i) => {
        return (
          <Grid key={i} container spacing={1}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                className={classes.paper}
                type="text"
                id={`${i}-name outlined-basic`}
                variant="outlined"
                name="name"
                value={grocery.name}
                onChange={(e) => props.handleInputChange(i, e)}
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
                value={grocery.price}
                onChange={(e) => props.handlePriceChange(i, e)}
              />
            </Grid>

            <Grid item xs={3} align="center">
              <Paper className={classes.paper}>
                <FormControl className={classes.paper} component="fieldset">
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
              <Paper className={classes.paper}>
                <Button type="button" onClick={() => props.handleRemove(i)}>
                  X
                </Button>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
