import { Composer } from 'grammy';
import texts from './text.event';
import callbacks from './callback.event';

const composer = new Composer();

composer.use(texts);
composer.use(callbacks);

export default composer;
