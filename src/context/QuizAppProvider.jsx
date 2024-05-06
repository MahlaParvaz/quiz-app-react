import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizContext = createContext();
const BASE_URL =
  'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple';

export function QuizAppProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selected, setSelected] = useState(
    Array.from({ length: 10 }, () => [])
  );
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();
  const getQuestions = async () => {
    try {
      const { data } = await axios.get(BASE_URL);
      setQuestions(data.results);
    } catch (error) {
      toast.error(error.message);
    }
  };

  function setAnswers() {
    setAnswer([activeQuestion]);
  }

  useEffect(() => {
    if (quizStarted && questions.length > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setActiveQuestion((prevQuestion) => prevQuestion + 1);

            return 10;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [quizStarted, questions.length]);

  const handleStart = () => {
    setQuizStarted(true);
  };
  const handleNextBtn = () => {
    if (selected[activeQuestion].length === 0) {
      toast.error('Please select one option!');
      return;
    }

    setActiveQuestion((prevActionQuestion) => prevActionQuestion + 1);
    setTimer(10);
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
    setActiveQuestion(0); 
    setQuizStarted(false); 
    navigate('/');
  };
  const isCorrectAnswer = (questionIndex) => {
    const correctAnswer = questions[questionIndex].correct_answer;
    return selected[questionIndex] === correctAnswer;
  };
  return (
    <QuizContext.Provider
      value={{
        getQuestions,
        setAnswers,
        handleStart,
        handleNextBtn,
        handlePrevBtn,
        handleAnswerSelect,
        handleSubmit,
        handleReset,
        isCorrectAnswer,
        quizStarted,
        timer,
        questions,
        activeQuestion,
        selected,
        submit,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizapp() {
  return useContext(QuizContext);
}
