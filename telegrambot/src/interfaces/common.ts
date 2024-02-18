import { type Context } from 'grammy';
import {
  type Conversation,
} from '@grammyjs/conversations';

export type MyContext = Context & any;
export type MyConversation = Conversation<any>;
