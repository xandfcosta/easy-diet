import { styled, Grid, Flex, Button, Title, Label } from "../styles/Styles";
import { useEffect, useState } from "react";
import { MealTable } from "./MealTable.jsx";
import { MealsSummarize } from "./MealsSummarize";

const Container = styled(Grid, {
  gridTemplateColumns: "3fr 1fr",
  columnGap: "20px",
  marginBottom: "50px",
  padding: "0px 30px",
});
const MealTables = styled(Flex, {
  gap: "20px",
});
const AddTableButton = styled(Button, {
  width: "600px",

  "&:hover": {
    backgroundColor: "$darkerGrey",
  },
});

export function MealsSection({ calories }) {
  const [mealTables, useMealTables] = useState([
    {
      title: "Refeição 1",
      sumMacros: {
        carbohydrates: 0,
        proteins: 0,
        fats: 0,
      },
      meals: [],
    },
  ]);

  const addNewTable = () => {
    const newTable = {
      title: "Nova Tabela",
      sumMacros: {
        carbs: 0,
        prots: 0,
        fats: 0,
      },
      meals: [],
    };
    useMealTables([...mealTables, newTable]);
  };

  const changeTableName = (oldTitle, newTitle) => {
    useMealTables(
      mealTables.map((table) => {
        if (table.title === oldTitle) {
          table.title = newTitle;
        }
        return table;
      })
    );
  };

  const addMeal = (tableTitle, meal) => {
    useMealTables(
      mealTables.map((table) => {
        if (table.title === tableTitle) {
          meal = { ...meal, suffix: "g" };
          table.meals = [...table.meals, meal];
          table.sumMacros.carbohydrates += meal.carbohydrates;
          table.sumMacros.proteins += meal.proteins;
          table.sumMacros.fats += meal.fats;
        }
        return table;
      })
    );
  };

  const deleteMeal = (tableTitle, mealID) => {
    useMealTables(
      mealTables.map((table) => {
        if (table.title === tableTitle) {
          table.meals = table.meals.filter((meal) => {
            if (meal.id !== mealID) return meal;
            table.sumMacros.carbohydrates -= meal.carbohydrates;
            table.sumMacros.proteins -= meal.proteins;
            table.sumMacros.fats -= meal.fats;
          });
        }
        return table;
      })
    );
  };

  const changeMealValue = (tableTitle, mealEdited) => {
    useMealTables(
      mealTables.map((table) => {
        if (table.title === tableTitle) {
          table.meals = table.meals.map((meal) => {
            if (meal.name === mealEdited.name) {
              table.sumMacros.carbohydrates +=
                mealEdited.carbohydrates - meal.carbohydrates;
              table.sumMacros.proteins += mealEdited.proteins - meal.proteins;
              table.sumMacros.fats += mealEdited.fats - meal.fats;
              return mealEdited;
            }
            return meal;
          });
        }
        return table;
      })
    );
  };

  const totalMacros = () => {
    const macros = {
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
    };

    mealTables.forEach((meal) => {
      macros.carbohydrates += meal.sumMacros.carbohydrates;
      macros.proteins += meal.sumMacros.proteins;
      macros.fats += meal.sumMacros.fats;
    });

    return macros;
  };

  return (
    <Container>
      <MealTables dir={"v"}>
        {mealTables.map((table) => {
          return (
            <MealTable
              key={table.title}
              title={table.title}
              sumMacros={table.sumMacros}
              meals={table.meals}
              changeTableName={changeTableName}
              addMeal={addMeal}
              deleteMeal={deleteMeal}
              changeMealValue={changeMealValue}
            ></MealTable>
          );
        })}
        <AddTableButton
          onClick={() => {
            addNewTable();
          }}
        >
          +
        </AddTableButton>
      </MealTables>
      <MealsSummarize
        calculatedCalories={calories}
        totalMacros={totalMacros()}
      ></MealsSummarize>
    </Container>
  );
}
