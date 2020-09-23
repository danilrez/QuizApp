import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestins = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `http://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((qustion: Question) => ({
    ...qustion,
    answer: shuffleArray([
      ...qustion.incorrect_answers,
      qustion.correct_answer,
    ]),
  }));
};
