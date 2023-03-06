import { useEffect, useState } from "react";
import { Button, Flex, Grid, Input, Label, styled } from "../styles/Styles";

const Container = styled(Flex, {
  position: "relative",
  width: "100%",
  height: "100%",
  padding: "15px 0px",
});
const TableFrame = styled(Grid, {
  gridTemplateColumns: "repeat(5, 1fr)",
  backgroundColor: "$darkGrey",
  borderBottom: "1px solid $white",
  width: "100%",
  height: "100%",
  padding: "5px 0px",
});
const Text = styled(Label, {
  fontSize: "$3",
  fontWeight: "$regular",
});
const QuantityInput = styled(Input, {
  textAlign: "center",
  fontSize: "$3",
  fontWeight: "$regular",
  paddingRight: "0px",
  border: "1px solid rgb(100, 100, 100, 1)",
});
const DelButton = styled(Button, {
  position: "absolute",
  right: 0,
  top: "50%",
  marginRight: 0,
  transform: "translate(0, -100%)",
  backgroundColor: "rgb(100, 0, 0, .2)",
  padding: "5px 10px",

  "&:hover": {
    backgroundColor: "rgb(100, 0, 0, 1)",
  },
});

export function Meal({ tableTitle, attributes, deleteMeal, changeMealValue }) {
  const [newQuantity, useNewQuantity] = useState(attributes.quantity);
  const [editable, useEditable] = useState(false);

  const finishInput = (key) => {
    if (editable && key === "Enter") {
      const proportion = newQuantity / attributes.quantity;
      const meal = {
        ...attributes,
        quantity: newQuantity,
        carbohydrates: proportion * attributes.carbohydrates,
        proteins: proportion * attributes.proteins,
        fats: proportion * attributes.fats,
      };

      changeMealValue(tableTitle, meal);
      useEditable(!editable);
    }
  };

  return (
    <Container>
      <TableFrame>
        <Text>{attributes.name}</Text>
        {editable ? (
          <QuantityInput
            autoFocus
            type={"number"}
            value={newQuantity}
            onChange={(e) => {
              useNewQuantity(e.target.value);
            }}
            onKeyDown={(e) => {
              finishInput(e.key);
            }}
          ></QuantityInput>
        ) : (
          <Text onClick={() => useEditable(!editable)}>
            {"".concat(attributes.quantity, attributes.suffix)}
          </Text>
        )}
        <Text>{attributes.carbohydrates}</Text>
        <Text>{attributes.proteins}</Text>
        <Text>{attributes.fats}</Text>
      </TableFrame>
      <DelButton
        onClick={() => {
          deleteMeal(tableTitle, attributes.id);
        }}
      >
        x
      </DelButton>
    </Container>
  );
}
