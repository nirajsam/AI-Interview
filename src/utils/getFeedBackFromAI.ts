import { generateData } from './gemini';

const mockResponse = `[
    {
        "question": "Explain the difference between a controlled and uncontrolled component in React.",
        "answer": "Controlled Component:\n\nA controlled component is one where React controls the form elements' values via state.\nThe component relies on React's state to dictate its behavior.\nExample:\njsx\nCopy code\nimport React, { useState } from 'react';\n\nfunction ControlledComponent() {\n  const [value, setValue] = useState('');\n  return (\n    <input\n      type=\"text\"\n      value={value}\n      onChange={(e) => setValue(e.target.value)}\n    />\n  );\n}\nHere, the input value is synced with state (controlled by React).\nUncontrolled Component:\n\nAn uncontrolled component maintains its own internal state via the DOM. React does not track changes to it directly.\nExample:\njsx\nCopy code\nimport React, { useRef } from 'react';\n\nfunction UncontrolledComponent() {\n  const inputRef = useRef(null);\n  const handleSubmit = () => {\n    console.log(inputRef.current.value);\n  };\n  return (\n    <input type=\"text\" ref={inputRef} />\n    <button onClick={handleSubmit}>Submit</button>\n  );\n}"
    },
    {
        "question": "Describe your experience with React's state management solutions (e.g., Context API, Redux, Zustand, Recoil).  Which have you used and why?",
        "answer": "Context API: I have used Context API for smaller projects where prop drilling was a problem. It is a built-in solution to share state without introducing external libraries.\nExample: Sharing theme or authentication data globally.\n\njsx\nCopy code\nconst ThemeContext = React.createContext();  \nexport const App = () => {\n  return (\n    <ThemeContext.Provider value={{ color: \"dark\" }}>\n      <Child />\n    </ThemeContext.Provider>\n  );\n};\nRedux: I used Redux for larger applications requiring global state management, where the state needed to be predictable and debuggable. For example, managing a shopping cart state across different components.\nWhy: Redux’s DevTools and middleware support (like redux-thunk or redux-saga) make it ideal for scalable apps.\n\nZustand: I have explored Zustand as a lightweight alternative to Redux. It works well for small to medium-sized apps without boilerplate.\nWhy: Minimal configuration, better performance, and easier syntax.\n\njsx\nCopy code\nimport create from 'zustand';\nconst useStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));\nRecoil: Recoil is beneficial for applications with complex state dependencies where atoms and selectors simplify the state structure.\n\nPreference: I choose the solution based on project size and complexity:\n\nContext API for small-scale projects,\nRedux or Zustand for medium to large apps, and\nRecoil for managing complex state relations."
    },
    {
        "question": "How do you optimize React application performance? Give specific examples.",
        "answer": "Using React.memo and PureComponent:\n\nPrevents unnecessary re-renders for functional and class components.\njsx\nCopy code\nconst MyComponent = React.memo(({ value }) => <div>{value}</div>);\nuseCallback and useMemo:\n\nuseCallback: Memoizes callback functions.\nuseMemo: Memoizes the result of expensive computations.\njsx\nCopy code\nconst expensiveResult = useMemo(() => computeExpensive(value), [value]);\nLazy Loading and Code Splitting:\n\nLoad components only when necessary using React.lazy and Suspense.\njsx\nCopy code\nconst LazyComponent = React.lazy(() => import(\"./LazyComponent\"));\nOptimizing Lists with Keys and Virtualization:\n\nUse key props in lists efficiently to avoid DOM diffing issues.\nFor large lists, libraries like react-window or react-virtualized render only visible rows.\nDebouncing Input Handlers"
    },
    {
        "question": "Explain the concept of virtual DOM and its role in React's efficiency.",
        "answer": "The Virtual DOM is a lightweight, in-memory representation of the actual DOM (Real DOM).\nInstead of updating the Real DOM directly, React:\nCreates a Virtual DOM whenever a component’s state changes.\nCompares the updated Virtual DOM with the previous version using a process called Reconciliation.\nCalculates the minimum set of changes (diffing algorithm).\nUpdates only the necessary parts of the Real DOM.\nWhy is it Efficient?\n\nDirect Real DOM manipulations are slow because the browser recalculates styles, layouts, and re-renders. React batches and minimizes these updates through the Virtual DOM."
    },
    {
        "question": "Describe your experience with React hooks (useState, useEffect, useContext, etc.).  Give examples of how you've used them to solve complex problems.",
        "answer": "useState:\n\nManages local component state.\nExample: A counter app.\njsx\nCopy code\nconst [count, setCount] = useState(0);\nuseEffect:\n\nHandles side effects, like API calls or DOM manipulations.\nExample: Fetching data on component mount.\njsx\nCopy code\nuseEffect(() => {\n  fetchData();\n}, []);\nuseContext:\n\nSimplifies state sharing without prop drilling.\nExample: Sharing authentication state across the app.\njsx\nCopy code\nconst auth = useContext(AuthContext);\nuseCallback and useMemo:\n\nOptimize performance by memoizing functions and values.\nExample: Memoizing an event handler passed as a prop.\njsx\nCopy code\nconst handleClick = useCallback(() => doSomething(), []);\nuseRef:\n\nAccesses DOM elements and persists values across renders without causing re-renders.\nExample: Input focus or storing previous state.\njsx\nCopy code\nconst inputRef = useRef();\ninputRef.current.focus();\nCustom Hooks:\n\nI’ve created custom hooks to abstract logic, like handling API calls:\njsx\nCopy code\nconst useFetch = (url) => {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url).then((res) => res.json()).then(setData);\n  }, [url]);\n  return data;\n};\n"
    }
]`
const getFeedBackFromAI = async (interviewResponseJSON: string = "", token: string): Promise<String> => {
// suppose you are interviewer , interviewing candidate with skill {React} having experience of {5 years}, so now provide questions related to to these skill in just json format nothing else and also consider you need to complete this interview withing an hour
  const AiInput = `check this interview response and give me feedback in proper format ${interviewResponseJSON}, also tell me how much marks this candidate will get in this interview out of 10, keep it short and meaningful`;
  const AIOutput = await generateData(AiInput, token);
  if (AIOutput === undefined) {
    console.error("Failed to generate data");
    return 'failed to get feedback from AI';
  }
  

  return `${AIOutput}`;
};

export { getFeedBackFromAI };
