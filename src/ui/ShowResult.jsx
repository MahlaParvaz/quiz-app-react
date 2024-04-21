import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function ShowResult({
  isCorrectAnswer,
  submit,
  setSubmit,
  questions,
  selected,
}) {
  return (
    <>
      {submit && (
        <Popup
          open={submit}
          position="center"
          className="result-popup"
          contentStyle={{
            width: '700px',
            height: '650px',
            borderRadius: '10px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
          onClose={() => setSubmit(false)}
        >
          <div className="result-quiz">
            <h2>Answers</h2>
            <ul className="reult-quiz__items">
              {questions.map((question, index) => (
                <li className="result-quiz__item" key={index}>
                  <div className="item__question">
                    <p>Question {String(index + 1).padStart(2, '0')}:</p>
                    <span>{question?.question}</span>
                  </div>
                  <div className="item__answer">
                    Correct Answer: <span>{question.correct_answer}</span>
                  </div>
                  <div className="item__answer">
                    Your Answer:<span> {selected[index]}</span>
                  </div>
                  <p
                    className={`${
                      isCorrectAnswer(index)
                        ? 'correct-question'
                        : 'incorrect-question'
                    }`}
                  >
                    {isCorrectAnswer(index) ? 'Correct!' : 'Incorrect! '}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Popup>
      )}
    </>
  );
}

export default ShowResult;
