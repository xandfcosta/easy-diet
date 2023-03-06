import { useState, useContext } from "react";
import { styled, Flex, Label, Input, Button, Grid } from "../styles/Styles";
import { ModalContext } from "../contexts/ModalContext";
import { FixedSizeList as List } from "react-window";
import { SearchMealItem } from "./SearchMealItem";
import axios from "axios";

const Container = styled(Flex, {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 9999,
});
const Background = styled(Flex, {
  flexDirection: "column",
  justifyContent: "left",
  width: "100%",
  height: "100%",
  backgroundColor: "rgb(0, 0, 0, .7)",
  gap: "20px",
});
const SearchInput = styled(Flex, {
  justifyContent: "left",
  alignItems: "left",
  backgroundColor: "$darkGrey",
  padding: "10px 20px",
  borderRadius: "20px",
  width: "90%",
  marginTop: "30px",
});
const SearchView = styled(Flex, {
  backgroundColor: "$darkerGrey",
  padding: "10px 20px",
  borderRadius: "20px",
  height: "100%",
  width: "90%",
  marginBottom: "30px",
});
const SearchInfo = styled(Flex, {
  backgroundColor: "$darkerGrey",
  borderRadius: "20px",
  height: "100%",
  width: "100%",
  gap: "20px",
});
const SearchList = styled(Flex, {
  backgroundColor: "$darkGrey",
  borderRadius: "20px",
  height: "90%",
  width: "80%",
  overflowY: "auto",
  overflowX: "hidden",
  padding: "0px 20px",
});
const SearchMacros = styled(Grid, {
  height: "30%",
  gridTemplateColumns: "repeat(2, 1fr)",
  borderRadius: "20px",
});
const Macro = styled(Label, {
  padding: "0px 10px",
});

export function SearchMeal() {
  const { searchContext, useSearch } = useContext(ModalContext);
  const [searchMealName, useSearchMealName] = useState("");
  const [selectedMeal, useSelectedMeal] = useState({});
  const [searchList, useSearchList] = useState([]);

  const searchForMealName = (thisMealName) => {
    const link = `http://127.0.0.1:8000/search_meal/${thisMealName}`;
    axios.get(link).then((res) => {
      useSearchList(res.data);
    });
  };

  const createListItem = ({ index, data, style }) => {
    return (
      <SearchMealItem
        style={style}
        atributes={data[index]}
        selectMeal={useSelectedMeal}
      ></SearchMealItem>
    );
  };

  const changeMacrosPerGrams = (newQuantity) => {
    const oldQuantity = selectedMeal.quantity;
    let proportion = newQuantity / oldQuantity;

    useSelectedMeal({
      ...selectedMeal,
      quantity: newQuantity,
      calories: selectedMeal.calories * proportion,
      carbohydrates: selectedMeal.carbohydrates * proportion,
      proteins: selectedMeal.proteins * proportion,
      fats: selectedMeal.fats * proportion,
    });
  };

  const addMealToTable = (mealID) => {
    if (Object.keys(selectedMeal).length > 0) {
      const mealFilter = searchList.filter((item) => {
        return item.id === mealID;
      });

      useSearch({
        isModalOpen: false,
        meal: { ...mealFilter[0], quantity: selectedMeal.quantity },
      });
    }
  };

  return (
    <Container>
      <Background
        onClick={() => {
          useSearch({ isModalOpen: false, meal: {} });
        }}
      >
        <SearchInput dir={"h"} onClick={(e) => e.stopPropagation()}>
          <Label style={{ padding: "0px 10px" }}>Nome: </Label>
          <Input
            style={{ textAlign: "left", width: "100%" }}
            value={searchMealName}
            onChange={(e) => {
              useSearchMealName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchForMealName(e.target.value);
            }}
          ></Input>
          <Button onClick={() => searchForMealName(searchMealName)}>
            Procurar
          </Button>
        </SearchInput>
        <SearchView dir={"v"}>
          <SearchInfo dir={"h"} onClick={(e) => e.stopPropagation()}>
            <SearchList dir={"v"}>
              {searchList.length > 0 ? (
                <List
                  style={{ overflowX: "hidden" }}
                  height={600}
                  width={"100%"}
                  itemData={searchList}
                  itemCount={searchList.length}
                  itemSize={50}
                >
                  {createListItem}
                </List>
              ) : (
                <Label>Procure pelo nome de algum alimento</Label>
              )}
            </SearchList>
            <SearchMacros>
              <Macro align={"left"}>Quantidade</Macro>
              <Input
                align={"right"}
                type={"number"}
                value={selectedMeal.quantity || 0}
                onChange={(e) => {
                  changeMacrosPerGrams(e.target.value);
                }}
              ></Input>
              <Macro align={"left"}>Calorias</Macro>
              <Macro align={"right"}>{selectedMeal.calories || 0}</Macro>
              <Macro align={"left"}>Carboidratos</Macro>
              <Macro align={"right"}>{selectedMeal.carbohydrates || 0}</Macro>
              <Macro align={"left"}>Proteínas</Macro>
              <Macro align={"right"}>{selectedMeal.proteins || 0}</Macro>
              <Macro align={"left"}>Gorduras</Macro>
              <Macro align={"right"}>{selectedMeal.fats || 0}</Macro>
            </SearchMacros>
          </SearchInfo>
          <Button
            onClick={() => {
              addMealToTable(selectedMeal.id);
            }}
          >
            Adicionar alimento
          </Button>
        </SearchView>
      </Background>
    </Container>
  );
}
