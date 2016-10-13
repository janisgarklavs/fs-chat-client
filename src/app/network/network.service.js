export default class NetworkService {
    constructor($rootScope, $q, $timeout, socketAddress) {
        this.connectionUrl = socketAddress.url + ':' + socketAddress.port;
        this.rootScope = $rootScope;
        this.timeout = $timeout;
        this.q = $q;

        this.connection = null;
        this.messages = [];
        this.user = null;
        this.isConnected = false;
        this.defer = null;
        
    }

    connect(user) {
        this.user = user;
        this.defer = this.q.defer();

        this.connection = new WebSocket(this.connectionUrl);

        this.connection.onmessage = this.onReceiveMessage.bind(this);
        this.connection.onopen = this.onOpenConnection.bind(this);
        this.connection.onclose = this.onCloseConnection.bind(this);
        this.connection.onerror = this.onConnectionError.bind(this);

        return this.defer.promise;
    }

    sendMessage(message) {
        this.connection.send(JSON.stringify({command: 'message', text: message}));
    }

    getMessages() {
        return this.messages;
    }

    disconnect() {
        this.defer = this.q.defer();
        this.connection.close();
        return this.defer.promise;
    }

    onOpenConnection() {
        this.isConnected = true;
        this.connection.send(JSON.stringify({command: 'connect', name: this.user}));
        this.timeout(() => {
            if (this.defer) {
                this.connection.close();
                this.defer.reject('Could not connect for 3 seconds.');
                this.defer = null;
            }
        } , 3000);
    }

    onCloseConnection(data) {
        this.isConnected = false;
        this.rootScope.$broadcast('$disconnected', data.reason);
        if (this.defer) {
            this.defer.reject(data.reason);
            this.defer = null;
        }
    }

    onReceiveMessage(message) {
        this.messages.push(JSON.parse(message.data));
        
        if(this.defer) {
            this.defer.resolve();
            this.defer = null;
        }
        this.timeout(() => {
            this.rootScope.$broadcast('$messageReceived');
        }, 50);

    }
    
    onConnectionError() {
        if (this.defer) {
            this.defer.reject('Server unavailable.');
            this.defer = null;
        }
    }

    cannot() {}

    cleanup() {
        this.connection = null;
        this.messages = [];
        this.user = null;
    }

}

NetworkService.$inject = ['$rootScope', '$q', '$timeout', 'socketAddress'];