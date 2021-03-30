import React, {useState} from 'react';
import { fetchQuizQuestions } from './api';
//Components
import QuestionCard from './components/QuestionCard';
//Types
import { QuestionState, Difficulty } from './api';
//Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

function App() {

  const TOTAL_QUESTIONS = 15;

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.HARD))
  console.log(questions);
  
  const startTrivia = async () => {

    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.HARD)

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if(!gameOver) {

      //get user's answer
      const answer = e.currentTarget.value;
      //check user's answer against correct answer
      const correct = questions[number].correct_answer === answer;

      if(correct) {
        setScore(prev => prev + 1 );
      }

      //save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct, 
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers((prev) => [...prev, answerObject]); 
    }
  }

  const nextQuestion = () => {

    //move on to the next question if not the last

    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return ( 
    <>
    <GlobalStyle />
    <Wrapper className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start"
        onClick={startTrivia}
        >START
        </button>
      ) : null }
      
      {!gameOver ? <p>SCORE: {score} </p> : null}
      
      {loading && <p>Loading Questions... </p>}

      {!loading && !gameOver && ( <QuestionCard 
         questionNumber={number+1}
         totalQuestions = {TOTAL_QUESTIONS}
         question={questions[number].question}
         answers={questions[number].answers}
         userAnswer={userAnswers ? userAnswers[number] : undefined}
         callback={checkAnswer}
          /> )}

      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next"
        onClick={nextQuestion}
        >Next Question
        </button>
      ) : null }
    </Wrapper>
    </>
    );
}

export default App;
