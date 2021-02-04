import {Message} from './Message';

export interface ChatProps {
  getMessage: (id: number, text?: string) => void;
  sendMessage: (message: Message) => void;
  resetMessages: () => void;
}
