



    angular.module('wechat.routes',[])
        .config(function($stateProvider,$urlRouterProvider) {
            $urlRouterProvider.otherwise('message');
            $stateProvider
                .state('message', {
                    url: '/message',
                    views: {
                        index: {templateUrl: 'templates/message.html',
                        controller:"messageCtrl"
                        },
                        //side:{templateUrl:'side.html'}
                    }
                })
                .state('friends', {
                    url: '/friends',
                    views: {
                        person: {templateUrl: 'templates/friends.html',
                        controller:"friendsCtrl"
                        },
                        //side:{templateUrl:'side1.html'}
                    }
                })
                .state('find', {
                    url: '/find',
                    views: {
                        find: {templateUrl: 'templates/find.html',
                        controller:"findCtrl"
                        },
                        //side:{templateUrl:'side2.html'}
                    }
                })
                .state('setting', {
                    url: '/setting',
                    views: {
                        mine: {templateUrl: 'templates/setting.html',
                        controller:"settingCtrl"
                        },
                        //side:{templateUrl:'side3.html'}
                    }
                });


        });
