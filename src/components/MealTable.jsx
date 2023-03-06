import { useContext, useEffect, useState } from "react";
import { Flex, styled, Title, Grid, Button, Input } from "../styles/Styles";
import { Meal } from "./Meal";
import { ModalContext } from "../contexts/ModalContext";

const Container = styled(Flex, {
  backgroundColor: "$darkGrey",
  boxShadow: "$bottom",
  borderRadius: "20px",
});
const Header = styled(Grid, {
  gridTemplateColumns: "repeat(5, 1fr)",
  padding: "10px 20px",
  backgroundColor: "$darkerGrey",
});
const TableTitle = styled(Title, {
  fontSize: "$2",
  fontWeight: "$bold",
  padding: 0,
});
const AddButton = styled(Button, {
  width: "300px",

  "&:hover": {
    backgroundColor: "$darkerGrey",
  },

  "&:active": {
    backgroundColor: "$darkGrey",
  },
});
const TableNameInput = styled(Input, {
  textAlign: "center",
  fontSize: "$3",
  fontWeight: "$regular",
  paddingRight: "0px",
  border: "1px solid rgb(100, 100, 100, 1)",
});

export const MealTable = ({
  title,
  sumMacros,
  meals,
  changeTableName,
  addMeal,
  deleteMeal,
  changeMealValue,
}) => {
  const { search, useSearch } = useContext(ModalContext);
  const [tableName, useTableName] = useState(title);
  const [editable, useEditable] = useState(false);

  const finishInput = (key) => {
    if (editable && key === "Enter" && tableName !== title) {
      changeTableName(title, tableName)
      useEditable(!editable);
    }
  };

  useEffect(() => {
    if (Object.keys(search.meal).length !== 0) {
      addMeal(title, search.meal);
    }
  }, [search.meal]);

  return (
    <Container dir={"v"}>
      <Header>
        {editable ? (
          <TableNameInput
            autoFocus
            value={tableName}
            onChange={(e) => {
              useTableName(e.target.value);
            }}
            onKeyDown={(e) => {
              finishInput(e.key);
            }}
          ></TableNameInput>
        ) : (
          <TableTitle
            onClick={() => {
              useEditable(!editable);
            }}
          >
            {tableName}
          </TableTitle>
        )}
        <div></div>
        <TableTitle>Carboidratos {sumMacros.carbohydrates}g</TableTitle>
        <TableTitle>Proteínas {sumMacros.proteins}g</TableTitle>
        <TableTitle>Gorduras {sumMacros.fats}g</TableTitle>
      </Header>
      {meals.map((meal) => {
        return (
          <Meal
            key={meal.id}
            tableTitle={title}
            attributes={meal}
            deleteMeal={deleteMeal}
            changeMealValue={changeMealValue}
          ></Meal>
        );
      })}
      <AddButton onClick={() => useSearch({ ...search, isModalOpen: true })}>
        +
      </AddButton>
    </Container>
  );
};
