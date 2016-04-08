(function() {
    'use strict';

    chrome.runtime.sendMessage({action: "showIcon"}, function(response) {});

    $(function() {
		console.info("iStream is runing!");
		initComponent.then(function () {
			angular.module('iStreamApp', ['ngMaterial', 'ngMessages'])
				.controller('triggerCtrl', function($scope, $mdDialog) {
					$scope.openApp = function() {
						console.info("in function");
						$mdDialog.show(
							$mdDialog.alert()
							.clickOutsideToClose(true)
							.title('Opening from the left')
							.textContent('Closing to the right!')
							.ariaLabel('Left to right demo')
							.ok('Nice!')
						);
					};
				});
			angular.bootstrap(document.getElementById("modal"), ['iStreamApp']);
		});
	});

	var initComponent = new Promise (
		function (resolve, reject) {
			// load modal template
			var modal = '<div id="modalWrap" style="display:none;"></div>';
			var modalURL = chrome.extension.getURL('../html/modal.html');
			$("body").append(modal);

			$( "#modalWrap" ).load( modalURL, function () {
				// inject trigger button
				var trigger = '<li class="fl bdtv-trigger">'+
            	'<a href="#modal" rel="modal:open">iStream</a></li>';

	            var currentUrl = window.location.href;
	            var currentDomain = currentUrl.split('/')[2];

	            if (currentDomain === "www.douyu.com") {
	            	// load douyu trigger
	                if ($(".header_nav").length) 
						$(".header_nav").append(trigger);
					else 
						$(".head-nav").append(trigger);
					resolve("Component initialized");
	            } else {
	            	reject("fail to inject trigger button");
	            }
			} );
		}
	); 

    
})();