(function() {
    'use strict';

    iStreamApp.directive('isRoll', isRoll);

    function isRoll($sce) {
        var templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL('../html/is-roll.template.html'));
        return {
            templateUrl: templateUrl,
            controller: isRollController,
            restrict: 'E'
        };
    }

    function isRollController ($scope, chatService) {
        angular.extend($scope, {
            keyword: "主播真帅",
            number:1,
            btnText: "开始",
            roll: roll,
            lockInput: false,
            candiList: []
        });

        $scope.$on('newRollMsg', function (ev, data) {
            $scope.candiList.push(data);
            $scope.$apply();
        });

        function roll () {
            if ($scope.btnText === "开始") {
                chatService.startRoll($scope.keyword);
                $scope.lockInput = true;
                $scope.btnText = "停!";
            } else if ($scope.btnText === "停!") {
                chatService.stopRoll();
                // roll logic here
                var num = 0;
                var temp = [];
                if ($scope.number>$scope.candiList.length) {
                    for (var i = 0; i < $scope.candiList.length; i++) {
                        $scope.candiList[i].lucky = true;
                    };
                } else {
                    while (num < $scope.number) {
                        var randomIdx = Math.floor(Math.random()*$scope.candiList.length);
                        var duplicate = false;
                        for (var i = 0; i < temp.length && !duplicate; i++) {
                            duplicate = temp[i].sender === $scope.candiList[randomIdx].sender;
                        }
                        if (!duplicate) {
                            $scope.candiList[randomIdx].lucky = true;
                            temp.push($scope.candiList[randomIdx]);
                            num++;
                        };
                    }
                }
                $scope.btnText = "重置";
            } else {
                $scope.candiList = [];
                $scope.lockInput = false;
                $scope.btnText = "开始";
            }
        }
    }
})();