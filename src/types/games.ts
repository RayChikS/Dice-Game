export type GameHistoryItem = {
  time: string;
  condition: Condition;
  threshold: number;
  result: number;
  status: GameStatus;
};
