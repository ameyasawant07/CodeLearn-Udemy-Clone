import { pythonQuestions } from './data/python';
import { javascriptQuestions } from './data/javascript';
import { javaQuestions } from './data/java';
import { cppQuestions } from './data/cpp';
import { reactQuestions } from './data/react';
import { sqlQuestions } from './data/sql';
import { nodejsQuestions } from './data/nodejs';
import { flutterQuestions } from './data/flutter';

export const mockQuestions: Record<string, { id: number; question: string; options: string[]; correct: number }[]> = {
    python: pythonQuestions,
    javascript: javascriptQuestions,
    java: javaQuestions,
    cpp: cppQuestions,
    react: reactQuestions,
    sql: sqlQuestions,
    nodejs: nodejsQuestions,
    flutter: flutterQuestions
};
