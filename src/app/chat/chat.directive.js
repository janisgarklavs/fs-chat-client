import chatTemplate from './chat.html';
import ChatController from './chat.controller';

export default class ChatDirective {
    constructor() {
        this.template = chatTemplate;
        this.restrict = 'E';
        this.scope = {};

        this.controller = ChatController;
        this.controllerAs = 'chat';
        this.bindToController = true; 
    }
}