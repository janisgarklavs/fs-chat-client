export default function ScrollDirective($timeout) {
    return {
        restrict: 'A',
        link: (scope, element, attr) => {
            scope.$watchCollection(attr.scroll, () => {
                $timeout(() => {    
                    element[0].scrollTop = element[0].scrollHeight;
                });
            }); 
        }
    };
}

ScrollDirective.$inject = ['$timeout'];