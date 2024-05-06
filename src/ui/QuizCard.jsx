import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuizapp } from '../context/QuizAppProvider';

function QuizCard() {
  const {
    getQuestions,
    quizStarted,
    timer,
    questions,
    activeQuestion,
    selected,
    submit,
    handleStart,
    handleAnswerSelect,
    handlePrevBtn,
    handleSubmit,
    handleNextBtn,
  } = useQuizapp();

  useEffect(() => {
    getQuestions();
  }, []);

  const data = questions[activeQuestion];
  const options = data ? [data.correct_answer, ...data.incorrect_answers] : [];

  return (
    <>
      {!quizStarted ? (
        <div className="question-card">
          <div className="card-body">
            <h2 className="card-title">Start your random test</h2>
            <button className="btn btn--start" onClick={handleStart}>
              Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <div>
          {data && (
            <div className="question-card">
              <div className="question-card__header">
                <span className="header__amount">
                  Question {activeQuestion + 1}
                </span>
                <span className="header__time">
                  {timer.toString().padStart(2, '0')} s
                </span>
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
                  <Link to="/result" className="btn btn--reset">
                    Go to Result
                  </Link>
                ) : (
                  <button
                    className="btn btn--next"
                    onClick={
                      activeQuestion === questions.length - 1
                        ? handleSubmit
                        : handleNextBtn
                    }
                  >
                    {activeQuestion === questions.length - 1
                      ? 'Submit'
                      : 'Next'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default QuizCard;
