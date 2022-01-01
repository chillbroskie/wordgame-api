import axios from "axios";
import { useState } from "react";

function App() {
  const [chosenLevel, setChosenLevel] = useState(null);

  const getRandomWords = () => {
    const options = {
      method: "GET",
      url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
      params: { level: "3", area: "sat" },
      headers: {
        "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
        "x-rapidapi-key": "bdf288e334msh0ab3bad4d8d4932p1359aejsn03ca6e624ce0",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(chosenLevel);

  return (
    <div className="App">
      <select
        name="levels"
        id="levels"
        value={chosenLevel}
        onChange={(e) => setChosenLevel(e.target.value)}
      >
        <option value={"1"}>Level 1</option>
        <option value={"2"}>Level 2</option>
        <option value={"3"}>Level 3</option>
      </select>
    </div>
  );
}

export default App;
