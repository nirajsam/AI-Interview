function ExtractQuestions(obj: any): string[] {
  const questions: string[] = [];

  function traverse(current: any): void {
    if (Array.isArray(current)) {
      current.forEach(traverse); // If it's an array, iterate through each element
    } else if (typeof current === 'object' && current !== null) {
      Object.entries(current).forEach(([key, value]) => {
        if (/^question\d*$/.test(key) && typeof value === 'string') {
          questions.push(value); // Add value if key is "question"
        } else {
          traverse(value); // Recur for nested objects or arrays
        }
      });
    }
  }

  traverse(obj);
  return questions;
}

export default ExtractQuestions;
