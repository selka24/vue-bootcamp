export type TStatus =
  | "NotStarted"
  | "BeingRead"
  | "Answering"
  | "TimesUp"
  | "ShowingAnswer"
  | "Finished";

export interface Question {
  id: number;
  content: string;
  active: boolean;
}

export interface ActiveQuestion {
  id: number;
  status: TStatus;
  question: number;
  begin_at: Date;
  quiz_id: string;
  time_limit_seconds: number;
}
