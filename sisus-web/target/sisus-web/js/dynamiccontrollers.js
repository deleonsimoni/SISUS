	/*
	Aqui s�o definidos todos os controllers a serem utilizados pelos estados de sua aplica��o.
	Cada estado � composto por um controller (js) e uma tela (html)
	Os estados s�o definidos no App.js
	As p�ginas s�o armazenadas na pasta pages
*/
var DEFAULT_VIEW = "splash";
angular.module('webApp').controller('SplashController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("SplashController()");
        Analytics.trackEvent('controller','SplashController');
        $scope.container = {};     
        $rootScope.currentview.id = 'splash';
        $rootScope.currentview.group = 'Splash';
        $rootScope.currentview.title = 'Splash';
        $rootScope.currentview.icon = 'fa-picture-o';
        $rootScope.currentview.locked = false;
        $rootScope.currentview.menu = false;
        $rootScope.currentview.description = 'Tela de Splash';        
        $scope.inclusao = function() {
        	Analytics.trackEvent('SplashController','inclusao()');
        	WebServiceX.create("ws/splash/splash", JSON.stringify($scope.container), $rootScope.headers)
        	.then(function(res) {
        		if(!res.temErro) {
        			$scope.listar();
        		} else if(res.temErro) {
        			console.info(res.msgsErro[0]);
        			$scope.$apply();
        		}
        		Analytics.trackEvent('SplashController','inclusao():success');
        	}, function(xhr, status, err) {
      				var message = "Falha ao incluir splashController";
      				if (xhr && xhr.responseText) {
        				try {
        					var response = JSON.parse(xhr.responseText);
	      					if (response && response.msgsErro && response.msgsErro.length > 0) {
	      						message = response.msgsErro[0];
	      					}	        					        					
        				} catch(ignore) {
        				}
      				}
      				Error.handler(message, err);
	        		if (err == UNAUTH) {
	        				$rootScope.goAuth();
	        		}
        	});
        };   
	      $scope.pageOptions = [{name:"3",value:3},{name:"5",value:5},{name:"10",value:10},{name:"20",value:20},{name:"30",value:30},{name:"50",value:50}];
	      $scope.itemsOnPage = $scope.pageOptions[0];
	      $scope.doExportDataTxt = function(data) {
	          var dados = JSON.stringify(data);
	          dados  = vkbeautify.json(dados);
	          Utils.exportToFile("dados.txt",dados);
	      };
	      $scope.doExportDataCsv = function(data) {
	          Utils.exportJsonToText("dados.csv",data,";");
	      };
        $scope.listar = function() {
        	Analytics.trackEvent('SplashController','listar()');
	        WebServiceX.read("ws/splash/splash", $rootScope.headers)
	      	.then(function(res) {
	      		Analytics.trackEvent('SplashController','listar():success');
	      		if(!res.temErro) {
	      			if (res.data.length > 0) {
		            $scope.container = res.data[0];
								$scope.$apply();
	      			}	      			     			
	      		} else if(res.temErro) {
	      			console.info(res.msgsErro[0]);
	      			$scope.$apply();
	      		}
	      	}, function(xhr, status, err) {
	      		Analytics.trackEvent('splashController','listar():error');
    				var message = "Falha ao listar splashController";
    				if (xhr && xhr.responseText) {
      				try {
      					var response = JSON.parse(xhr.responseText);
      					if (response && response.msgsErro && response.msgsErro.length > 0) {
      						message = response.msgsErro[0];
      					}	        					
      				} catch(ignore) {
      				}
    				}
    				Error.handler(message, err);
        		if (err == UNAUTH || xhr.status == 502) {
        				$rootScope.goAuth();
        		}
	      	});        
        };
        $scope.listar();
    });
angular.module('webApp').controller('PrincipalController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("PrincipalController()");
        Analytics.trackEvent('controller','PrincipalController');
        $scope.container = {};     
        $rootScope.currentview.id = 'principal';
        $rootScope.currentview.group = 'Principal';
        $rootScope.currentview.title = 'Principal';
        $rootScope.currentview.icon = 'fa-home';
        $rootScope.currentview.locked = true;
				$rootScope.currentview.menu = true;
        $rootScope.currentview.description = 'Tela Principal';        
        $scope.inclusao = function() {
        	Analytics.trackEvent('PrincipalController','inclusao()');
        	WebServiceX.create("ws/principal/principal", JSON.stringify($scope.container), $rootScope.headers)
        	.then(function(res) {
        		if(!res.temErro) {
        			$scope.listar();
        		} else if(res.temErro) {
        			console.info(res.msgsErro[0]);
        			$scope.$apply();
        		}
        		Analytics.trackEvent('PrincipalController','inclusao():success');
        	}, function(xhr, status, err) {
      				var message = "Falha ao incluir principalController";
      				if (xhr && xhr.responseText) {
        				try {
        					var response = JSON.parse(xhr.responseText);
	      					if (response && response.msgsErro && response.msgsErro.length > 0) {
	      						message = response.msgsErro[0];
	      					}	        					        					
        				} catch(ignore) {
        				}
      				}
      				Error.handler(message, err);
	        		if (err == UNAUTH) {
	        				$rootScope.goAuth();
	        		}
        	});
        };   
	      $scope.pageOptions = [{name:"3",value:3},{name:"5",value:5},{name:"10",value:10},{name:"20",value:20},{name:"30",value:30},{name:"50",value:50}];
	      $scope.itemsOnPage = $scope.pageOptions[0];
	      $scope.doExportDataTxt = function(data) {
	          var dados = JSON.stringify(data);
	          dados  = vkbeautify.json(dados);
	          Utils.exportToFile("dados.txt",dados);
	      };
	      $scope.doExportDataCsv = function(data) {
	          Utils.exportJsonToText("dados.csv",data,";");
	      };
        $scope.listar = function() {
        	Analytics.trackEvent('PrincipalController','listar()');
	        WebServiceX.read("ws/principal/principal", $rootScope.headers)
	      	.then(function(res) {
	      		Analytics.trackEvent('PrincipalController','listar():success');
	      		if(!res.temErro) {
	      			if (res.data.length > 0) {
		            $scope.container = res.data[0];
								$scope.$apply();
	      			}	      			     			
	      		} else if(res.temErro) {
	      			console.info(res.msgsErro[0]);
	      			$scope.$apply();
	      		}
	      	}, function(xhr, status, err) {
	      		Analytics.trackEvent('principalController','listar():error');
    				var message = "Falha ao listar principalController";
    				if (xhr && xhr.responseText) {
      				try {
      					var response = JSON.parse(xhr.responseText);
      					if (response && response.msgsErro && response.msgsErro.length > 0) {
      						message = response.msgsErro[0];
      					}	        					
      				} catch(ignore) {
      				}
    				}
    				Error.handler(message, err);
        		if (err == UNAUTH || xhr.status == 502) {
        				$rootScope.goAuth();
        		}
	      	});        
        };
        $scope.listar();
    });
angular.module('webApp').controller('SobreController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("SobreController()");
        Analytics.trackEvent('controller','SobreController');
        $scope.container = {};     
        $rootScope.currentview.id = 'sobre';
        $rootScope.currentview.group = 'Sobre';
        $rootScope.currentview.title = 'Sobre a Aplicação';
        $rootScope.currentview.icon = 'fa-question';
        $rootScope.currentview.locked = false;
				$rootScope.currentview.menu = true;
        $rootScope.currentview.description = 'Sobre a aplicação';        
        $scope.inclusao = function() {
        	Analytics.trackEvent('SobreController','inclusao()');
        	WebServiceX.create("ws/sobre/sobre", JSON.stringify($scope.container), $rootScope.headers)
        	.then(function(res) {
        		if(!res.temErro) {
        			$scope.listar();
        		} else if(res.temErro) {
        			console.info(res.msgsErro[0]);
        			$scope.$apply();
        		}
        		Analytics.trackEvent('SobreController','inclusao():success');
        	}, function(xhr, status, err) {
      				var message = "Falha ao incluir sobreController";
      				if (xhr && xhr.responseText) {
        				try {
        					var response = JSON.parse(xhr.responseText);
	      					if (response && response.msgsErro && response.msgsErro.length > 0) {
	      						message = response.msgsErro[0];
	      					}	        					        					
        				} catch(ignore) {
        				}
      				}
      				Error.handler(message, err);
	        		if (err == UNAUTH) {
	        				$rootScope.goAuth();
	        		}
        	});
        };   
	      $scope.pageOptions = [{name:"3",value:3},{name:"5",value:5},{name:"10",value:10},{name:"20",value:20},{name:"30",value:30},{name:"50",value:50}];
	      $scope.itemsOnPage = $scope.pageOptions[0];
	      $scope.doExportDataTxt = function(data) {
	          var dados = JSON.stringify(data);
	          dados  = vkbeautify.json(dados);
	          Utils.exportToFile("dados.txt",dados);
	      };
	      $scope.doExportDataCsv = function(data) {
	          Utils.exportJsonToText("dados.csv",data,";");
	      };
        $scope.listar = function() {
        	Analytics.trackEvent('SobreController','listar()');
	        WebServiceX.read("ws/sobre/sobre", $rootScope.headers)
	      	.then(function(res) {
	      		Analytics.trackEvent('SobreController','listar():success');
	      		if(!res.temErro) {
	      			if (res.data.length > 0) {
		            $scope.container = res.data[0];
								$scope.$apply();
	      			}	      			     			
	      		} else if(res.temErro) {
	      			console.info(res.msgsErro[0]);
	      			$scope.$apply();
	      		}
	      	}, function(xhr, status, err) {
	      		Analytics.trackEvent('sobreController','listar():error');
    				var message = "Falha ao listar sobreController";
    				if (xhr && xhr.responseText) {
      				try {
      					var response = JSON.parse(xhr.responseText);
      					if (response && response.msgsErro && response.msgsErro.length > 0) {
      						message = response.msgsErro[0];
      					}	        					
      				} catch(ignore) {
      				}
    				}
    				Error.handler(message, err);
        		if (err == UNAUTH || xhr.status == 502) {
        				$rootScope.goAuth();
        		}
	      	});        
        };
        $scope.listar();
    });
angular.module('webApp').controller('CadastrofuncionalidadeController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("CadastrofuncionalidadeController()");
        Analytics.trackEvent('controller','CadastrofuncionalidadeController');
        $scope.container = {};     
        $rootScope.currentview.id = 'cadastrofuncionalidade';
        $rootScope.currentview.group = 'funcionalidade';
        $rootScope.currentview.title = 'funcionalidade';
        $rootScope.currentview.icon = 'fa-database';
        $rootScope.currentview.locked = false;
				$rootScope.currentview.menu = true;
        $rootScope.currentview.description = 'Cadastro de funcionalidade';        
        $scope.inclusao = function() {
        	Analytics.trackEvent('CadastrofuncionalidadeController','inclusao()');
        	WebServiceX.create("ws/funcionalidade/cadastrofuncionalidade", JSON.stringify($scope.container), $rootScope.headers)
        	.then(function(res) {
        		if(!res.temErro) {
        			$scope.listar();
        		} else if(res.temErro) {
        			console.info(res.msgsErro[0]);
        			$scope.$apply();
        		}
        		Analytics.trackEvent('CadastrofuncionalidadeController','inclusao():success');
        	}, function(xhr, status, err) {
      				var message = "Falha ao incluir cadastrofuncionalidadeController";
      				if (xhr && xhr.responseText) {
        				try {
        					var response = JSON.parse(xhr.responseText);
	      					if (response && response.msgsErro && response.msgsErro.length > 0) {
	      						message = response.msgsErro[0];
	      					}	        					        					
        				} catch(ignore) {
        				}
      				}
      				Error.handler(message, err);
	        		if (err == UNAUTH) {
	        				$rootScope.goAuth();
	        		}
        	});
        };   
	      $scope.pageOptions = [{name:"3",value:3},{name:"5",value:5},{name:"10",value:10},{name:"20",value:20},{name:"30",value:30},{name:"50",value:50}];
	      $scope.itemsOnPage = $scope.pageOptions[0];
	      $scope.doExportDataTxt = function(data) {
	          var dados = JSON.stringify(data);
	          dados  = vkbeautify.json(dados);
	          Utils.exportToFile("dados.txt",dados);
	      };
	      $scope.doExportDataCsv = function(data) {
	          Utils.exportJsonToText("dados.csv",data,";");
	      };
        $scope.listar = function() {
        	Analytics.trackEvent('CadastrofuncionalidadeController','listar()');
	        WebServiceX.read("ws/funcionalidade/cadastrofuncionalidade", $rootScope.headers)
	      	.then(function(res) {
	      		Analytics.trackEvent('CadastrofuncionalidadeController','listar():success');
	      		if(!res.temErro) {
	      			if (res.data.length > 0) {
		            $scope.container = res.data[0];
								$scope.$apply();
	      			}	      			     			
	      		} else if(res.temErro) {
	      			console.info(res.msgsErro[0]);
	      			$scope.$apply();
	      		}
	      	}, function(xhr, status, err) {
	      		Analytics.trackEvent('cadastrofuncionalidadeController','listar():error');
    				var message = "Falha ao listar cadastrofuncionalidadeController";
    				if (xhr && xhr.responseText) {
      				try {
      					var response = JSON.parse(xhr.responseText);
      					if (response && response.msgsErro && response.msgsErro.length > 0) {
      						message = response.msgsErro[0];
      					}	        					
      				} catch(ignore) {
      				}
    				}
    				Error.handler(message, err);
        		if (err == UNAUTH || xhr.status == 502) {
        				$rootScope.goAuth();
        		}
	      	});        
        };
        $scope.listar();
    });
angular.module('webApp').controller('FormulariofuncionalidadeController', function ($scope, $rootScope, Log, WebServiceX, Analytics, Error, Utils) {
        Log.debug("FormulariofuncionalidadeController()");
        Analytics.trackEvent('controller','FormulariofuncionalidadeController');
        $scope.container = {};     
        $rootScope.currentview.id = 'formulariofuncionalidade';
        $rootScope.currentview.group = 'funcionalidade';
        $rootScope.currentview.title = 'Cadastrar funcionalidade';
        $rootScope.currentview.icon = 'fa-list-alt';
        $rootScope.currentview.locked = false;
				$rootScope.currentview.menu = true;
        $rootScope.currentview.description = 'Formulário de funcionalidade';        
        $scope.inclusao = function() {
        	Analytics.trackEvent('FormulariofuncionalidadeController','inclusao()');
        	WebServiceX.create("ws/funcionalidade/formulariofuncionalidade", JSON.stringify($scope.container), $rootScope.headers)
        	.then(function(res) {
        		if(!res.temErro) {
        			$scope.listar();
        		} else if(res.temErro) {
        			console.info(res.msgsErro[0]);
        			$scope.$apply();
        		}
        		Analytics.trackEvent('FormulariofuncionalidadeController','inclusao():success');
        	}, function(xhr, status, err) {
      				var message = "Falha ao incluir formulariofuncionalidadeController";
      				if (xhr && xhr.responseText) {
        				try {
        					var response = JSON.parse(xhr.responseText);
	      					if (response && response.msgsErro && response.msgsErro.length > 0) {
	      						message = response.msgsErro[0];
	      					}	        					        					
        				} catch(ignore) {
        				}
      				}
      				Error.handler(message, err);
	        		if (err == UNAUTH) {
	        				$rootScope.goAuth();
	        		}
        	});
        };   
	      $scope.pageOptions = [{name:"3",value:3},{name:"5",value:5},{name:"10",value:10},{name:"20",value:20},{name:"30",value:30},{name:"50",value:50}];
	      $scope.itemsOnPage = $scope.pageOptions[0];
	      $scope.doExportDataTxt = function(data) {
	          var dados = JSON.stringify(data);
	          dados  = vkbeautify.json(dados);
	          Utils.exportToFile("dados.txt",dados);
	      };
	      $scope.doExportDataCsv = function(data) {
	          Utils.exportJsonToText("dados.csv",data,";");
	      };
        $scope.listar = function() {
        	Analytics.trackEvent('FormulariofuncionalidadeController','listar()');
	        WebServiceX.read("ws/funcionalidade/formulariofuncionalidade", $rootScope.headers)
	      	.then(function(res) {
	      		Analytics.trackEvent('FormulariofuncionalidadeController','listar():success');
	      		if(!res.temErro) {
	      			if (res.data.length > 0) {
		            $scope.container = res.data[0];
								$scope.$apply();
	      			}	      			     			
	      		} else if(res.temErro) {
	      			console.info(res.msgsErro[0]);
	      			$scope.$apply();
	      		}
	      	}, function(xhr, status, err) {
	      		Analytics.trackEvent('formulariofuncionalidadeController','listar():error');
    				var message = "Falha ao listar formulariofuncionalidadeController";
    				if (xhr && xhr.responseText) {
      				try {
      					var response = JSON.parse(xhr.responseText);
      					if (response && response.msgsErro && response.msgsErro.length > 0) {
      						message = response.msgsErro[0];
      					}	        					
      				} catch(ignore) {
      				}
    				}
    				Error.handler(message, err);
        		if (err == UNAUTH || xhr.status == 502) {
        				$rootScope.goAuth();
        		}
	      	});        
        };
        $scope.listar();
    });

