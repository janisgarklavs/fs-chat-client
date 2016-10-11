export default class WelcomeController {
    constructor($state, network) {
        this.network = network;
        this.state = $state;

        this.nickname = '';
        this.errors = '';
        if (this.state.params.error) {
            this.errors = $state.params.error;
        }

    }
    connect() {
        this.network.connect(this.nickname).then(() => {
            this.state.go('chat');
        });
    }
}

WelcomeController.$inject = ['$state', 'network'];