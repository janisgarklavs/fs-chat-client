import welcomeTemplate from './welcome.html';
import WelcomeController from './welcome.controller';

export default class WelcomeDirective {
    constructor() {
        this.template = welcomeTemplate;
        this.restrict = 'E';
        this.scope = {};

        this.controller = WelcomeController;
        this.controllerAs = 'welcome';
        this.bindToController = true; 
    }
}