import React from 'react';
//types
import { AnswerObject } from '../App';
//styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: any,
    questionNumber: number,
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNumber,
    totalQuestions
}) => (
    <Wrapper>
    <p className="number">
        Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}/>
    <div>
        {answers.map(answer => (
            <ButtonWrapper 
                correct={userAnswer?.correctAnswer === answer}
                userClicked = {userAnswer?.answer === answer}
                key={answer}
                >
                <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }} /></button>  
            </ButtonWrapper>
        ))}
    </div>
    </Wrapper>
    )

export default QuestionCard;