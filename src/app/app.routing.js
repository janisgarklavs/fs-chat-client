export default function Routes($stateProvider, $urlRouterProvider) {

    let welcomeState = {
        name: 'welcome',
        url: '/',
        template: '<welcome></welcome>',
        params: {
            error: null
        }
    };
    let chatState = {
        name: 'chat',
        url: '/chat',
        template: '<chat></chat>'
    };
    $stateProvider.state(welcomeState);
    $stateProvider.state(chatState);

    $urlRouterProvider.otherwise('/');
    
}

Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
