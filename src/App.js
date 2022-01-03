import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [chosenLevel, setChosenLevel] = useState(null);

  const getRandomWords = () => {
    const options = {
      method: "GET",
      url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
      params: { level: chosenLevel, area: "sat" },
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

  useEffect(() => {
    if (chosenLevel) getRandomWords();
  }, [chosenLevel]);

  return (
    <div className="App">
      {!chosenLevel && (
        <div className="level-selector">
          <h1>Word Association App</h1>
          <p>select you level to start</p>
          <select
            name="levels"
            id="levels"
            value={chosenLevel}
            onChange={(e) => setChosenLevel(e.target.value)}
          >
            <option value={null}>Select a Level</option>
            <option value={"1"}>Level 1</option>
            <option value={"2"}>Level 2</option>
            <option value={"3"}>Level 3</option>
          </select>
        </div>
      )}

      {chosenLevel && (
        <div className="question-area">
          <h1>Welcome to level: {chosenLevel}</h1>
          <div className="question-box"></div>
        </div>
      )}
    </div>
  );
}

export default App;
