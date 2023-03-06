import { useState, useEffect } from "react";
import { styled, Flex, Label, Grid } from "../styles/Styles";

const Container = styled(Flex, {
  backgroundColor: "$darkGrey",
  boxShadow: "$bottom",
  borderRadius: "20px",
  justifyContent: "left",
});

const Title = styled(Label, {
  padding: "10px 0px",
});

const Macros = styled(Flex, {
  width: "60%",
  margin: "20px 10px",
});

const MacroItem = styled(Flex, {
  justifyContent: "space-between",
  width: "100%",
});

const Calories = styled(Label, {
  variants: {
    color: {
      deficit: { color: "rgb(200, 0, 0)" },
      surplus: { color: "rgb(0, 200, 0)" },
      neutral: { color: "rgb(200, 200, 200)" },
    },
  },
});

export function MealsSummarize({ calculatedCalories, totalMacros }) {
  const macrosCalories = { carbohydrates: 4, proteins: 4, fats: 9 };
  const totalCalories =
    totalMacros.carbohydrates * macrosCalories.carbohydrates +
    totalMacros.proteins * macrosCalories.proteins +
    totalMacros.fats * macrosCalories.fats;

  const caloriesDifference = calculatedCalories - totalCalories;

  return (
    <Container dir={"v"}>
      <Title size="big">Resumo</Title>
      <Macros dir={"v"}>
        <MacroItem>
          <Label align={"right"}>Carboidratos: </Label>
          <Label align={"right"}>
            {"".concat(totalMacros.carbohydrates, "g")}
          </Label>
        </MacroItem>
        <MacroItem>
          <Label align={"right"}>Proteínas: </Label>
          <Label align={"right"}>{"".concat(totalMacros.proteins, "g")}</Label>
        </MacroItem>
        <MacroItem>
          <Label align={"right"}>Gorduras: </Label>
          <Label align={"right"}>{"".concat(totalMacros.fats, "g")}</Label>
        </MacroItem>
      </Macros>
      <Calories
        color={
          caloriesDifference < 0
            ? "surplus"
            : caloriesDifference > 0
            ? "deficit"
            : "neutral"
        }
      >
        Balança: {caloriesDifference} kcal
      </Calories>
    </Container>
  );
}
