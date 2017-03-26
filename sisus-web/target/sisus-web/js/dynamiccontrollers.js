	/*
	Aqui s�o definidos todos os controllers a serem utilizados pelos estados de sua aplica��o.
	Cada estado � composto por um controller (js) e uma tela (html)
	Os estados s�o definidos no App.js
	As p�ginas s�o armazenadas na pasta pages
*/
var DEFAULT_VIEW = "splash";
angular.module('webApp').controller('SplashController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("SplashController()");
    });
angular.module('webApp').controller('PrincipalController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("PrincipalController()");
    });
angular.module('webApp').controller('CadastrofuncionalidadeController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("CadastrofuncionalidadeController()");
    });
angular.module('webApp').controller('FormulariofuncionalidadeController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("FormulariofuncionalidadeController()");
    });

