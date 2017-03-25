angular.module("starter.services", [])

    .factory('$exceptionHandler', function ($injector) {
        var VERSION = '1.0.0';
        return function (exception, cause) {
            var Error = $injector.get("Error");
            Error.handler(["Falha geral na aplicação"],exception, cause);
        }
    })//v1.0.0
    .factory('NativeInterface', function () {
        var VERSION = '1.0.0';
        var mute = false;

        function hasSupport() {
            try {
                if (window.JSInterface) {
                    return true;
                } else {
                    return false;
                }
            } catch (ignore) {
                return false;
            }
        }

        return {
            version: function() {
                return VERSION;
            },
            hasSupport: function() {
                return hasSupport();
            },
            setPreference: function (key, value) {
                //console.log("setPreference(" + key + "," + value + ")");
                try {
                    return window.JSInterface.setPreference(key, value);
                } catch (ignore) {
                    try {
                        return window.localStorage.setItem(key, value);
                    } catch (ignore) {
                    }
                }
            },
            getPreference: function (key, defaultValue) {
                var result = defaultValue;
                try {
                    result = window.JSInterface.getPreference(key, defaultValue);
                } catch (ignore) {

                    try {
                        result = window.localStorage.getItem(key);
                    } catch (ignore) {
                    }

                    if (result == null || result == "" || result == "null") {
                        result = defaultValue;
                    }
                }
                return result;
            }

        }
    })//v1.0.0
    .factory('Log', function ($log, NativeInterface) {
        var VERSION = '1.0.2';
        var data = [];
        var INFO = 'INFO';
        var DEBUG = 'DEBUG';
        var ERROR = 'ERROR';
        var WARNING = 'WARNING';

        var filter = {
            info: NativeInterface.getPreference("sipro:log.info", "true") == "true",
            error: NativeInterface.getPreference("sipro:log.error", "true") == "true",
            warning: NativeInterface.getPreference("sipro:log.warn", "true") == "true",
            debug: NativeInterface.getPreference("sipro:log.debug", "true") == "true"
        };

        return {
            version: function() {
                return VERSION;
            },
            setFilter: function (afilter) {
                filter = afilter;
                NativeInterface.setPreference("sipro:log.info", filter.info);
                NativeInterface.setPreference("sipro:log.error", filter.error);
                NativeInterface.setPreference("sipro:log.warn", filter.warning);
                NativeInterface.setPreference("sipro:log.debug", filter.debug);
            },
            getFilter: function () {
                return filter;
            },
            info: function (message) {
                var log = {type: INFO, message: message};
                data.push(log);
                if (filter.info) {
                    $log.info(log.type + ":" + log.message);
                }
            },
            error: function (message, error, cause) {
                var log = {type: ERROR, message: message, cause: cause, comment: null};
                if (error) {
                    log.error = error + '';
                    if (error && error.stack) log.stack = error.stack + '';
                }

                data.push(log);
                if (filter.error) {
                    $log.warn(log.message);
                    if (log.error) $log.error(log.error);
                } else {
                    $log.error(log.message);
                }
                return log;
            },
            debug: function (message) {
                var log = {type: DEBUG, message: message};
                data.push(log);
                if (filter.debug) {
                    $log.debug(log.type + ":" + log.message);
                }
            },
            warning: function (message) {
                var log = {type: WARNING, message: message};
                data.push(log);
                if (filter.warning) {
                    $log.warn(log.type + ":" + log.message);
                }
            },
            get: function (filter) {
                if (filter == null)
                    return data;
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];

                    if (item.type == INFO && filter.info) {
                        result.push(item);
                    } else if (item.type == ERROR && filter.error) {
                        result.push(item);
                    } else if (item.type == DEBUG && filter.debug) {
                        result.push(item);
                    } else if (item.type == WARNING && filter.warning) {
                        result.push(item);
                    }
                }
                return result;
            },
            reset: function () {
                data = [];
                return data;
            }
        }
    })//v1.0.2
    .factory('WebResource', function (Log) {
        var VERSION = '1.0.3';
        return {
            version: function() {
                return VERSION;
            },
            get: function (request, success, error) {

                var url = "./" + request;
                $.ajax({
                    type: "GET",
                    url: url,
                    cache: true,
                    timeout: TIMEOUT,
                    success: success,
                    error: error
                });
            }
        }
    })
    .factory('WebService', function (Log,Error) {
        var VERSION = '1.0.3';
        return {
            version: function() {
                return VERSION;
            },
            get: function (request, success, error) {
                try {
                    var url = request;
                    $.ajax({
                        type: "GET",
                        url: url,
                        cache: true,
                        timeout: TIMEOUT,
                        success: success,
                        error: error
                    });
                } catch (error) {
                    Error.handler("Falha ao processar requisição", error);
                }
            }
        }
    })//v1.0.3
    .factory('EndPoint', function ($timeout, $window, Log, Alert, Feedback, Error) {
        var VERSION = '1.0.4';

        Log.debug("ENDPOINT: " + ENDPOINT);
        return {
            request: function (request, data, successCallback, errorCallback, token, endPoint, silent) {
                try {
                    if (endPoint == null) endPoint = ENDPOINT;
                    if (token) endPoint += ";jsessionid=" + token;

                    if (!silent) Alert.showWarning("Processando...",DELAY,TIMEOUT);

                    function success(data) {
                        try {
                            if (!silent) Alert.hideWarning();

                            var response = null;
                            try {
                                response = JSON.parse(data);
                            } catch (error) {
                                Log.error(error);
                            }

                            if (response == null || response.code == 603) { //Usuario perdeu a sessão (timeout?)
                                Alert.showMessage("Atenção",response.message + "||Reiniciando em 5 segundos",true);
                                $timeout(function () {
                                    $window.location.reload();
                                }, 5000);
                                return;
                            }

                            if (successCallback) successCallback(data);
                        } catch (error) {
                            Error.handler("Falha ao processar requisição", error);
                        }
                    }

                    function error(xhr, status, message) {
                        if (!silent) Alert.hideWarning();
                        Log.info('Falha de conexão');
                        Feedback.reset();

                        var message = "Falha ao estabelecer conexão com o servidor";
                        var cause = null;
                        if (xhr != null && xhr.responseText) cause = xhr.responseText
                        if (cause == null && xhr != null && xhr.statusText) cause = xhr.statusText;
                        var error = Log.error("Atenção",message,cause);
                        if (errorCallback) errorCallback(error);
                    }

                    $.ajax({
                        type: "POST",
                        url: endPoint,
                        data: {request: request, data: JSON.stringify(data), token: token},
                        cache: false,
                        timeout: TIMEOUT,
                        success: success,
                        error: error
                    });

                } catch (error) {
                    Error.handler("Falha ao processar requisição", error);
                }

            }
        }
    })//v1.0.4
    .factory('Error', function ($rootScope, $injector, Log, Alert, Feedback) {
        var VERSION = '1.0.5';
        return {
            version: function() {
                return VERSION;
            },
            handler: function (message, error, cause) {
                Log.debug("handler(" + message + "," + error + "," + cause + ")");
                if (cause == null) {
                    if (error && error.cause) cause = error.cause;
                }
                var log = Log.error(message,error,cause);
                Alert.showError(log,this);
            },
            throw: function(message,error) {
                return Error(message);
            },
            showError: function (log) {
                Alert.showError(log,this);
            },
            reportError: function(error,success,fail) {
                Log.info("Reportar erro");
                function successConnect(data) {
                    try {
                        var result = JSON.parse(data);
                        if (result && result.code != 0) {
                            if (fail) fail(result.message);
                            return;
                        }
                        if (success) success(result.message);

                    } catch (error) {
                        Log.error(error);
                    }

                }
                function errorConnect(error) {
                    if (fail) fail("Falha de conexão, tente novamente mais tarde");
                }
                var token = null;
                var EndPoint = $injector.get("EndPoint");
                if ($rootScope.user && $rootScope.user.token) token = $rootScope.user.token;
                EndPoint.request('errorReport', error, successConnect, errorConnect, token,null,true);
            }
        }
    }) //v1.0.5
    .factory('Alert', function ($rootScope, $timeout, $uibModal, $templateCache, $controller, $http, Log, Feedback, Utils) {
        var VERSION = '1.0.2';

        var MODAL_ALERT = "./resources/modalalert.html";
        var MODAL_CONFIRM = "./resources/modalconfirm.html";
        var MODAL_WARNING = "./resources/modalwarning.html";
        var MODAL_INPUT = "./resources/modalinput.html";

        var windowTemplate = "template/modal/window.html";
        var fullWindowTemplate = './resources/fullwindowTemplate.html';
        var highPrior = false;

        $http.get(fullWindowTemplate, { cache: true}).success(function() {
            Log.info("fullWindowTemplate page is on cache");
        });
        $http.get(MODAL_ALERT, { cache: true}).success(function() {
            Log.info("Alert page is on cache");
        });
        $http.get(MODAL_CONFIRM, { cache: true}).success(function() {
            Log.info("Confirm page is on cache");
        });
        $http.get(MODAL_WARNING, { cache: true}).success(function() {
            Log.info("Warning page is on cache");
        });

        var modalInstance = null;
        var promise = null;
        function cancelPromise() {
            if (promise) {
                $timeout.cancel(promise);
                promise = null;
            }
        }


        return {
            version: function() {
                return VERSION;
            },
            showModal: function (template,controller,scope,keyboard,backdrop,size,resolve) {
                Log.debug("showModal(" + template + "," + controller + ")");
                var baseTemplate = windowTemplate;
                if (!size)  baseTemplate = fullWindowTemplate;

                scope.dismissDialog = function() {
                    scope.modal.dismiss();
                }
                scope.closeDialog = function() {
                    scope.modal.close();
                }

                scope.modal = $uibModal.open({
                    windowTemplateUrl: baseTemplate,
                    templateUrl: template,
                    controller: controller,
                    scope: scope,
                    keyboard: keyboard,
                    backdrop: backdrop,
                    size: size,
                    resolve: resolve
                });

                return scope.modal;
            },
            showMessage: function (title,message,force) {
                Log.debug("showMessage(" + title + "," + message + ")");
                if (highPrior) return;
                if (force && modalInstance) {
                    modalInstance.close();
                    modalInstance = null;
                }
                highPrior = force;
                if (modalInstance) return;

                var scope = $rootScope.$new(true);

                scope.title = title;
                scope.message = message.split("||");

                var modalInstance = this.showModal(MODAL_ALERT,null,scope,true,true,'lg');

                modalInstance.result.then(function () {
                    modalInstance = null;
                    if (highPrior) highPrior = false;
                }, function () {
                    modalInstance = null;
                    if (highPrior) highPrior = false;
                });

            },
            showConfirm: function (title, message, confirm, deny) {
                Log.debug("showConfirm(" + title + "," + message + ")");

                if (modalInstance) {
                    modalInstance.close();
                    modalInstance = null;
                }

                var scope = $rootScope.$new(true);

                scope.title = title;
                scope.message = message.split("||");

                var modalInstance = this.showModal(MODAL_CONFIRM,null,scope,true,true,'lg');

                modalInstance.result.then(function () {
                    Log.debug("AlertOkButton.click");
                    modalInstance = null;
                    if (confirm) confirm();
                }, function () {
                    Log.debug("AlertCancelButton.click");
                    modalInstance = null;
                    if (deny) deny();
                });

            },
            showInput: function (title, message, defaultvalue, response) {
                Log.debug("showInput(" + title + "," + message + "," + defaultvalue + ")");

                if (modalInstance) {
                    modalInstance.close();
                    modalInstance = null;
                }

                var scope = $rootScope.$new(true);

                scope.title = title;
                scope.message = message;
                scope.input = {value:defaultvalue};

                var modalInstance = this.showModal(MODAL_INPUT,null,scope,true,true,'lg');

                modalInstance.result.then(function () {
                    Log.debug("AlertOkButton.click");
                    modalInstance = null;
                    if (response) response(scope.input.value);
                }, function () {
                    Log.debug("AlertCancelButton.click");
                    modalInstance = null;
                });

            },
            showInputRequired: function (title, message, defaultvalue, response, customdialog) {
                Log.debug("showInputRequired(" + title + "," + message + "," + customdialog + ")");

                if (modalInstance) {
                    modalInstance.close();
                    modalInstance = null;
                }

                var scope = $rootScope.$new(true);

                scope.title = title;
                scope.message = message;
                scope.input = {value:defaultvalue};

                if (!customdialog) customdialog = MODAL_INPUT;

                var current = this;
                var modalInstance = this.showModal(customdialog,null,scope,true,true,'lg');

                modalInstance.result.then(function () {
                    Log.debug("AlertOkButton.click");
                    modalInstance = null;
                    if (scope.input.value == null) {
                        modalInstance = current.showModal(customdialog,null,scope,true,true,'lg');
                    }
                    if (response) response(scope.input.value);
                }, function () {
                    Log.debug("AlertCancelButton.click");
                    modalInstance = null;
                });

            },
            showWarning: function (message, delay, timeout) {
                if (modalInstance) return;
                var scope = $rootScope.$new(true);
                var alert = this;

                cancelPromise();
                promise = $timeout(function () {
                    Log.debug("showWarning.delayed(show)")
                    cancelPromise();

                    //scope.title = title;
                    scope.message = message.split("||");

                    modalInstance = alert.showModal(MODAL_WARNING,null,scope,false,'static',null);

                    if (timeout) {
                        promise = $timeout(function () {
                            Log.debug("showWarning.delayed(hide)")
                            alert.hideWarning();
                        }, timeout);
                    }
                }, delay);
            },
            showError: function (error,Error) {
                Log.debug("showError(" + error + ")");
                if (highPrior) return;
                if (modalInstance) {
                    modalInstance.close();
                    modalInstance = null;
                }
                highPrior = true;

                var scope = $rootScope.$new(true);
                scope.content = {};

                scope.content.commentMessage = null;
                scope.content.copyMe = false;
                scope.content.copyAddress = null;
                scope.title = "Atenção - Ocorreu um erro";
                scope.message = [error.message];

                scope.successMessage = null;
                scope.errorMessage = null;

                if (error && error.error) scope.cause = error.error;
                if ($rootScope.user) scope.content.copyAddress = $rootScope.user.name;
                if (error.cause || error.stack) {
                    var moreDetails = "";
                    if (error.cause) moreDetails += "causa:" + error.cause;
                    if (error.stack) moreDetails += "pilha:" + error.stack;
                    scope.moreDetails = moreDetails;
                    scope.stackButton = true;
                    scope.publishButton = true;
                    scope.commentButton = true;
                }

                scope.dismissDialog = function() {
                    modalInstance.close(true);
                    modalInstance = null;
                }
                scope.publish = function($event) {
                    Log.debug("AlertPublishableButton.click()");
                    Feedback.loading($event);

                    var comment = scope.content.commentMessage;
                    var copyMe = scope.content.copyMe;
                    var copyAddress = scope.content.copyAddress;

                    if (copyMe) {
                        if (!Utils.isEmail(copyAddress)) {
                            scope.errorMessage = "Email inválido ou não informado";
                            Feedback.reset();
                            return;
                        }
                    }
                    if (copyAddress) error.copyaddress = copyAddress;
                    if (comment) error.comment = comment;

                    Error.reportError(error, function(success){
                        Feedback.reset(false);
                        scope.successMessage = success;
                        scope.$apply();
                    },function(fail){
                        Feedback.reset();
                        scope.errorMessage = fail;
                        scope.$apply();
                    });
                }

                modalInstance = this.showModal(MODAL_ALERT,null,scope,true,'static','lg');

                modalInstance.result.then(function () {
                    modalInstance = null;
                    highPrior = false;
                }, function () {
                    modalInstance = null;
                    highPrior = false;
                });

            },
            hideWarning: function () {
                cancelPromise();
                if (modalInstance) modalInstance.close();
                modalInstance = null;
            }
        }
    }) //v1.0.2
    .factory('Feedback', function (Log) {
        var VERSION = '1.0.3';
        var button = null;
        var messageIcon = "<i class='glyphicon glyphicon-cog glyphicon-spin'></i>&nbsp;";
        var messageDefault = "Processando...";

        return {
            version: function() {
                return VERSION;
            },
            loading: function ($event,imageOnly) {
                Log.debug("Feedback.loading()");
                var target = $event;
                if ($event == null) return;
                if ($event.target) target = $event.target;
                button = $(target);
                if (button.html() == "") button = button.parent();

                var message = button.attr("loading");
                if (message == null) {
                    if (button.parent().attr("loading")) {
                        button = button.parent();
                        message = button.attr("loading")
                    }

                    message = messageDefault
                }

                button.previous = button.html();
                if (button.css("max-width"))  button.previousmaxwidth = button.css("max-width");
                if (button.css("min-width"))  button.previousminwidth = button.css("min-width");
                if (button.css("overflow"))  button.previousoverflow = button.css("overflow");
                if (button.css("text-overflow"))  button.previoustextoverflow = button.css("text-overflow");

                button.css("overflow","hidden");
                button.css("text-overflow","ellipsis");
                button.css("max-width",button.outerWidth());
                button.css("min-width",button.outerWidth());

                var feedback = messageIcon + message;
                if (button.outerWidth() < 40) {
                    imageOnly = true;
                }

                if (imageOnly) feedback = messageIcon;
                button.html(feedback);

                button.attr("disabled",true);

            },
            reset: function (enabled) {
                Log.debug("Feedback.reset()");
                if (!button) return;
                if (button.previousoverflow) button.css("overflow",button.previousoverflow);
                if (button.previoustextoverflow) button.css("text-overflow",button.previoustextoverflow);
                if (button.previousmaxwidth) button.css("max-width",button.previousmaxwidth);
                if (button.previousminwidth) button.css("min-width",button.previousminwidth);
                if (button.previous == null) return;
                if (enabled == null) enabled = true;

                button.html(button.previous);
                button.attr("previous",null);
                if (enabled) button.attr("disabled",false);

            }
        }
    }) //1.0.1
    .factory('CentralService', function (Log,Error,$rootScope) {
        var VERSION = '1.0.14';
        var applicationServerPublicKey = 'BB173l8rJtk3Q2PUyoCNHszuZ7EHUZdSRFQFFUwuHQB9X0AmssVKloJZuu6+9L9MnCI6piKFCZuIsyeGz9nWfcc=';
        var SENDER_ID = "698680658532";
        var PUSH_BASE = "/centralcaixa";
        var PUSH_ENDPOINT = PUSH_BASE + "/endpoint";
        var WORKER_SOURCE = 'centralcaixaworker.js';

        function isNative() {
            var result = window.cordova != null;
            if (!result)  {
                result = navigator.userAgent.match(/NativeApp/i) != null;
            }
            return result;
        }
        function isAndroid() {
            return navigator.userAgent.match(/Android/i) != null;
        }
        function isIOS() {
            var found = navigator.userAgent.match(/iPhone/i) != null;
            if (!found) found = navigator.userAgent.match(/iPod/i) != null;

            return found;
        }
        function isTablet() {
            return navigator.userAgent.match(/Tablet|iPad/i);
        }
        function isOtherMobile() {
            var found = navigator.userAgent.match(/webOS/i) != null;
            if (!found) found = navigator.userAgent.match(/BlackBerry/i) != null;
            return found;
        }
        function isWPhone() {
            var found = navigator.userAgent.match(/Windows Phone/i) != null;
            return found;
        }
        function isMobile() {
            return isAndroid() || isIOS() || isWPhone() || isOtherMobile();
        }
        function isWindows() {
            return navigator.userAgent.match(/Windows/i) != null;
        }
        function isLinux() {
            return navigator.userAgent.match(/Linux/i) != null;
        }
        function isMac() {
            return navigator.userAgent.match(/Mac/i) != null;
        }
        function isChrome() {
            return navigator.userAgent.match(/Chrome/i) != null;
        }
        function isIE() {
            return navigator.userAgent.match(/MSIE/i) != null;
        }
        function isEdge() {
            return navigator.userAgent.match(/Edge/i) != null;
        }
        function isFirefox() {
            return navigator.userAgent.match(/firefox/i) != null;
        }
        function isSafari() {
            return navigator.userAgent.match(/safari/i) != null;
        }
        function isOpera() {
            return navigator.userAgent.match(/Opera/i) != null;
        }
        function urlB64ToUint8Array(base64String) {
            var padding = '='.repeat((4 - base64String.length % 4) % 4);
            var base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            var rawData = window.atob(base64);
            var outputArray = new Uint8Array(rawData.length);

            for (var i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
        function post(endpoint, request, data, onsuccess, onfail) {
            $.ajax({
                type: "POST",
                url: endpoint,
                headers: {request: request},
                data: JSON.stringify(data),
                //contentType: 'application/octet-stream',
                contentType: 'application/json',
                cache: false,
                success: onsuccess,
                error: onfail
            });
        }
        function setRestriction() {
            if (isMobile()) {
                restriction = "DEVICE_MOBILE";
            }  else if (isTablet()) {
                restriction = "DEVICE_TABLET";
            }  else {
                restriction = "DEVICE_DESKTOP";
            }
            if (isAndroid()) {
                restriction += " ANDROID_OS";
            } else  if (isIOS()) {
                restriction += " IOS_OS";
            } else  if (isWPhone()) {
                restriction += " WINPHONE_OS";
            } else if (isOtherMobile()) {
                restriction += " OTHER_OS";
            } else if (isWindows()) {
                restriction += " WINDOWS_OS";
            } else if (isLinux()) {
                restriction += " LINUX_OS";
            } else if (isMac()) {
                restriction += " MAC_OS";
            }

            if (isMobile() || isTablet()) {
                if (isNative()) {
                    restriction += " NATIVE_PLATFORM";
                } else {
                    restriction += " BROWSER_PLATFORM";
                }
            } else {
                restriction += " BROWSER_PLATFORM";
            }

            if (isChrome()) {
                restriction += " NAV_CHROME";
            } else if (isIE()) {
                restriction += " NAV_EXPLORER";
            } else if (isEdge()) {
                restriction += " NAV_EDGE";
            } else if (isFirefox()) {
                restriction += " NAV_FIREFOX";
            } else if (isSafari()) {
                restriction += " NAV_SAFARI";
            } else if (isOpera()) {
                restriction += " NAV_OPERA";
            }
            return restriction;
        }

        function Service() {
            var swRegistration = null;
            var pushService = null;
            var supported = false;
            var initialized = false;
            var dev = null;
            var date = null;
            var devCode = 0;
            var subscribed = false;
            var initStarting = false;
            var initError = false;
            var userSubscription = null;
            var channelId = null;
            var userId = null;
            var browserApp = null;
            var eventCallback = null;
            var restriction = null;
        }

        Service.prototype.isSupported = function() {
            var vm = this;
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                vm.supported = true;
                vm.browserApp = true;

            } else {
                try {
                    if (PushNotification != null) {
                        vm.supported = true;
                        vm.browserApp = false;
                    } else {
                        vm.supported = false;
                        vm.browserApp = null;
                    }
                } catch (ignore) {
                    vm.supported = false;
                    vm.browserApp = null;
                }
            }
            if (vm.initError) {
                vm.supported = false;
            }
            return vm.supported;
        }

        Service.prototype.getRegistration = function(onDone) {
            Log.debug("getRegistration()");
            var vm = this;
            if (vm.browserApp) {
                var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
                vm.swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                }).then(function (subscription) {
                    console.log('User is subscribed:', subscription);
                    var hasSubscription = !(subscription === null);
                    vm.userSubscription = subscription;
                    if (onDone) onDone(hasSubscription, subscription);
                }).catch(function (err) {
                    console.log('Failed to subscribe the user: ', err);
                    if (onDone) onDone(false, null, err.name);
                });
            } else {
                var hasSubscription = !(vm.userSubscription === null);
                if (onDone) onDone(hasSubscription, vm.userSubscription);
            }
        }

        Service.prototype.loadRegistration = function(onDone) {
            Log.debug("loadRegistration()");
            var vm = this;
            vm.swRegistration.pushManager.getSubscription()
                .then(function (subscription) {
                    var hasSubscription = !(subscription === null);
                    vm.userSubscription = subscription;
                    Log.debug('User has subscription.');
                    if (onDone) onDone(hasSubscription, subscription);
                });
        }

        Service.prototype.initialize = function(channel, user, success, fail) {
            Log.debug("initialize()");
            var vm = this;

            if (!vm.isSupported()) {
                Log.warning("Notifications not supported on this platform");
                return;
            }

            if (vm.initStarting) {
                Log.warning("Starting up on process...");
                return;
            }
            vm.initStarting = true;
            vm.initError = false;

            vm.channelId = channel;
            vm.userId = user;

            vm.initialized = false;
            vm.subscribed = false;
            vm.userSubscription = null;

            if (this.browserApp) {
                navigator.serviceWorker.register(WORKER_SOURCE)
                    .then(function (swReg) {
                        Log.debug("initialize().serviceWorker.register.then");
                        Log.info('Service Worker is registered', swReg);
                        vm.swRegistration = swReg;
                        vm.initStarting = false;
                        vm.initialized = true;

                        function onDone(hasSubscription, subscription) {
                            Log.debug("initialize().loadRegistration.onDone");

                            if (hasSubscription) {
                                function onSuccessCheck(data) {
                                    Log.debug("initialize().checkSubscription.onSuccessCheck");
                                    var response = JSON.parse(data);
                                    if (response == null || response.code != 0) {
                                        Error.handler("Falha ao verificar assinatura", response.code + " - " + response.message, response.cause, response.stack);
                                        if (success) success(false);
                                        return;
                                    }

                                    if (response && response.subscription && response.subscription.length > 0) {
                                        vm.subscribed = true;
                                        data = response.subscription[0].date;
                                        this.devCode = response.subscription[0].dev;
                                        if (this.devCode > 0) this.isDev = true;
                                    }

                                    if (success) success(vm.subscribed);
                                    $rootScope.$apply();

                                }

                                function onFailCheck(message) {
                                    Log.debug("initialize().checkSubscription.onFailCheck");
                                    if (fail) fail(message);
                                }

                                vm.checkSubscription(subscription, onSuccessCheck, onFailCheck);
                            } else {
                                if (success) success(vm.subscribed);
                            }

                        }

                        vm.loadRegistration(onDone);
                    })
                    .catch(function (error) {
                        vm.initError = true;
                        vm.initialized = false;
                        vm.initStarting = false;
                        Log.error('Service Worker Error', error);
                        if (fail) fail("Falha ao registrar serviço de notificações", error);
                        $rootScope.$apply();
                    });
            } else if (PushNotification != null) {

                this.pushService = PushNotification.init({
                    android: {
                        senderID: SENDER_ID,
                        icon: "icon",
                        iconColor: "white"
                    },
                    ios: {
                        //senderID: SENDER_ID,
                        //gcmSandbox:"true",
                        alert: "true",
                        badge: "true",
                        sound: "true"
                    },
                    windows: {}
                });
                vm.pushService.on('registration', function (data) {
                    console.log('Token result:' + data.registrationId);
                    vm.initialized = true;
                    vm.subscribed = false;
                    vm.userSubscription = data.registrationId;
                    vm.initStarting = false;

                    function onSuccessCheck(data) {
                        Log.debug("initialize().checkSubscription.onSuccessCheck");
                        var response = JSON.parse(data);
                        if (response == null || response.code != 0) {
                            Error.handler("Falha ao verificar assinatura", response.code + " - " + response.message, response.cause, response.stack);
                            if (success) success(false);
                            return;
                        }

                        if (response && response.subscription && response.subscription.length > 0) {
                            vm.subscribed = true;
                            data = response.subscription[0].date;
                            this.devCode = response.subscription[0].dev;
                            if (this.devCode > 0) this.isDev = true;
                        }

                        if (success) success(vm.subscribed);
                        $rootScope.$apply();

                    }

                    function onFailCheck(message) {
                        Log.debug("initialize().checkSubscription.onFailCheck");
                        if (fail) fail(message);
                        $rootScope.$apply();
                    }

                    vm.checkSubscription(vm.userSubscription, onSuccessCheck, onFailCheck);
                });

                vm.pushService.on('notification', function (data) {
                    Log.debug("cloud:push:notification " + data);

                    try {
                        if (!data) {
                            Log.error("notificação não recebeu dados");
                            return;
                        }
                        Log.debug("data: " + JSON.stringify(data));

                        var msg = data.message;

                        var push = {
                            title: data.title,
                            content: data.message,
                            image: data.image,
                            url: null
                        }

                        if (data && data.additionalData) {
                            push.url = data.additionalData.url;
                            if (data.additionalData.image) {
                                push.image = data.additionalData.image;
                            }
                        }

                        if (push.image == null) {
                            push.image = "imgs/pin.png";
                        }

                        Log.debug("push: " + JSON.stringify(push));

                        if (vm.eventCallback) {
                            vm.eventCallback(push);
                        }

                        Log.debug("cloud:push:notification:DONE");
                    } catch (error) {
                        Log.error('Falha ao processar notificação', error);
                        Log.error('error ' + error);
                    }
                });

                this.pushService.on('error', function (e) {
                    Log.error('Falha ao processar notificação' + e.message, e);
                });

            } else {
                vm.initStarting = false;
            }

        }

        Service.prototype.updateSubscriptionOnServer = function(subscription, action, onSuccess, onError) {
            Log.debug("updateSubscriptionOnServer()");

            var vm = this;
            var endPoint = PUSH_ENDPOINT;
            var request = action;
            var user = "";
            var restriction = setRestriction();
            Log.info("restriction: " + restriction);

            if (vm.userId != null) {
                user = vm.userId;
            }

            var data = {
                subscription: subscription,
                channel: vm.channelId,
                user: user,
                restriction: restriction
            }
            if (vm.dev) data.dev = vm.devCode;

            function success(data) {
                Log.debug("updateSubscriptionOnServer().success");
                Log.debug("success:data: " + data);
                if (onSuccess) onSuccess(data);
            }

            function error(data, param, value) {
                Log.debug("updateSubscriptionOnServer().error");
                Log.debug("error:data: " + data);
                Log.debug("error:param: " + param);
                Log.debug("error:value: " + value);
                if (onError) onError(data, param, value);
            }

            post(endPoint, request, data, success, error);
        }

        Service.prototype.checkSubscription = function(subscription, onSuccess, onError) {
            Log.debug("checkSubscription()");

            var vm = this;
            var endPoint = PUSH_ENDPOINT;
            var request = "checksubscription";
            var restriction = setRestriction();
            var data = {
                subscription: subscription,
                user: vm.userId,
                restriction: restriction,
                channel: vm.channelId
            }

            if (vm.dev) data.dev = vm.devCode;

            function success(data) {
                Log.debug("checkSubscription().success");
                Log.debug("success:data: " + data);
                if (onSuccess) onSuccess(data);
            }

            function error(data, param, value) {
                Log.debug("checkSubscription().error");
                Log.debug("error:data: " + data);
                Log.debug("error:param: " + param);
                Log.debug("error:value: " + value);
                if (onError) onError(data, param, value);
            }

            post(endPoint, request, data, success, error);
        }

        Service.prototype.unsubscribeUser = function(success, fail) {
            Log.debug("unsubscribeUser()");
            var vm = this;

            if (!vm.isSupported()) {
                Log.warning("Notifications not supported on this platform");
                return;
            }
            if (!vm.subscribed) {
                Log.warning("Notifications is not subscribed");
                if (success) success();
                return;
            }

            function onsuccess(data) {
                Log.debug("unsubscribeUser().success");
                var response = JSON.parse(data);
                if (response == null || response.code != 0) {
                    Error.handler("Falha ao cancelar assinatura", response.code + " - " + response.message, response.cause, response.stack);
                    if (fail) fail(response.code + " - " + response.message, response.cause, response.stack);
                    $rootScope.$apply();
                    return;
                }
                vm.subscribed = false;
                if (success) success();
                $rootScope.$apply();

            }

            function onfail(message) {
                Log.debug("unsubscribeUser().onfail");
                if (fail) fail(message);
                $rootScope.$apply();
            }

            vm.updateSubscriptionOnServer(vm.userSubscription, 'unsubscribeuser', onsuccess, onfail);

        }

        Service.prototype.testsubscribe = function(success, fail) {
            Log.debug("testsubscribe()");
            var vm = this;
            if (!vm.isSupported()) {
                Log.warning("Notifications not supported on this platform");
                return;
            }
            if (vm.subscribed) {
                Log.warning("Notifications subscribed already");
                if (success) success(vm.userSubscription);
                return;
            }

            function onDone(hasSubscription, subscription, errorname) {
                Log.debug("subscribeUser().getRegistration.onDone");

                if (!hasSubscription) {
                    var message = "Falha ao obter assinatura";
                    if (errorname == "NotAllowedError") {
                        message = "Assinatura bloqueada pelo usuário";
                    }
                    if (fail) fail(message);
                    return;
                }
                if (success) success(vm.userSubscription);
            }

            vm.getRegistration(onDone);
        }

        Service.prototype.subscribeUser = function(success, fail) {
            Log.debug("subscribeUser()");
            var vm = this;

            if (!vm.isSupported()) {
                Log.warning("Notifications not supported on this platform");
                return;
            }
            if (vm.subscribed) {
                Log.warning("Notifications subscribed already");
                if (success) success(vm.userSubscription);
                return;
            }

            function onDone(hasSubscription, subscription, errorname) {
                Log.debug("subscribeUser().getRegistration.onDone");

                if (!hasSubscription) {
                    var message = "Falha ao obter assinatura";
                    if (errorname == "NotAllowedError") {
                        message = "Assinatura bloqueada pelo usuário";
                    }
                    if (fail) fail(message);
                    return;
                }

                function onsuccess(data) {
                    Log.debug("subscribeUser().updateSubscriptionOnServer.onsuccess");
                    var response = JSON.parse(data);
                    if (response == null || response.code != 0) {
                        Error.handler("Falha ao efetuar assinatura", response.code + " - " + response.message, response.cause, response.stack);
                        if (fail) fail(response.code + " - " + response.message, response.cause, response.stack);
                        return;
                    }
                    vm.subscribed = true;
                    if (success) success(vm.userSubscription);
                    $rootScope.$apply();
                }

                function onfail(message) {
                    Log.debug("subscribeUser().updateSubscriptionOnServer.onfail");
                    if (fail) fail(message);
                    $rootScope.$apply();
                }

                vm.updateSubscriptionOnServer(vm.userSubscription, 'subscribeuser', onsuccess, onfail);
            }

            vm.getRegistration(onDone);
        }

        Service.prototype.setEvent = function(event) {
            Log.debug("setEvent()");
            var vm = this;
            vm.eventCallback = event;
        }

        Service.prototype.isDev = function() {
            var vm = this;
            return vm.dev;
        }

        Service.prototype.setDevMode = function(code) {
            var vm = this;
            vm.devCode = code;
            vm.dev = (vm.devCode>0);
        }
        Service.prototype.isSubscribed = function() {
            var vm = this;
            return vm.subscribed;
        }
        Service.prototype.isInitialized = function() {
            var vm = this;
            return vm.initialized;
        }
        Service.prototype.getSubscription = function() {
            var vm = this;
            return vm.userSubscription;
        }
        Service.prototype.destroy = function() {
            //this.destroy();
        }

        var service = new Service();

        return {
            getNewInstance: function() {
                return new Service();
            },
            version: function() {
                return VERSION;
            },
            initialize: function(channel,user,success,fail) {
                return service.initialize(channel,user,success,fail);
            },
            isSupported: function() {
                return service.isSupported();
            },
            isSubscribed: function() {
                return service.isSubscribed();
            },
            isInitialized: function() {
                return service.isInitialized;
            },
            isDevMode: function() {
                return service.isDev();
            },
            setDevMode: function(code) {
                service.setDevMode(code);
            },
            getSubscription: function() {
                return service.getSubscription();
            },
            testsubscribe: function(success,fail) {
                service.testsubscribe(success,fail);
            },
            subscribe: function(success,fail) {
                service.subscribeUser(success,fail);
            },
            unsubscribe: function(success,fail) {
                service.unsubscribeUser(success,fail);
            },
            setEvent: function(event) {
                service.setEvent(event);
            }
        }
    })//v1.0.14


    .factory('Analytics', function (Log, $location) {
        var VERSION = '1.0.0';
        var HOME = "//www.geradorprototipo.caixa.gov.br/analytics";
        var enabled = false;
        var key = null;
        var session = null;
        var category = "";
        var INIT_EVENT = "INIT";
        var PAGE = "page";
        var ERROR = "error";
        var WARN = "warn";
        var TIMEOUT = 120000;

        var soname = null;
        var sover = null;
        var navname = null;
        var navver = null;
        var devname = null;

        var evaluationRate = null;
        var userFeedback = null;

        var location =  $location.host().toLowerCase();
        if (location == "localhost" || location == "192.168.0.2") {
            HOME = "/analytics";
        }
        var EVENT = HOME + "/event";
        var EVENT_EVALUATION = HOME + "/evaluationRate.data";
        var EVENT_FEEDBACK = HOME + "/userFeedback.data";

        function getStamp(name) {
            var result = null;
            try {
                result = window.localStorage.getItem(name);
                if (result == "" || result == "null") {
                    result = null;
                }
            } catch (ignore) {
            }
            return result;
        }
        function setStamp(name,value) {
            try {
                window.localStorage.setItem(name,value);
            } catch (ignore) {
            }
        }

        function replaceAll(str,find,replace) {
            function escapeRegExp(str) {
                return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            }
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }
        function get(url, success, error) {

            $.ajax({
                type: "GET",
                url: url,
                cache: true,
                timeout: TIMEOUT,
                success: success,
                error: error
            });
        }
        function post(request, success, error) {
            try {
                var url = request;
                $.ajax({
                    type: "POST",
                    url: url,
                    encoding:"UTF-8",
                    contentType: "charset=utf-8",
                    cache: false,
                    timeout: TIMEOUT,
                    success: success,
                    error: error
                });
            } catch (error) {
                Error.handler("Falha ao processar requisição", error);
            }
        }
        function getRandom(min,max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        function makeid() {
            return getRandom(1,2147483647);
        }

        function getFakeEnvironment() {
            var environments = [
                {id:1, name: "Windows7/Chrome5", devname:"Desktop",soname:"Windows",sover:"7",navname:"Chrome",navver:"54"},
                {id:2, name: "Windows7/Firefox4", devname:"Desktop",soname:"Windows",sover:"7",navname:"Firefox",navver:"49"},
                {id:3, name: "Windows7/IE10", devname:"Desktop",soname:"Windows",sover:"7",navname:"Microsoft Internet Explorer",navver:"10"},
                {id:4, name: "Windows10/IE11", devname:"Desktop",soname:"Windows",sover:"10",navname:"Microsoft Internet Explorer",navver:"11"},
                {id:5, name: "Windows10/Edge", devname:"Desktop",soname:"Windows",sover:"10",navname:"Microsoft Edge",navver:"14"},
                {id:6, name: "Android4/Chrome5", devname:"Mobile",soname:"Android",sover:"43",navname:"Chrome",navver:"54"},
                {id:7, name: "Android5/Chrome4", devname:"Mobile",soname:"Android",sover:"50",navname:"Chrome",navver:"48"},
                {id:8, name: "Android6/Chrome5", devname:"Mobile",soname:"Android",sover:"601",navname:"Chrome",navver:"54"},
                {id:9, name: "iOS93/Safari9", devname:"Mobile",soname:"iOS",sover:"935",navname:"Safari",navver:"9"}
            ]
            return environments;
        }

        function fail(data) {
            if (data && data.statusText) {
                console.log(data.statusText);
            } else {
                console.log("Analytics: falha ao obter recurso externo");
            }

        }
        function evaluationSuccess(data) {
            var response = JSON.parse(data);
            evaluationRate = response;
        }
        get(EVENT_EVALUATION,evaluationSuccess,fail);

        function feedbackSuccess(data) {
            var response = JSON.parse(data);
            userFeedback = response;
        }
        get(EVENT_FEEDBACK,feedbackSuccess,fail);

        function fakeEvent(device, key, session, category, action, label, value) {

            var request = EVENT + "?key=" + key;
            if (session) {
                request += "&session=" + session;
            }

            request += "&category=" + encodeURI(category )+ "&action=" + encodeURI(action);
            if (label) {
                request += "&label=" + encodeURI(label);
            }
            if (value != null) {
                request += "&value=" + encodeURI(value);
            }
            if (device["soname"]) {
                request += "&soname=" + device["soname"];
            }
            if (device["sover"]) {
                request += "&sover=" + device["sover"];
            }
            if (device["navname"]) {
                request += "&navname=" + device["navname"];
            }
            if (device["navver"]) {
                request += "&navver=" + device["navver"];
            }
            if (device["devname"]) {
                request += "&devname=" + device["devname"];
            }

            function success(data) {
                Log.debug("Analytics.fakeEvent().success:" + data );
            }
            function error(data) {
                Log.debug("Analytics.fakeEvent().error:" + data );
            }
            post(request,success,error);
        }

        function registerEvent(category, action, label, value) {

            var request = EVENT + "?key=" + key;
            if (session) {
                request += "&session=" + session;
            }

            request += "&category=" + encodeURI(category )+ "&action=" + encodeURI(action);
            if (label) {
                request += "&label=" + encodeURI(label);
            }
            if (value != null) {
                request += "&value=" + encodeURI(value);
            }
            function success(data) {
                //Log.debug("Analytics.registerEvent().success:" + data );
            }
            function error(data) {
                Log.debug("Analytics.registerEvent().error:" + data );
            }
            post(request,success,error);
        }

        return {
            init: function (id,newcategory,devmode) {
                if (!id) return;
                key = id;
                if (newcategory) category = newcategory;
                session = makeid();
                var lastsession = getStamp(category);

                enabled = true;

                this.trackEvent(INIT_EVENT,lastsession);

                setStamp(category,session);


            },
            setEnable: function(value) {
                enabled = value;
            },
            setSession: function(id) {
                session = id;
            },
            setCategory: function(id) {
                category = id;
            },
            isEnabled: function() {
                return enabled;
            },
            trackWarn: function(label, value) {
                if (!enabled) return;
                if (!key) return;

                registerEvent(category,WARN,label,value);
            },
            trackException: function(label, value) {
                if (!enabled) return;
                if (!key) return;

                registerEvent(category,ERROR,label,value);
            },
            trackEvent: function(action, label, value) {
                if (!enabled) return;
                if (!key) return;

                registerEvent(category,action,label,value);
            },
            trackPage: function(page, value) {
                if (!enabled) return;
                if (!key) return;

                registerEvent(category,PAGE,page,value);
            },
            fakeInit: function(device, key, session) {
                fakeEvent(device, key, session, category, INIT_EVENT);
            },
            fakeSession: function(device, key, session) {
                fakeEvent(device, key, session, category, SESSION_EVENT);
            },
            fakeError: function(device, key, session, label, value) {
                fakeEvent(device, key, session, category, ERROR, label, value);
            },
            fakeWarn: function(device, key, session, label, value) {
                fakeEvent(device, key, session, category, WARN, label, value);
            },
            fakeEvent: function(device, key, session, category, action, label, value) {
                return fakeEvent(device, key, session, category, action, label, value);
            },
            getFakeEnvironment: function() {
                return getFakeEnvironment();
            },
            getEvaluationRate: function() {
                return evaluationRate;
            },
            getUserFeedback: function() {
                return userFeedback;
            },
            isFeedbackReady: function() {
                return userFeedback != null && evaluationRate != null;
            }
        }
    }) //Analytics.1.0.7;
    .factory('Utils', function (Log) {
        var VERSION = '1.0.0';
        Log.debug("Utils");
        function removeMask(string) {
            return string.replace(/([-.-/])/g, "");
        }

        function cleanUpSpecialChars(str)
        {
            str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
            str = str.replace(/[àáâãäå]/g,"a");
            str = str.replace(/[ÈÉÊË]/g,"E");
            str = str.replace(/[ÌÍÎ]/g,"I");
            str = str.replace(/[íìî]/g,"i");
            str = str.replace(/[ÒÓÔ]/g,"O");
            str = str.replace(/[òòô]/g,"o");
            str = str.replace(/[ÙÚÛ]/g,"U");
            str = str.replace(/[ùúû]/g,"u");
            str = str.replace(/[Ç]/g,"c");
            str = str.replace(/[ç]/g,"c");
            return str.replace(/[^a-z0-9]/gi,''); // final clean up
        }

        function isAndroid() {
            return navigator.userAgent.match(/Android/i) != null;
        }
        function isIOS() {
            var found = navigator.userAgent.match(/iPhone/i) != null;
            if (!found) found = navigator.userAgent.match(/iPad/i) != null;
            if (!found) found = navigator.userAgent.match(/iPod/i) != null;

            return found;
        }
        function isWPhone() {
            var found = navigator.userAgent.match(/Windows Phone/i) != null;
            if (!found) found = navigator.userAgent.match(/iPad/i) != null;
            if (!found) found = navigator.userAgent.match(/iPod/i) != null;

            return found;
        }
        function isMobile() {
            return isAndroid() || isIOS() || isWPhone();
        }

        function isNative() {
        		var result = window.cordova != null;
        		//Log.debug('####### IS Native: ' + result);
            return result;
        }

        function escapeRegExp(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

        return {
            version: function() {
                return VERSION;
            },
            getRandom: function(min,max) {
                return Math.floor(Math.random()*(max-min+1)+min);
            },
            getASCII: function(char) {
                return cleanUpSpecialChars(char);
            },
            replaceAll: function(str,find,replace) {
                if (str == null) return str;
                return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
            },
            getProfile: function (id) {
                if (id == PROFILE_ADMIN) return "ADMINISTADOR";
                if (id == PROFILE_USUARIO) return "USUÁRIO";
                return "Perfil " + id + " não reconhecido";


            },
            getDevice: function() {
                var device = {
                    isMobile: isMobile(),
                    isAndroid: isAndroid(),
                    isIOS: isIOS(),
                    isNative: isNative()
                }
                return device;
            },
            getPlatforms: function() {
                var platforms = "";

                if (isMobile()) {

                    if (isNative()) {
                        platforms += "nativo ";
                    } else {
                        platforms += "mobile ";
                    }

                    if (isAndroid()) {
                        platforms += "android ";
                    }else if (isIOS()) {
                        platforms += "ios ";
                    }else if (isWPhone()) {
                        platforms += "winphone ";
                    }
                } else {
                    platforms = "desktop";
                }

                return platforms;
            },
            isNumber: function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            },
            isEmail: function (email) {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return regex.test(email);
            },
            validateCondition: function (condition, value, mask) {
                //Log.debug("validateCondition(" + condition + "," + value + "," + mask + ")");
                var found = true;
                if ((value != null) && (value != "")) {
                    value = value.toLowerCase();
                    if (mask) {
                        value = removeMask(value);
                    }
                    condition = condition.toLowerCase();
                    if (condition.indexOf(value) < 0) {
                        found = false;
                    }
                }
                return found;
            },
            exportToFile: function (filename, data) {

                var blob = new Blob([data], {type: 'text/csv;charset=utf-8;'});
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            },
            exportImage: function (filename, data) {

                var imgData = data.replace(/^data:[a-z/]*;base64,/, '');

                var byteString = atob(imgData);
                var buffer = new ArrayBuffer(byteString.length);
                var intArray = new Uint8Array(buffer);
                for (var i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }

                var blob = new Blob([buffer], { type: "image/png"});

                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }

            },
            exportBinary: function (filename, data) {

                var blob = new Blob([data], {type: 'application/zip;'});
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            },
            exportJsonToText: function (filename, json, separator) {
                var csvFile = '';

                for (var i in json) {
                    var line = "";
                    var item = json[i];
                    for (var key in item) {
                        line += item + separator;
                    }
                    csvFile += line + "\n";
                }

                var blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8;'});
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            },
            exportToCsv: function (filename, data) {
                var csvFile = '';

                var rowCount = 0;
                $.each(data, function (i, row) {//Cada registro
                    var line = "";
                    var colCount = 0;

                    if (rowCount == 0) { //Processar Header
                        $.each(row, function (j, col) { //cada coluna
                            if (colCount > 0) {
                                line += ";";
                            }
                            line += j;
                            colCount += 1;
                        });

                        csvFile += line + "\n";
                        colCount = 0;
                        line = "";
                    }

                    //Processar Dados
                    $.each(row, function (j, col) { //cada coluna

                        //Log.debug("col: " +  col + ":" + j);
                        var innerValue = col === null ? '' : col.toString();
                        if (col instanceof Date) {
                            innerValue = col.toLocaleString();
                        }
                        ;

                        var result = innerValue.replace(/"/g, '""');
                        if (result.search(/("|,|\n)/g) >= 0)
                            result = '"' + result + '"';

                        if (colCount > 0) {
                            line += ";";
                        }
                        line += result;
                        colCount += 1;
                    });
                    //Log.debug("line: " + line);
                    csvFile += line + "\n";
                    rowCount += 1;
                });

                var blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8;'});
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            },
            clearDataTable: function (dataTable, dataTableName) {
                if (dataTable != null) {
                    dataTable.destroy();
                    dataTable = null;
                    $("#" + dataTableName).empty();
                }
            },
            plotDataTable: function (dataTableName, dataSource, showColor) {
                if (showColor == null) showColor = true;

                var columnTitle = Enumerable.From(dataSource.table).Select("$.title").ToArray();
                var columnName = Enumerable.From(dataSource.table).Select("$.name").ToArray();

                //Log.debug("columnName:" + columnName);
                var columns = [];
                var i = 0;
                for (var i=0; i<columnName.length; i++) {
                    var name = columnName[i];
                    //console.log("name: " + name);
                    var title = columnTitle[i];

                    var column = null;
                    if (i == 0) {
                        column = {
                            "mData": name,
                            "sTitle": title,
                            "mRender": function (data, type, full) {
                                var color = null;

                                if (full.serie != null) color = seriesColors[full.serie];
                                if (color == null) color = seriesColors[full.id -1]

                                return '<button class="btn btn-info btn-sm" style="border-color:#fff;background-color:' + color + '">' +  data + '</button>';
                            }
                        };
                    } else {
                        column = JSON.parse('{"mDataProp":"' + name + '","sTitle":"' + title + '"}');
                    }
                    //console.log("column:" + column.sTitle);
                    columns.push(column);
                }

                var customRow = null;
                if (dataSource.customRow != null) {
                    try {
                        eval("customRow = " + dataSource.customRow);
                    } catch (error) {
                        Log.error(error);
                    }
                }

                //Cria Tabela
                var dataTable = $("#" + dataTableName).DataTable({
                    aaData: dataSource.data,
                    "createdRow": customRow,
                    "oLanguage": dataTable_language,
                    responsive: true,
                    paging: false,
                    "order": [[0, "asc"]],
                    "info": false,
                    searching: false,
                    //scrollY: 300,
                    aoColumns: columns
                });
                return dataTable;
            },

            plotChartBar: function (chart, chartName, response,legend) {
                if (legend == null) legend = false;

                if (response.data.length == 0) {
                    $("#" + chartName).hide();
                } else {
                    $("#" + chartName).show();
                }

                var data = [];
                var series = response.chart.series != null;
                //console.log("response.chart.series:" + response.chart.series);
                var dataPoints = [];

                $.each(response.data, function (i, item) {
                    var serie = item.serie;
                    var labels = response.chart.labels;
                    if (!serie) serie = item.id -1;

                    var label = item.label;
                    if (series) label = response.chart.series[0];
                    if (labels) label = response.chart.labels[i];


                    var itemdata = {
                        y: item.value,
                        //x: i,
                        label: label,
                        color: seriesColors[serie]
                    };
                    dataPoints.push(itemdata);

                    if (item.subvalue != null) {
                        var label = item.label;
                        if (series) label = response.chart.series[1];

                        var itemdata = {
                            y: item.subvalue,
                            //x: i,
                            label:label,
                            color: seriesColors[serie]
                        };
                        dataPoints.push(itemdata);
                    }

                });
                data.push({dataPoints: dataPoints});

                var options = {};
                jQuery.extend(true,options,response.chart, chartOptions);
                options.data = data;
                console.log("options: " + JSON.stringify(options));

                var chart = new CanvasJS.Chart(chartName,options);
                chart.render();

                return chart;
            },
            exportCanvas: function(canvas, format, fileName) {
                if (!canvas || !format || !fileName)
                    return;

                var fullFileName = fileName + "." + (format === "jpeg" ? "jpg" : format);
                var mimeType = "image/" + format;
                var img = canvas.toDataURL(mimeType);
                var saved = false;

                var downloadLink = document.createElement("a");
                downloadLink.download = fullFileName;
                downloadLink.href = img;
                downloadLink.target = "_blank";
                var e;


                if (typeof (Blob) !== "undefined" && !!new Blob()) {

                    //alert("blob");
                    var imgData = img.replace(/^data:[a-z/]*;base64,/, '');

                    var byteString = atob(imgData);
                    var buffer = new ArrayBuffer(byteString.length);
                    var intArray = new Uint8Array(buffer);
                    for (var i = 0; i < byteString.length; i++) {
                        intArray[i] = byteString.charCodeAt(i);
                    }

                    var blob = new Blob([buffer], { type: "image/" + format });

                    // Save the blob
                    try {
                        window.navigator.msSaveBlob(blob, fullFileName);
                        saved = true;
                    }
                    catch (e) {
                        downloadLink.dataset.downloadurl = [mimeType, downloadLink.download, downloadLink.href].join(':');
                        downloadLink.href = window.URL.createObjectURL(blob);
                    }
                }

                if (!saved) {

                    try {

                        event = document.createEvent("MouseEvents");

                        event.initMouseEvent("click", true, false, window,
                            0, 0, 0, 0, 0, false, false, false,
                            false, 0, null);

                        if (downloadLink.dispatchEvent) {
                            //alert("dispatchEvent");
                            downloadLink.dispatchEvent(event);
                        }
                        else if (downloadLink.fireEvent) {
                            //alert("fireEvent");
                            downloadLink.fireEvent("onclick");
                        }

                    } catch (e) {
                        var win = window.open();
                        //alert("<IE10");
                        //window.console.log("IE");
                        win.document.write("<img src='" + img + "'></img><div>Please right click on the image and save it to your device</div>");
                        win.document.close();
                    }
                }
            }
        }
    })//1.0.1
    .factory('Geolocation', function ($rootScope, Log) {
        var localmap = null;
        var infowindow = null;
        var markers = [];
        var scope = null;
        var userlocation = null;
        var path = null;

        function getTitle(location) {
            var title = "";
            if (location.nome) title += "<strong>"+ location.nome + "</strong>";
            if (location.data) title += "<br>Data: <strong>" + location.data + "</strong>"
            if (location.perimetro) title += "<br>Perímetro: <strong>" + location.perimetro + " metros</strong>"
            if (location.precisao) title += "<br>Precisão: <strong>" + location.precisao + " metros</strong>"
            if (location.distancia) title += "<br>Distância: <strong>" + location.distancia + " km</strong>"
            return title;
        }

        function getId(location) {
            var id = "";
            if (location.id != null) id += location.id;
            if (location.nome) id += location.nome;
            if (location.nomeobra) id += location.nomeobra;
            if (id == "") {
                Log.warning("get(): id is null for this location");
            }
            return id;
        }

        function getMarker(id) {
            for (var j = 0; j < markers.length; j++) {
                var marker = markers[j];
                if (marker.id == id) return marker;
            }
            return null;
        }

        function directDistance(lat1, lon1, lat2, lon2) {
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var radlon1 = Math.PI * lon1/180
            var radlon2 = Math.PI * lon2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            dist = dist * 1.609344;
            return dist
        }

        return {
            setUserLocation: function(location) {
                userlocation = location;
            },
            getUserLocation: function() {
                return userlocation;
            },
            resetMap: function() {
                this.clearMarkers();
                localmap = null;
                path = null;
            },
            loadMarker: function(location, icon, show, hideRange, clickCallback) {
                var latitude = location.latitude;
                var longitude = location.longitude;
                if (!latitude || !longitude) {
                    Log.warning("Geolocation.loadMarker(): latitude or longitude are undefined");
                    return;
                }
                if (!localmap) return null; //throw new Error("Geolocation.loadMarker(): map is undefined");

                var id = getId(location);
                if (id == null) {
                    Log.warning("Geolocation.loadMarker(): unable to get location id");
                    return;
                };

                var coord = new google.maps.LatLng(latitude,longitude);
                var changed = true;

                var marker = getMarker(id);
                if (icon) icon = new google.maps.MarkerImage(icon, null,new google.maps.Point(0,0))
                if (!marker) {
                    marker = new google.maps.Marker({
                        position: coord,
                        map: localmap,
                        animation: google.maps.Animation.DROP,
                        icon: icon
                    });
                    marker.title = getTitle(location);

                    google.maps.event.addListener(marker, 'click', function(e) {
                        Log.info("userMarker(click)");
                        if (infowindow != null) infowindow.close();
                        infowindow = new google.maps.InfoWindow({
                            content: this.title,
                            marker: marker.id
                        });

                        infowindow.open(localmap, this);

                        if (clickCallback) clickCallback(marker);
                    });

                    if (location.perimetro && !hideRange) {
                        var perimeterOptions = {
                            strokeColor: '#0051ff',
                            strokeOpacity: 0.2,
                            strokeWeight: 2,
                            fillColor: '#0051ff',
                            fillOpacity: 0.1,
                            map: localmap,
                            clickable: false,
                            center: coord,
                            radius: location.perimetro
                        };
                        var perimeter = new google.maps.Circle(perimeterOptions);
                        marker.perimeter = perimeter;
                    }
                    if (location.precisao && !hideRange) {
                        var perimeterOptions = {
                            strokeColor: '#FF0007',
                            strokeOpacity: 0.2,
                            strokeWeight: 2,
                            fillColor: '#FF0007',
                            fillOpacity: 0.1,
                            map: localmap,
                            clickable: false,
                            center: coord,
                            radius: location.precisao
                        };
                        var perimeter = new google.maps.Circle(perimeterOptions);
                        marker.perimeter = perimeter;
                    }
                } else {
                    marker.title = getTitle(location);

                    var position = marker.getPosition();
                    if (position.lat() == coord.lat() && position.lng() == coord.lng()) {
                        changed = false;
                    } else {
                        marker.setPosition(coord);
                    }
                }

                if (location.perimetro && !hideRange) {
                    var perimeter = marker.perimeter;
                    if (perimeter) {
                        perimeter.setCenter(coord);

                        if (perimeter.getRadius() != location.perimetro) {
                            perimeter.setRadius(location.perimetro);
                        }

                    } else {
                        var perimeterOptions = {
                            strokeColor: '#0051ff',
                            strokeOpacity: 0.2,
                            strokeWeight: 2,
                            fillColor: '#0051ff',
                            fillOpacity: 0.1,
                            map: localmap,
                            clickable: false,
                            center: coord,
                            radius: location.perimetro
                        };
                        perimeter = new google.maps.Circle(perimeterOptions);
                        marker.perimeter = perimeter;
                    }
                }

                if (location.precisao && !hideRange) {
                    var perimeter = marker.perimeter;
                    if (perimeter) {
                        perimeter.setCenter(coord);

                        if (perimeter.getRadius() != location.precisao) {
                            perimeter.setRadius(location.precisao);
                        }

                    } else {
                        var perimeterOptions = {
                            strokeColor: '#0051ff',
                            strokeOpacity: 0.2,
                            strokeWeight: 2,
                            fillColor: '#0051ff',
                            fillOpacity: 0.1,
                            map: localmap,
                            clickable: false,
                            center: coord,
                            radius: location.precisao
                        };
                        perimeter = new google.maps.Circle(perimeterOptions);
                        marker.perimeter = perimeter;
                    }
                }



                marker.id = id;
                location.marker = id;

                if (markers.indexOf(marker) < 0) markers.push(marker);

                if (show && changed)  {
                    //localmap.setCenter(coord);
                    localmap.panTo(coord);
                    localmap.setZoom(12);
                }
                if (infowindow && infowindow.marker == marker.id && infowindow.getMap() && changed) {
                    if (!localmap.getBounds().contains(marker.getPosition())) localmap.panTo(coord);
                    this.showInfo(location);
                }
                return marker;
            },
            loadMarkers: function(locations, icon, fits,drawline, hideRange, clickCallback) {
                Log.debug("Geolocation.loadMarkers()");
                if (locations == null) throw new Error("Lista é nula")
                if (!localmap) throw new Error("Geolocation.loadMarker(): map is undefined");
                var lines = [];

                for (var i=0; i < locations.length; i++) {
                    var location = locations[i];

                    var marker = this.loadMarker(location,icon,false,hideRange, clickCallback);
                    if (marker) {
                        var coord = marker.getPosition();
                        lines.push(coord);
                        if (markers.indexOf(marker) < 0) markers.push(marker);
                    }
                }

                if (drawline && lines.length > 0) {
                    if (path != null) {
                        path.setMap(null);
                        path = null;
                    }
                    path = new google.maps.Polyline({
                        path: lines,
                        geodesic: true,
                        strokeColor: '#FDBB0C',
                        strokeWeight: 5
                    });
                    path.setMap(localmap);
                }
                if (fits) this.fitsMap();
            },
            toggleMarker: function(id,value) {
                var marker = getMarker(id);
                if (!marker) return;
                if (value) {
                    if (!marker.getMap()) marker.setMap(localmap);
                    if (marker.perimeter && !marker.perimeter.getMap()) marker.perimeter.setMap(localmap);
                } else {
                    marker.setMap(null);
                    if (marker.perimeter) marker.perimeter.setMap(null);
                }
            },
            showLocation: function(location) {
                Log.debug("Geolocation.showLocation()");
                if (!localmap) return

                if (location && location.marker) {

                    var marker = this.getMarker(location.marker);
                    if (marker) {
                        localmap.panTo(marker.getPosition());
                        localmap.setZoom(16);
                        this.showInfo(location);
                    }
                }
            },
            showInfo: function(location, complemento) {
                Log.debug("Geolocation.showInfo()");
                if (!localmap) return

                if (location && location.marker) {

                    var marker = this.getMarker(location.marker);
                    var title = getTitle(location);
                    if (complemento) title += "<br/>" + complemento;
                    if (infowindow != null) infowindow.close();
                    infowindow = new google.maps.InfoWindow({
                        content: title,
                        marker: marker.id
                    });
                    infowindow.open(localmap, marker);
                    $rootScope.goHome();
                }
            },
            showMapLocation: function(latitude, longitude, distance) {
                Log.debug("Geolocation.showMapLocation()");
                if (!localmap) return
                if (distance == null) distance = 12;

                var location = new google.maps.LatLng(latitude,longitude)
                //localmap.setCenter(location);
                localmap.panTo(location);
                localmap.setZoom(distance);
            },
            getDistanceFromPoints: function(lat1,lng1,lat2,lng2) {
                return directDistance(lat1,lng1,lat2,lng2).toFixed(2);
            },
            getDistance: function(source,destination) {
                var p1 = source.getPosition();
                var p2 = destination.getPosition();
                if (!p1 || !p2) return null;
                return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000).toFixed(2)
            },
            getMarker: function(id) {
                Log.debug("Geolocation.getMarker(" + id + ")");
                return getMarker(id);
            },
            fitsMap: function() {
                Log.debug("Geolocation.fitsMap()");
                if (!localmap) return
                if (markers.length == 0) return;

                var bounds = new google.maps.LatLngBounds();
                var boundcounter = 0;
                for (var i = 0; i < markers.length; i++) {
                    var marker = markers[i];
                    if (!marker.getMap()) continue;
                    var coord = marker.getPosition();
                    bounds.extend(coord);
                    boundcounter += 1;
                }
                if (boundcounter == 0) return;
                localmap.fitBounds(bounds);
                if (localmap.getZoom() > 12)  localmap.setZoom(12);
            },
            fitsBounds: function(bounds) {
                localmap.fitBounds(bounds);
            },
            fitsLocations: function(locations) {
                Log.debug("Geolocation.fitsLocations()");
                if (!localmap) return
                if (locations.length == 0) return;

                var bounds = new google.maps.LatLngBounds();
                var boundcounter = 0;
                for (var i = 0; i < locations.length; i++) {
                    var location = locations[i];
                    if (!location.marker) continue;

                    var marker = this.getMarker(location.marker);
                    if (!marker) continue;
                    if (!marker.getMap()) continue;

                    var coord = marker.getPosition();
                    bounds.extend(coord);
                    boundcounter += 1;
                }
                if (boundcounter == 0) return;
                localmap.fitBounds(bounds);
                //if (localmap.getZoom() > 12)  localmap.setZoom(12);
            },
            clearMarkers: function() {
                Log.debug("Geolocation.clearMarkers()");
                for (var j=0; j< markers.length; j++) {
                    var marker = markers[j];
                    marker.setMap(null);
                    if (marker.perimeter) marker.perimeter.setMap(null);
                    markers.slice(j,1);
                }
                markers.length = 0;
                if (path) path.setMap(null);
            },
            loadMap: function(mapname) {
                Log.debug("Geolocation.loadMap(" + mapname + ")");
                var perimeter = null;
                if (localmap) this.resetMap();

                var center = new google.maps.LatLng(-15.799585, -47.882543); //Brasília

                localmap = new google.maps.Map($(mapname)[0], {
                    zoom: 4,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true,
                    panControl: false,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.LARGE,
                        position: google.maps.ControlPosition.LEFT_TOP
                    },
                    zoomControl: true,
                    scrollwheel: true,
                    streetViewControl: false
                });

                google.maps.event.addListener(localmap, 'click', function(e) {
                    Log.debug("Geolocation.mapclick");
                    $rootScope.$broadcast('Geolocation.mapclick',e);
                });


                var userLocation = this.getUserLocation();
                if (userLocation) {
                    var lat = userLocation.latitude;
                    var lng = userLocation.longitude;
                    var location = new google.maps.LatLng(lat,lng);
                    //localmap.setCenter(location);
                    localmap.panTo(location);
                    localmap.setZoom(12);
                }
                return localmap;
            }
        }
    })

    .factory('Application', function () {
        var app = null;
        return {
            version: function() {
                return app.version;
            },
            setApp: function(data) {
                app = data;
            },
            getApp: function() {
                return app;
            }
        }
    }); //1.0.0

