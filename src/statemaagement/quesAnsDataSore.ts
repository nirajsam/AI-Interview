// Import necessary modules
import { create } from 'zustand';
import React from 'react';

// Define the structure of a question and answer object
interface QA {
  question: string;
  answer: string;
}

// Define the structure of the store's state
interface QAStore {
  qaList: QA[];
  currentQuestionIndex: number;
  addQA: (qa: QA) => void;
  setCurrentQuestionIndex: (index: number) => void;
}

// Create a Zustand store with TypeScript typing
const useQAStore = create<QAStore>((set) => ({
  qaList: [],
  currentQuestionIndex: 0,
  addQA: (qa) => set((state) => ({ qaList: [...state.qaList, qa] })),
  setCurrentQuestionIndex: (index) => set(() => ({ currentQuestionIndex: index })),
}));

export default useQAStore;
