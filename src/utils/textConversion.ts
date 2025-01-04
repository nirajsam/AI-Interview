function textConversion(inputText: string): string {
    const conversions: { [key: string]: string } = {
      'next line': '\n',
      'comma': ',',
      'full stop': '.',
      'period': '.',
      'question mark': '?',
      'exclamation mark': '!',
      'semicolon': ';',
      'colon': ':',
      'start bracket': '(',
      'end bracket': ')',
      'open bracket': '(',
      'close bracket': ')',
    };
  
    // Use a regular expression to replace all occurrences of the phrases
    const regex = new RegExp(Object.keys(conversions).join('|'), 'gi');
  
    return inputText.replace(regex, (matched) => conversions[matched.toLowerCase()]);
  }

  export default textConversion