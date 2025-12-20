export type Condition = "under" | "over";

export type GameStatus = "win" | "lose";

export type GameHistoryItem = {
  time: string;
  condition: Condition;
  threshold: number;
  result: number;
  status: GameStatus;
};
