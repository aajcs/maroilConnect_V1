export interface chatMessageInterface {
  chatsMessages: ChatsMessageInterface[];
  totalChatsMessages: number;
}

export interface ChatsMessageInterface {
  chatIdChatMessage: string;
  userChatMessage: string;
  messageChatMessage: string;
  statusChatMessage: boolean;
  typeChatMessage: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
