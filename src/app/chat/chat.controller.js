export default class ChatController {
    constructor($scope, $state, network) {
        this.state = $state;
        this.scope = $scope;
        this.network = network;
        this.messages = [];

        this.scope.$on('$messageReceived', () => {
            this.messages = this.network.getMessages();
            this.scope.$digest();
        });
        
    }

    goBack() {
        this.state.go('welcome', {error: 'Something went wrong'});
    }

}

ChatController.$inject = ['$scope', '$state','network'];