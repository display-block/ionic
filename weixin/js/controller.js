/**
 * Created by kim on 2017/5/18.
 */
angular.module('wechat.controllers', [])
    .controller('messageCtrl', function ($scope, $state, $ionicPopup, $http) {
        $scope.popup = {
            isPopup: false,
            index: 0
        };
        $scope.onSwipeLeft = function () { //向右滑动跳转到friends.html页面
            $state.go("friends")
        };
        $scope.popupMessageOpthins = function (data) { //长按500毫秒
            $scope.popup.index = $scope.datas.indexOf(data); //获取到当前索引
            $scope.popup.optionsPopup = $ionicPopup.show({//弹出一个Append.html的窗口
                templateUrl: "templates/popup.html",
                scope: $scope
            });
            $scope.popup.isPopup = true;

        };
        $scope.markMessage = function () {  //这是标记未已读/未读的function
            var index = $scope.popup.index;
            var data = $scope.datas[index];
            if (data.showHints) {
                data.showHints = false;
                data.noReadMessage = 0;
            }
            else {
                data.showHints = true;
                data.noReadMessage = 1;
            }
            $scope.popup.optionsPopup.close(); //当点击的事件之后就自动的关闭Append.html页面
            $scope.popup.isPopup = false;
        };
        $scope.deleteMessage = function () {  //这是删除聊天的事件
            var index = $scope.popup.index;
            var data = $scope.datas[index];
            $scope.datas.splice(index, 1);
            $scope.popup.optionsPopup.close();
            $scope.popup.isPopup = false;

        };
        $scope.topMessage = function(){ //这是置顶聊天的事件
            var index = $scope.popup.index;
            var data = $scope.datas[index];
            if(data.isTop){
                data.isTop = 0;
            }else{
                data.isTop =new Date().getTime();
            }
            $scope.popup.optionsPopup.close();
            $scope.popup.isPopup = false;
        };



        $http.get("json/item.json")  //获取json数据
            .success(function (datas) {
                $scope.datas = datas;
            });
        $scope.doRefresh = function () {
            $http.get("json/items.json")
                .success(function (newItems) {
                    $scope.datas = newItems;
                    //.concat($scope.data) 刷新不会去掉之前的
                    console.log($scope.datas);
                })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.remove = function(data) {
            $scope.datas.splice($scope.datas.indexOf(data),1);
        };
    })
    .controller('friendsCtrl', function ($scope, $state,$ionicModal) {

        $scope.onSwipeLeft = function () {
            $state.go("find")
        };
        $scope.onSwipeRight = function () {
            $state.go("message")
        };
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
    })
    .controller('findCtrl', function ($scope, $state) {
        $scope.onSwipeLeft = function () {
            $state.go("setting")
        };
        $scope.onSwipeRight = function () {
            $state.go("friends")
        };
    })
    .controller('settingCtrl', function ($scope, $state) {
        $scope.onSwipeRight = function () {
            $state.go("find")
        };
    })
