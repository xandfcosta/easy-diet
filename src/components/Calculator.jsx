import {
  styled,
  Label,
  Input,
  Flex,
  Select,
  Button,
  Grid,
} from "../styles/Styles";
import { useState } from "react";

const Container = styled(Flex, {
  justifyContent: "center",
  alignItems: "center",
  margin: "20px",
  padding: "20px",
  width: "500px",
  backgroundColor: "$darkGrey",
  borderRadius: "30px",
  boxShadow: "$spaced",
});

export const GridCalculator = styled(Grid, {
  height: "100%",
  width: "100%",
  gridTemplateColumns: "3fr 1fr 1fr",
  gridTemplateRows: "repeat(5, 1fr)",
  rowGap: "10px",
});

export function Calculator({ calories, useCalories }) {
  const [weight, useWeight] = useState(0);
  const [height, useHeight] = useState(0);
  const [age, useAge] = useState(0);
  const [gender, useGender] = useState(0);
  const [intensity, useintensity] = useState("sedentario");
  const intensityValues = {
    sedentario: 1.2,
    pouco: 1.375,
    moderado: 1.55,
    muito: 1.725,
    demais: 1.9,
  };

  function calculateCalories(weight, height, age, gender, intensity) {
    const isMen = !gender;

    if (isMen) {
      return (
        (66.5 + 13.75 * weight + 5.003 * height - 6.75 * age) *
        intensityValues[intensity]
      );
    }
    return (
      (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) *
      intensityValues[intensity]
    );
  }

  function totalCalories(weight, height, age, gender, intensity) {
    const isWeightHeightAgeMoreThanZero = weight && height && age;

    if (isWeightHeightAgeMoreThanZero) {
      return Math.ceil(
        calculateCalories(weight, height, age, gender, intensity)
      );
    }
  }

  return (
    <Container dir={"v"}>
      <GridCalculator>
        <Label>Peso</Label>
        <Input
          type={"number"}
          value={weight}
          onChange={(e) => {
            useWeight(e.target.value);
          }}
        ></Input>
        <Label align={"left"}>kg</Label>

        <Label>Altura</Label>
        <Input
          type={"number"}
          value={height}
          onChange={(e) => {
            useHeight(e.target.value);
          }}
        ></Input>
        <Label align={"left"}>cm</Label>

        <Label>Idade</Label>
        <Input
          type={"number"}
          value={age}
          onChange={(e) => {
            useAge(e.target.value);
          }}
        ></Input>
        <Label align={"left"}>anos</Label>

        <Label>Gênero</Label>
        <Select
          value={gender}
          onChange={(e) => {
            useGender(e.target.value);
          }}
        >
          <option value={0}>Masculino</option>
          <option value={1}>Feminino</option>
        </Select>
        <div></div>

        <Label>Atividade Física</Label>
        <Select
          value={intensity}
          onChange={(e) => {
            useintensity(e.target.value);
          }}
        >
          <option value={"sedentario"}>Sedentário</option>
          <option value={"pouco"}>Pouco</option>
          <option value={"moderado"}>Moderado</option>
          <option value={"muito"}>Muito</option>
          <option value={"demais"}>Demais</option>
        </Select>
        <div></div>
      </GridCalculator>

      <Button
        onClick={() =>
          useCalories(totalCalories(weight, height, age, gender, intensity))
        }
      >
        Calcular
      </Button>
      <Label size={"big"}>{calories} kcal</Label>
    </Container>
  );
}
