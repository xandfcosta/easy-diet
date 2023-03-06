import { useEffect, useState, useContext } from "react";
import {
  styled,
  globalStyles,
  Grid,
  Flex,
  Button,
  Input,
  Label,
  Select,
  Title,
} from "./styles/Styles";
import "./styles/input-arrows.css";
import { NavBar } from "./components/Navbar";
import { Calculator } from "./components/Calculator";
import { IntensityTable } from "./components/IntensityTable";
import { MealsSection } from "./components/MealsSection";
import { SearchMeal } from "./components/SearchMeal";
import { ModalContext } from "./contexts/ModalContext";

const Body = styled(Flex, {});
const CaloriesSection = styled(Flex, {});

function App() {
  const [search, useSearch] = useState({
    isModalOpen: false,
    meal: {},
  });
  const [calories, useCalories] = useState(0);

  globalStyles();

  return (
    <ModalContext.Provider value={{ search, useSearch }}>
      {search.isModalOpen && <SearchMeal></SearchMeal>}
      <NavBar></NavBar>
      <Body dir={"v"}>
        <CaloriesSection dir={"h"}>
          <Calculator
            calories={calories}
            useCalories={useCalories}
          ></Calculator>
          <IntensityTable></IntensityTable>
        </CaloriesSection>
        <Title>Refeições</Title>
        <MealsSection calories={calories}></MealsSection>
      </Body>
    </ModalContext.Provider>
  );
}

export default App;
