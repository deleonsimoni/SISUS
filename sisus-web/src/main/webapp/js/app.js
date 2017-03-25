
angular.module("webApp", ["ui.router", "ui.mask", "starter.controllers", "starter.services", "starter.filters", "starter.directives", "hs.WebService", "ncy-angular-breadcrumb", "fxpicklist"])

/*
	Aqui é montada a navegação por todas as telas definidas no projeto.
	Cada tela é montada como um estado.
	Cada estado é composto de uma página (html) e um controller (js)
	
	de acordo com as necessidades, um estado pode redefinir tambem o cabecalho, o rodape e o menu
*/

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProviderRef = $stateProvider;

        

          $stateProvider.state(STATE_INIT,{
                url: '/',
                abstract: false,
                views: {
                    'header-container': {
                        templateUrl: 'pages/header.html'
                    },
                    'menu-container': {
                        templateUrl: 'pages/menu.html'
                    },
                    'page-container': {
                        templateUrl: 'pages/main.html'
                    },
                    'footer-container': {
                        templateUrl: 'pages/footer.html'
                    }
                }
            });	
            
            $stateProvider.state("setup",{
                url: '/setup?code',
                abstract: false,
                views: {
                    'header-container': {
                        controller: "SetupController"
                    }
                }
            })            
            
            $stateProvider.state("auth",{
                url: '/auth?code',
                abstract: false,
                views: {
                    'page-container': {
                        templateUrl: 'pages/auth.html'
                    }
                }
            });            

  				
						
			
			var state = {
                url: '/splash',
                views: {
                    'page-container': {
                        templateUrl: 'pages/splash/Splash.html'
                    }
                }                
            };
            
            
					  
					  			
            $stateProvider.state('splash',state);
            
            
            
            


  				
						
			
			var state = {
                url: '/principal',
                ncyBreadcrumb: {
	            	label: 'Principal'
						,parent:'splash'
                
                },
                
                views: {
                    'header-container': {
                        templateUrl: 'pages/header.html'
                    },
                    'page-container': {
                        templateUrl: 'pages/principal/Principal.html'
                    },
                    'menu-container': {
                        templateUrl: 'pages/menu.html'
                    },
                    'footer-container': {
                        templateUrl: 'pages/footer.html'
                    }
                }                
            };
            
            
					  
					  			
            $stateProvider.state('principal',state);
            
            
            
            


  				
						
			
			var state = {
                url: '/sobre',
                ncyBreadcrumb: {
	            	label: 'Sobre a Aplicação'
						,parent:'splash'
                
                },
                
                views: {
                    'header-container': {
                        templateUrl: 'pages/header.html'
                    },
                    'page-container': {
                        templateUrl: 'pages/sobre/Sobre.html'
                    },
                    'menu-container': {
                        templateUrl: 'pages/menu.html'
                    },
                    'footer-container': {
                        templateUrl: 'pages/footer.html'
                    }
                }                
            };
            
            
					  
					  			
            $stateProvider.state('sobre',state);
            
            
            
            


  				
						
			
			var state = {
                url: '/cadastrofuncionalidade',
                ncyBreadcrumb: {
	            	label: 'funcionalidade'
						,parent:'splash'
                
                },
                
                views: {
                    'header-container': {
                        templateUrl: 'pages/header.html'
                    },
                    'page-container': {
                        templateUrl: 'pages/funcionalidade/Cadastrofuncionalidade.html'
                    },
                    'menu-container': {
                        templateUrl: 'pages/menu.html'
                    },
                    'footer-container': {
                        templateUrl: 'pages/footer.html'
                    }
                }                
            };
            
            
					  
					  			
            $stateProvider.state('cadastrofuncionalidade',state);
            
            
            
            


  				
						
			
			var state = {
                url: '/formulariofuncionalidade',
                ncyBreadcrumb: {
	            	label: 'Cadastrar funcionalidade'
						,parent:'cadastrofuncionalidade'
                
                },
                
                views: {
                    'header-container': {
                        templateUrl: 'pages/header.html'
                    },
                    'page-container': {
                        templateUrl: 'pages/funcionalidade/Formulariofuncionalidade.html'
                    },
                    'menu-container': {
                        templateUrl: 'pages/menu.html'
                    },
                    'footer-container': {
                        templateUrl: 'pages/footer.html'
                    }
                }                
            };
            
            
					  
					  			
            $stateProvider.state('formulariofuncionalidade',state);
            
            
            
            




        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });

