export default class ChatController {
    constructor($scope, $state, network) {
        this.state = $state;
        this.scope = $scope;
        this.network = network;

        this.messages = [];
        this.message = '';

        this.scope.$on('$messageReceived', () => {
            this.messages = this.network.getMessages();
            this.scope.$digest();
        });

        this.scope.$on('$disconnected', (scope, reason) => {
            this.state.go('welcome', {error: reason});
        });

        this.scope.$on('$destroy', () => {
            this.network.cleanup();
        });  
    }

    onKeyPress(event) {
        if(event.keyCode === 13) {
            this.sendMessage();
        }
    }

    sendMessage() {
        if (this.message === '') {
            return;
        }
        this.network.sendMessage(this.message);
        this.message = '';
    }

    disconnect() {
        this.network.disconnect().then(() => {
            this.state.go('welcome');
        });
    }

}

ChatController.$inject = ['$scope', '$state','network'];