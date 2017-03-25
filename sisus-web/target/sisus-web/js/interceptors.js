'use strict';

/*
 * 
 * 
 */

angular.module('myApp.Interceptor', [])

    .config(
        ['$httpProvider',
            function ($httpProvider) {
                /*
                 * Esse interceptor foi definido de forma anonima
                 */
                $httpProvider.interceptors.push(function ($q, $log) {

                    return {

                        'request': function (config) {
                            $log.info(config);
                            return config;
                        },

                        'requestError': function (rejection) {

                            $log.info(rejection);

                            if (error.status === 401) {
                                $rootScope.$broadcast('unauthorized', error);
                                $location.path('/login');
                                return $q.reject(rejection);
                            }

                            //
                            // return responseOrNewPromise;
                            // }
                            //
                            // return $q.reject(rejection);
                        },

                        'response': function (response) {
                            $log.info(response);

                            return response || $q.when(response);
                        },

                        'responseError': function (rejection) {
                            // do something on error
                            // if (canRecover(rejection)) {
                            // return responseOrNewPromise
                            // }
                            // return $q.reject(rejection);

                            $log.info(rejection);

                            return $q.reject(rejection);
                        }

                    };

                })

            }]);
