import { globalCss, createStitches } from "@stitches/react";
import { useState } from "react";

export const { styled, css } = createStitches({
  theme: {
    colors: {
      white: "rgb(255, 255, 255)",
      black: "rgb(0, 0, 0)",
      grey: "rgb(200, 200, 200)",
      darkGrey: "rgb(25, 25, 25)",
      darkerGrey: "rgb(20, 20, 20)",
    },
    fontSizes: {
      1: "32px",
      2: "24px",
      3: "18px",
    },
    fontWeights: {
      regular: 400,
      bold: 700,
      black: 900,
    },
    shadows: {
      spaced:
        "0px 10px 10px 0px rgba(0, 0, 0, 0.3), inset 0px 7px 3px 0px rgba(50, 50, 50, 0.3), inset 0px -7px 3px 0px rgba(0, 0, 0, 0.1)",
      bottom: "0px 10px 10px 0px rgba(0, 0, 0, 0.3)",
    },
  },
});

export const globalStyles = globalCss({
  "@import": [
    "url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,900;1,700&display=swap')",
  ],

  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "content-box",
    fontFamily: "Montserrat",
    color: "$white",
    border: "transparent",
    fontSize: "$regular",
  },

  body: {
    height: "100%",
    width: "100%",
    backgroundColor: "$darkGrey",
  },

  "button, select": {
    border: 0,
    backgroundColor: "transparent",
  },
});

export const Flex = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  variants: {
    dir: {
      v: {
        flexDirection: "column",
      },
      h: {
        flexDirection: "row",
      },
    },
  },
});

export const Grid = styled("div", {
  display: "grid",
});

export const Label = styled("p", {
  textAlign: "center",
  alignSelf: "center",

  variants: {
    size: {
      small: {
        fontSize: "$1",
        fontWeight: "$regular",
      },
      medium: {
        fontSize: "$2",
        fontWeight: "$bold",
      },
      big: {
        fontSize: "$3",
        fontWeight: "$black",
      },
    },
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
    color: {
      solid: {
        color: "rgb(200, 200, 200)",
      },
      mid: {
        color: "rgb(170, 170, 170)",
      },
    },
  },
});

export const Input = styled("input", {
  backgroundColor: "transparent",
  border: "transparent",
  borderRadius: "5px",
  textAlign: "right",
  appearance: "none",
  paddingRight: "20px",

  "&:focus": {
    outline: "none",
    borderBottom: "1px solid rgb(100, 100, 100)",
  },
});

export const Select = styled("select", {
  border: 0,
  borderRadius: "5px",
  borderBottom: "1px solid rgb(100, 100, 100)",

  "&:focus": {
    outline: "none",
  },

  "& option": {
    backgroundColor: "rgb(30, 30, 30)",
    textAlign: "right",
  },
});

export const Button = styled("button", {
  backgroundColor: "transparent",
  borderRadius: "10px",
  padding: "10px 20px",
  margin: "15px 20px",
  boxShadow: "$bottom",

  "&:hover": {
    backgroundColor: "$darkGrey",
  },

  "&:active": {
    backgroundColor: "$darkerGrey",
  },
});

export const Title = styled(Label, {
  fontSize: "$1",
  fontWeight: "$black",
  padding: "100px 20px",
});
