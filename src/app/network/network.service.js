export default class NetworkService {
    constructor($rootScope, $q, $timeout, socketAddress) {
        this.connectionUrl = socketAddress.url + ':' + socketAddress.port;
        this.rootScope = $rootScope;
        this.timeout = $timeout;

        this.connection = null;
        this.messages = [];
        this.user = null;
        this.isConnected = false;
        this.defer = $q.defer();
    }

    getMessages() {
        return this.messages;
    }

    connect(user) {
        this.user = user;

        this.connection = new WebSocket(this.connectionUrl);
        this.connection.onmessage = this.receiveMessage.bind(this);
        this.connection.onopen = this.openConnection.bind(this);
        return this.defer.promise;
    }

    receiveMessage(message) {
        this.messages.push(message.data);
        this.rootScope.$broadcast('$messageReceived');
    }

    sendMessage() {

    }

    openConnection(event) {

        this.isConnected = true;
        this.connection.send(JSON.stringify({command: 'connect', name: this.user}));
        this.defer.resolve();
        
    }

}

NetworkService.$inject = ['$rootScope', '$q', '$timeout', 'socketAddress'];