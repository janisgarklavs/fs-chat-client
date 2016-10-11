export default function settings($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}

settings.$inject = ['$compileProvider'];