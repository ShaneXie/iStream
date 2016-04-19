(function() {
    'use strict';

    iStreamApp.directive('main', main);

    function main($sce) {
        var templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('../html/main.template.html'));
        return {
            templateUrl: templateUrl,
            restrict: 'E'
        };
    }
})();