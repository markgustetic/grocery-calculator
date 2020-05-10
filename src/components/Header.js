import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

function Header() {
  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Grocery Calculator
        </Typography>
      </Container>
    </div>
  );
}

export default Header;
