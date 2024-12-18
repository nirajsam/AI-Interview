// Import necessary modules and components
"use client";
import React, { useState, useEffect } from 'react';
import './page.css'; // Ensure this file is created and styled as per BEM
import StartButton from '@/components/startPage/StartButton';
import SpeechToTextComponent from '@/components/speechAndText/speechToText';
import TextToSpeechComponent from '@/components/speechAndText/textToSpeech';
import { getAiQuestions } from '@/utils/getAiQuestions';
import useQAStore from '@/statemaagement/quesAnsDataSore';

interface Question {
  question: string;
}

interface QuestData {
  data: Array<{
    questions: Question[];
  }>;
}

// Define the Home component
const Home: React.FC = () => {
  const { qaList, addQA, currentQuestionIndex, setCurrentQuestionIndex } = useQAStore();
  const [quesData, setQuesData] = useState<any>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const fetchQuestionsFromAI = async () => {
    try {
      setLoading(true);
      const quesdat: any = await getAiQuestions();
      console.log(quesdat);
      setQuesData(quesdat);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsFromAI();
  }, []);

  if (loading) {
    return (
      <div className="home-page">
        <h1 className="home-page__loading">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h1 className="home-page__title">Prepare Your Interview</h1>
      {/* Uncomment the StartButton component if needed */}
      {/* <StartButton /> */}
      <div className='home-page__speechcomponent'>
        <TextToSpeechComponent
          quest={quesData}
          currentQuestionAnswerList={qaList}
          addTOCurrentQA={addQA}
          setCurQuesIndex={setCurrentQuestionIndex}
        />
        <SpeechToTextComponent
          quest={quesData}
          currentQuestionAnswerList={qaList}
          addTOCurrentQA={addQA}
          currQuesIndex={currentQuestionIndex}
        />
      </div>
    </div>
  );
};

export default Home;
