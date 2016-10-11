import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routes from './app.routing';
import settings from './app.settings';
import runtime from './app.runtime';

import networkAddress from './app.constants';
import NetworkService from './network/network.service';

import WelcomeDirective from './welcome/welcome.directive';
import ChatDirective from './chat/chat.directive';

import '../style/app.scss';

angular
    .module('fs-chat', [
        uiRouter
    ])
    /**
     * Config Block
     */
    .config(routes)
    .config(settings)
    .run(runtime)

    /**
     * Services block
     */
    .constant('socketAddress', networkAddress)
    .service('network', NetworkService)

    /**
     * Components
     */
    .directive('welcome', () => new WelcomeDirective())
    .directive('chat', () => new ChatDirective());
    


