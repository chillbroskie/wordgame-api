import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // state of selected level, default non(null0 selected)
  const [chosenLevel, setChosenLevel] = useState(null);
  // state of words for the game
  const [words, setWords] = useState(null);
  // array / state of all the correct answers of the game
  const [correctAnswers, setCorrectAnswers] = useState([]);
  // state of clicked button correct or not
  const [clicked, setClicked] = useState([]);
  // state for storing score
  const [score, setScore] = useState(0);

  const getRandomWords = () => {
    const options = {
      method: "GET",
      url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
      params: { level: chosenLevel, area: "sat" },
      headers: {
        "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
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
      setScore((score) => score + 1);
    } else {
      setScore((score) => score - 1);
    }
    setClicked([...clicked, option]);
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
            <option value={"4"}>Level 4</option>
            <option value={"5"}>Level 5</option>
            <option value={"6"}>Level 6</option>
            <option value={"7"}>Level 7</option>
            <option value={"8"}>Level 8</option>
            <option value={"9"}>Level 9</option>
            <option value={"10"}>Level 10</option>
          </select>
        </div>
      )}

      {chosenLevel && words && (
        <div className="question-area">
          <h1>Welcome to level: {chosenLevel}</h1>
          <h3>Your Score is: {score}</h3>
          <div className="questions">
            {words.quizlist.map((question, _questionIndex) => (
              <div key={_questionIndex} className="question-box">
                {question.quiz.map((tip, _index) => (
                  <p key={_index}>{tip}</p>
                ))}
                <div className="question-buttons">
                  {question.option.map((option, optionIndex) => (
                    <div key={optionIndex} className="question-button">
                      {/* give each button an index(answer) and add 1 to be able to match with answers */}
                      <button
                        disabled={clicked.includes(option)}
                        onClick={() =>
                          checkAnswer(option, optionIndex + 1, question.correct)
                        }
                      >
                        {option}
                      </button>
                      {/*  if selected option is correct, this p tag will show under */}
                      {correctAnswers.includes(option) && <p>Correct!</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setChosenLevel(null)}>Go Back</button>
        </div>
      )}
    </div>
  );
}

export default App;
