import "@assets/globals.css";
import { Comida, comidas } from "@drizzle/schema";
import { db } from "@drizzle/drizzle";
import { useEffect, useState } from "react";

function App() {
  const [comidasDB, setComidas] = useState<Comida[]>([]);

  useEffect(() => {
    db.select()
      .from(comidas)
      .then((comidas) => {
        console.log(comidas);
        setComidas(comidas);
      });
  });

  return comidasDB.map((comida) => <div>{comida.nome}</div>);
}

export default App;
