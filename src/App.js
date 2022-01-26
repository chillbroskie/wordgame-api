import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [chosenLevel, setChosenLevel] = useState(null);
  const [words, setWords] = useState(null);
  // array / state of all teh correct answers of the game
  const [correctAnswers, setCorrectAnswers] = useState([]);

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
        setWords(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(words);

  useEffect(() => {
    if (chosenLevel) getRandomWords();
  }, [chosenLevel]);

  // this function checks the answer the player has selected with the correct answer of the cards, the +1 is already included here for the index from below
  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer);
    if (optionIndex == correctAnswer) {
      setCorrectAnswers([...correctAnswers, option]);
    }
  };

  console.log(correctAnswers);

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

      {chosenLevel && words && (
        <div className="question-area">
          <h1>Welcome to level: {chosenLevel}</h1>

          {words.quizlist.map((question, questionIndex) => (
            <div className="question-box">
              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}
              <div className="question-buttons">
                {question.option.map((option, optionIndex) => (
                  <div className="question-button">
                    {/* give each button an index and add 1 to be able to match with answers */}
                    <button
                      onClick={() =>
                        checkAnswer(option, optionIndex + 1, question.correct)
                      }
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>

              <p>{question.correct}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
