import {Message} from './Message';

export interface ChatState {
  loading: boolean;
  errorStatus: string;
  messages: Message[];
}
