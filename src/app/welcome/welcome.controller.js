export default class WelcomeController {
    constructor($state, $timeout, network) {
        this.network = network;
        this.state = $state;
        this.isConnecting = false;
        this.timeout = $timeout;
        this.nickname = '';
        this.errors = '';
        if (this.state.params.error) {
            this.errors = $state.params.error;
        }

    }
    connect() {
        if (!this.nickname) {
            return;
        }
        this.isConnecting = true;
        this.network.connect(this.nickname).then(() => {
            this.isConnecting = false;
            this.state.go('chat');
        }, (error) => {
            this.timeout(() => {
                this.isConnecting = false;
            }, 5000);
            this.nickname = '';
            this.errors = error;
        });
    }

    onKeyPress(event) {
        if(event.keyCode === 13) {
            this.connect();
        }
    }
}

WelcomeController.$inject = ['$state', '$timeout', 'network'];