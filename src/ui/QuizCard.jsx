import axios from 'axios';
import { useEffect, useState } from 'react';

function QuizCard() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchDataQuestions = async () => {
      try {
        const { data } = await axios.get(
          'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
        );
        setQuestions(data.results);
        console.log(data.results);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDataQuestions();
  }, []);
  useEffect(() => {
    setAnswer([]);
  }, [activeQuestion]);

  const data = questions[activeQuestion];
  const options = data ? [data.correct_answer, ...data.incorrect_answers] : [];

  const handleNextBtn = () => {
    setActiveQuestion((prevActionQuestion) => prevActionQuestion + 1);
  };
  const handlePrevBtn = () => {
    setActiveQuestion((prevActionQuestion) => prevActionQuestion - 1);
  };
  const handleAnswerSelect = (selectedOptions) => {
    setAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, selectedOptions]);
    console.log(selectedOptions);
  };

  return (
    <div>
      {data && (
        <div className="question-card">
          <div className="question-card__header">
            <span className="header__amount">
              Question {activeQuestion + 1}
            </span>
            <span className="header__time">time</span>
          </div>

          <div className="question-card__content">
            <p className="content__text">{data?.question}</p>
            {options.map((option) => {
              return (
                <div
                  key={option.id}
                  className="content__item"
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
          <div className="question-card__btn">
            <button
              className="btn btn--prev"
              onClick={handlePrevBtn}
              disabled={activeQuestion === 0}
            >
              Previous
            </button>
            <button
              className="btn btn--next"
              onClick={handleNextBtn}
              disabled={activeQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
