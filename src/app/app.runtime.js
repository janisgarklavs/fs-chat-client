export default function runtime($rootScope, $state, network) {
    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if (toState.name === 'chat' && !network.isConnected) {
            event.preventDefault();
            $state.go('welcome');
        }
    });
}

runtime.$inject = ['$rootScope', '$state', 'network'];