export type ChatCompletionMessageRole = "system" | "user" | "assistant";

export interface ChatCompletionMessage {
  role: ChatCompletionMessageRole;
  content: string;
}

export type ChatCompletionRequestMessage = ChatCompletionMessage;