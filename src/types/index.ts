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
