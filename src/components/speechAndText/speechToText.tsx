"use client";

import React, { use, useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getFeedBackFromAI } from '@/utils/getFeedBackFromAI';
import Feedback from '../feedback/feedback';
import './speechToText.css';
import useQAStore from '@/statemaagement/quesAnsDataSore';
import textConversion from '@/utils/textConversion';

// Define the structure of the props using TypeScript interfaces
interface Question {
  question: string;
}

interface QuestData {
  data: Array<{
    questions: Question[];
  }>;
}

interface SpeechToTextProps {
  quest: QuestData;
  currentQuestionAnswerList: {
    question: string;
    answer: string;
  }[];
  addTOCurrentQA: (qa: { question: string; answer: string }) => void;
  currQuesIndex: number;
}

const SpeechToTextComponent: React.FC<SpeechToTextProps> = ({ quest, currentQuestionAnswerList, addTOCurrentQA, currQuesIndex }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const {setCurrentQuestionIndex,intervieweeDetails } = useQAStore();
  const [isClient, setIsClient] = useState(false);
  const [text, setText] = useState('');
  const [feedbackData, setFeedbackData] = useState<String>('');
  const [feedbackDataLoading, setFeedbackDataLoading] = useState<String>('');
  

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTextReset = () => {
    resetTranscript();
    setText('');
  };
  
  useEffect(() => {
    if (transcript) {
      const updatedText = textConversion(transcript);
      setText(updatedText);
    }
  }, [transcript]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <span>Loading...</span>;
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const handleAddAnswerTOCurrentQA = (data: string) => {
    const currentQuestion = quest?.data[0]?.questions[currQuesIndex]?.question;
    if (currentQuestion) {
      // Check if the current question exists in the currentQuestionAnswerList
      const existingQA = currentQuestionAnswerList.find((qa: { question: string; }) => qa.question === currentQuestion);
      if (existingQA) {
        // Update the existing answer
        existingQA.answer = data;
      } else {
        // Add a new entry if it doesn't exist
        addTOCurrentQA({
          question: currentQuestion,
          answer: data
        });
      }
    }
    handleTextReset();
  };
  const getYourFeedBack = async() => {
    setFeedbackDataLoading('loading feedback...')
    const feedBack = await getFeedBackFromAI(JSON.stringify(currentQuestionAnswerList), intervieweeDetails.token)
    setFeedbackData(feedBack)
    setCurrentQuestionIndex(404)
    setFeedbackDataLoading('feedback loaded')
  }
  if(feedbackData && feedbackDataLoading =='feedback loaded'){
    console.log(feedbackData)
    return <Feedback feedBackData={feedbackData}/>
  }
  
  return (
    <div className="speech-to-text">
      <p className="speech-to-text__status">Microphone: {listening ? 'on' : 'off'}</p>
      {listening && <p className="speech-to-text__listening">Listening...</p>}
      <div className='speech-to-text__group-button'>
      <button className="speech-to-text__button" onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button className="speech-to-text__button" onClick={SpeechRecognition.stopListening}>Stop</button>
      <button className="speech-to-text__button" onClick={handleTextReset}>Reset</button>
      </div>
      <br />
      <textarea
        className="speech-to-text__textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your answer here or speak directly into the microphone and then you can edit here if required"
        rows={5}
        cols={50}
      />
      <div className='speech-to-text__group-button'>
      <button className="speech-to-text__button" onClick={() => handleAddAnswerTOCurrentQA(text)}>Add Response</button>
      <button className="speech-to-text__button" onClick={() => getYourFeedBack()} disabled={currQuesIndex<quest?.data[0]?.questions.length-2}>Get Feedback</button>
      </div>
      <div>{feedbackDataLoading==='loading feedback...'?feedbackDataLoading:''}</div>
    </div>
  );
};

export default SpeechToTextComponent;
