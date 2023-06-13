export type ChatMessage = {
  message: string;
  from: string;
  to?: string;
};

export type Chat = {
  messages: ChatMessage[];
};
