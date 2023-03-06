import { useState, useContext } from "react";
import { styled, Flex, Label, Input, Button } from "../styles/Styles";

const Item = styled(Label, {
  // border: "solid 1px white",
  textAlign: "left",
  width: "100%",
  alignSelf: "center",

  "&:hover": {
    cursor: "pointer",
  },

  variants: {
    click: {
      clicked: {
        backgroundColor: "$grey",
      },
      notClicked: {
        backgroundColor: "$darkerGrey",
      },
    },
  },
});

export function SearchMealItem({ style, atributes, selectMeal }) {
  return (
    <>
      <Item
        style={style}
        onClick={() => {
          selectMeal({ ...atributes, quantity: 100 });
        }}
      >
        {atributes.name}
      </Item>
    </>
  );
}
