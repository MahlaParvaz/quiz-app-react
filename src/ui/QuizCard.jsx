import axios from 'axios';
import { useEffect, useState } from 'react';

import ShowResult from './ShowResult';
import toast from 'react-hot-toast';

function QuizCard() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [selected, setSelected] = useState(
    Array.from({ length: 10 }, () => [])
  );

  useEffect(() => {
    const fetchDataQuestions = async () => {
      try {
        const { data } = await axios.get(
          'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
        );
        setQuestions(data.results);
      } catch (error) {
        toast.error(error.message);
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
    if (selected[activeQuestion].length === 0) {
      toast.error('Please select one option!');
      return;
    }

    setActiveQuestion((prevActionQuestion) => prevActionQuestion + 1);
  };

  const handlePrevBtn = () => {
    setActiveQuestion((prevActionQuestion) => prevActionQuestion - 1);
  };

  const handleAnswerSelect = (selectedOption) => {
    setSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected[activeQuestion] = selectedOption;
      return updatedSelected;
    });
  };

  const handleSubmit = () => {
    if (selected[activeQuestion].length === 0) {
      toast.error('Please select one option!');
      return;
    }
    setSubmit(true);
  };
  const handleReset = () => {
    setSubmit(false);
    setSelected(Array.from({ length: 10 }, () => []));
  };
  const isCorrectAnswer = (questionIndex) => {
    const correctAnswer = questions[questionIndex].correct_answer;
    return selected[questionIndex] === correctAnswer;
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
            {options.map((option, index) => (
              <div
                key={index}
                className={`content__item ${
                  selected[activeQuestion] === option ? 'selected' : ''
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="question-card__btn">
            <button
              className="btn btn--prev"
              onClick={handlePrevBtn}
              disabled={activeQuestion === 0}
            >
              Previous
            </button>
            {submit ? (
              <button className="btn btn--reset" onClick={handleReset}>
                Reset
              </button>
            ) : (
              <button
                className="btn btn--next"
                onClick={
                  activeQuestion === questions.length - 1
                    ? handleSubmit
                    : handleNextBtn
                }
              >
                {activeQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            )}
            <ShowResult
              isCorrectAnswer={isCorrectAnswer}
              submit={submit}
              selected={selected}
              setSubmit={setSubmit}
              questions={questions}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
