
/*
	Aqui poderão ser definidas variáveis globais de sua aplicação
	
	ANALYTICS_ID - codigo de rastreamento do Caixa Analythics
	ENDPOINT - Endereço do webservice que dá suporte a esta interface
	
*/

var ANALYTICS_ID = null;

var CENTRAL_ID = null;


var APP_NAME = 'SISUS_APP';
var APP_ID = 'SISUS:1153d7f7c027211867778aff82789964c88bfd7f';

var ENDPOINT = "/app/sisus/endpoint";
var CSS_HOME = "./css/";

 
var PROJECT = {
   "model": 2,
   "id":"SISUS",
   "name":"Sistema Genérico",
   "owner":"Caixa Econômica Federal",
   "description":"Modelo de Aplicação do PRIMO",
   "version":"1.0",
   "menu":true,
   "icon":"fa-stumbleupon",
   "type":"ANGULAR003v200",
   "user":"5079",
   "contact": "andre.lourdes@caixa.gov.br",
   "header": {"title":"SISUS","help":"SISUS - Sistema Genérico","subtitle":"v1.0"},
   "footer": {"left":"Caixa Econômica Federal","right":"24-03-2017"},
   "menus": [{"icon":"fa-home","title":"Principal","description":"Tela Principal","target":"principal","locked":true},{"icon":"fa-question","title":"Sobre","description":"Sobre a aplicação","target":"sobre"}],
   "theme": {"id":0,"content":".theme-app {\n\tbackground-color: #fff;\n}\n\n.theme-header {\n\tbackground-color: #296fa7;\n\tborder-bottom: 3px solid #F39A00!important;\n}\n.theme-app.tabbed .theme-header {\n\tborder-bottom: none!important;\n}\n\n.theme-header-tabs {\n\tborder-top: 3px solid #F39A00!important;\n}\n\n.theme-header-right > .navbar-brand {\n\tcolor: #fff;\n\tpadding-right: 5px;\n}\n.theme-header-left > .navbar-brand {\n\tcolor: #fff;\n}\n\n.theme-header-middle.navbar-brand{\n\tcolor: #fff;\n}\n.theme-header-tabs {\n\t    background-color: #fff;\n}\n\n.theme-header-tabs > li.active > a {\n\tbackground-color: #296fa7;\n\tcolor: #fff;\n}\n.theme-footer {\n\tbackground-color: #296fa7;\n\tborder-top: 3px solid #F39A00!important;\n}\n\n.theme-footer-right {\n\tpadding-right: 10px;\n}\n.theme-footer-middle {\n\n}\n.theme-footer-left {\n\tpadding-left: 10px;\n}\n\n.theme-header-left > a {\n\tbackground: url(../imgs/theme-padrao/caixab.png) no-repeat!important;\n\twidth: 112px;\n\theight: 24px;\n\tmargin-top: 20px!important;\n\tmargin-left: 10px!important;\n}\n.theme-header-left-caption {\n\tdisplay: none!important;\n}\n\n.theme-header-title {\n\theight: 63px;\n}\n\n.form-group{\n\ttop:20px;\n}\n\n.theme-header-acessibilidade{\n\theight: 25px;\n\tbackground-color: #2ca5fe;\n}\n\n.theme-link-acessibilidade{\n\tposition: relative;\n\ttop: 3px;\n\tleft: 10px;\n\tcolor: #fff;\n}\n\n.theme-app.tabbed .theme-menu-container {\n    margin-top: 120px!important;\n}\n.theme-app .theme-menu-container {\n    margin-top: 80px!important;\n}\n\n.theme-app.collapse.in .theme-submenu-item > a {\n\tpadding-left: 20px;\n}\n\n.theme-app .theme-main-container {\n\tborder-left: 0px;\n\tbackground-color: transparent;\n\tmargin: 70px 0 50px 0px;\n}\n\n.theme-app.menu .theme-main-container {\n\tmargin: 10px 0 50px 0px;\n}\n\t\n@media (min-width: 768px) {\n\t.theme-app.tabbed .theme-menu-container {\n\t    margin-top: 20px!important;\n\t}\n\t.theme-app .theme-menu-container {\n\t    margin-top: 0px!important;\n\t}\n\t.theme-app.collapse.in .theme-menu-container {\n\t\tmargin-top: 15px!important;\n\t}\n\t.theme-menu-container {\n\t\tposition: fixed;\n\t}\n\n\t.theme-app.menu .theme-main-container {\n\t\tmargin: 65px 0 50px 250px;\n\t}\n\n\t.theme-app.menu .theme-main-container {\n\t\tmargin: 65px 0 50px 250px;\n\t}\n\n\t.theme-app.collapse.in  .page-wrapper {\n\t\tmargin: 65px 0 50px 250px;\n\t}\n\n\t.theme-header-right {\n\t\tpadding-right: 15px;\n\t}\n\n\t.theme-app.collapse.in .theme-menu-container {\n\t\tmargin-top: 10px!important;\n\t}\n\n\n\n\t.theme-app.collapse.in  .page-wrapper {\n\t\tmargin: 65px 0 0 70px!important;\n\t}\n\n\t.theme-app.collapse.in .theme-menu-container {\n\t\tmargin-top: 0px!important;\n\t}\n\n\t.theme-main-container {\n\t\tmargin: 67px 0 0 70px;\n\t}\n\t.theme-menu-container {\n\t\tmargin-top: 3px!important;\n\t}\n}\n\n\n.sidebar-nav > .nav li > a.active {\n    margin: 0;\n    border-left: 4px solid #ffa100;\n    border-left-width: 4px;\n    border-left-style: solid;\n    border-left-color: #ffa100;\n    border-top: 1px solid #d9d9d9;\n    border-top-width: 1px;\n    border-top-style: solid;\n    border-top-color: rgb(217, 217, 217);\n    border-bottom: 1px solid #d9d9d9;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    border-bottom-color: rgb(217, 217, 217);\n    background-color: #f5f7f7;\n}\n\n.theme-header .navbar-brand:hover {\n\tcolor: #fff;\n}\n.theme-footer .navbar-brand:hover {\n\tcolor: #fff;\n}\n\n\nbutton {\n\tmargin-right: 5px;\n}\n\n.table-responsive{\n\ttop:20px;\n}\n\n/* texto */\n.text-primary {\n\tcolor: #296fa7;\n}\n.text-primary-important {\n\tcolor: #296fa7!important;\n}\n.text-warning {\n\tcolor: #ffa100;\n}\n.text-warning-important {\n\tcolor: #ffa100!important;\n}\n.text-success {\n\tcolor: #3c763d;\n}\n.text-success-important {\n\tcolor: #3c763d!important;\n}\n.text-black {\n\tcolor: #464646;\n\tfont-weight: 100;\n}\n.text-purple {\n\tcolor: #494d62;\n\tfont-weight: 100;\n}\n.text-laranja {\n\tcolor: #ffa100;\n\tfont-weight: 100;\n}\n.text-info {\n\tcolor: #c0b723;\n\tfont-weight: 100;\n}\n.text-danger {\n\tcolor: #920A04;\n\tfont-weight: 100;\n}\n\n/* Botoes */\n.btn-outline {\n\tcolor: inherit;\n\tbackground-color: transparent;\n\ttransition: all .5s;\n}\n\n.btn-primary.btn-outline {\n\tcolor: #428bca;\n}\n\n.btn-success.btn-outline {\n\tcolor: #5cb85c;\n}\n\n.btn-info.btn-outline {\n\tcolor: #5bc0de;\n}\n\n.btn-warning.btn-outline {\n\tcolor: #f0ad4e;\n}\n\n.btn-danger.btn-outline {\n\tcolor: #d9534f;\n}\n\n.btn-primary.btn-outline:hover,\n.btn-success.btn-outline:hover,\n.btn-info.btn-outline:hover,\n.btn-warning.btn-outline:hover,\n.btn-danger.btn-outline:hover {\n\tcolor: #fff;\n}\n\n.theme-menu-container {\n\tborder-right: 1px solid #ADADAD;\n\theight: 100%;\n\tbackground: #fff;\n}\n\n.theme-main-container.menu {\n\tborder-left: 0px;\n\tbackground-color: transparent;\n\tmargin: 0px 0 50px 0px;\n}\n\n.theme-app.tabbed .page-wrapper {\n\tmargin-top: 110px;\n}\n\n\n.theme-menu-item {\n\tborder-bottom: 0px!important;\n}\n\n.table-bordered{\n\tborder: none;\n}\n\n.table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, \n.table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, \n.table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th{\n\tborder-top: 1px solid #ccc;\n}\n\n/* Material Design Switch */\n.material-switch-contraste-contraste {\n\tmargin-top: 5px;\n}\n.material-switch-contraste > input[type=\"checkbox\"] {\n\tdisplay: none;\n}\n\n.material-switch-contraste > label {\n\tcursor: pointer;\n\theight: 0px;\n\tposition: relative;\n\twidth: 40px;\n\ttop: -20px;\n}\n\n.material-switch-contraste > label::before {\n\tleft: 0px;\n\tbackground: rgb(0, 0, 0);\n\tbox-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);\n\tborder-radius: 8px;\n\tcontent: '';\n\theight: 13px;\n\tposition:absolute;\n\topacity: 0.3;\n\ttransition: all 0.4s ease-in-out;\n\twidth: 34px;\n\ttop: 14px;\n}\n.material-switch-contraste > label::after {\n\tbackground: rgb(255, 255, 255);\n\tborder-radius: 16px;\n\tbox-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);\n\tcontent: '';\n\theight: 20px;\n\tleft: 0px;\n\tposition: absolute;\n\ttop: 11px;\n\ttransition: all 0.3s ease-in-out;\n\twidth: 20px;\n}\n\n.material-switch-contraste > input[type=\"checkbox\"]:checked + label::before {\n\tbackground: rgb(0, 0, 0);\n\tbox-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);\n\topacity: 0.1;\n}\n\n.material-switch-contraste > input[type=\"checkbox\"]:checked + label::after {\n\tbackground: inherit;\n\tbox-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);\n\tleft: 20px;\n}\n\n.breadcrumb{\n\tmargin-top: 10px;\n}","icon":"fa-dropbox","contraste":20,"name":"Caixa Material","value":"theme-padrao.css","tema":0},
   "contraste": {"id":20,"content":".theme-app {\n\tbackground-color: #000;\n}\n\n.theme-header {\n\tbackground-color: #000;\n\tborder-bottom: 3px solid #F39A00!important;\n}\n.theme-app.tabbed .theme-header {\n\tborder-bottom: none!important;\n}\n\n.theme-header-tabs {\n\tborder-top: 3px solid #F39A00!important;\n}\n\n.theme-header-right > .navbar-brand {\n\tcolor: #fff;\n\tpadding-right: 5px;\n}\n.theme-header-left > .navbar-brand {\n\tcolor: #fff;\n}\n\n.theme-header-middle.navbar-brand{\n\tcolor: #fff;\n}\n.theme-header-tabs {\n\t    background-color: #000;\n}\n\n.theme-header-tabs > li.active > a,\n.nav-tabs>li>a.active {\n\tbackground-color: #333;\n\tcolor: #333;\n}\n\n.theme-footer {\n\tbackground-color: #000;\n\tborder-top: 3px solid #F39A00!important;\n}\n\n.theme-footer-right {\n\tpadding-right: 10px;\n}\n.theme-footer-middle {\n\n}\n.theme-footer-left {\n\tpadding-left: 10px;\n}\n\n.theme-header-left > a {\n\tbackground: url(../imgs/theme-padrao/caixab.png) no-repeat!important;\n\twidth: 112px;\n\theight: 24px;\n\tmargin-top: 20px!important;\n\tmargin-left: 10px!important;\n}\n.theme-header-left-caption {\n\tdisplay: none!important;\n}\n\n.theme-header-title {\n\theight: 63px;\n}\n\n.form-group{\n\ttop:20px;\n}\n\n.theme-header-acessibilidade{\n\theight: 25px;\n\tbackground-color: #555;\n}\n\n.theme-link-acessibilidade{\n\tposition: relative;\n\ttop: 3px;\n\tleft: 10px;\n}\n\n.theme-header-right {\n\t/* padding: 7px; */\n\t/*padding-right: 15px;*/\n}\n\n.theme-app.tabbed .theme-menu-container {\n    margin-top: 120px!important;\n}\n.theme-main-container {\n\tborder-left: 0px;\n\tbackground-color: #000;\n\tmargin: 0px 0 50px 0px;\n\tcolor: #fff;\n}\n\n.theme-app.collapse.in .theme-submenu-item > a {\n\tpadding-left: 20px;\n}\n\n.theme-app .theme-main-container {\n\tborder-left: 0px;\n\tbackground-color: #000;\n\tmargin: 70px 0 50px 0px;\n}\n\n.theme-app.menu .theme-main-container {\n\tmargin: 10px 0 50px 0px;\n}\n\t\n@media (min-width: 768px) {\n\t\n\t.theme-app.tabbed .theme-menu-container {\n\t    margin-top: 20px!important;\n\t}\n\t.theme-app .theme-menu-container {\n\t    margin-top: 0px!important;\n\t}\n\t.theme-app.collapse.in .theme-menu-container {\n\t\tmargin-top: 15px!important;\n\t}\n\t.theme-menu-container {\n\t\tposition: fixed;\n\t}\n\n\t.theme-app.menu .theme-main-container {\n\t\tmargin: 65px 0 50px 250px;\n\t}\n\n\t.theme-app.menu .theme-main-container {\n\t\tmargin: 65px 0 50px 250px;\n\t}\n\n\t.theme-app.collapse.in  .page-wrapper {\n\t\tmargin: 65px 0 50px 250px;\n\t}\n\n\t.theme-header-right {\n\t\tpadding-right: 15px;\n\t}\n\n\t.theme-app.collapse.in .theme-menu-container {\n\t\tmargin-top: 10px!important;\n\t}\n\n\n\n\t.theme-app.collapse.in  .page-wrapper {\n\t\tmargin: 65px 0 0 70px!important;\n\t}\n\n\t.theme-app.collapse.in .theme-menu-container {\n\t\tmargin-top: 0px!important;\n\t}\n\n\t.theme-main-container {\n\t\tmargin: 67px 0 0 70px;\n\t}\n\t.theme-menu-container {\n\t\tmargin-top: 3px!important;\n\t}\n}\n\n.sidebar-nav > .nav li > a.active {\n    margin: 0;\n    border-left: 4px solid #ffa100;\n    border-left-width: 4px;\n    border-left-style: solid;\n    border-left-color: #ffa100;\n    border-top: 1px solid #d9d9d9;\n    border-top-width: 1px;\n    border-top-style: solid;\n    border-top-color: rgb(217, 217, 217);\n    border-bottom: 1px solid #d9d9d9;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    border-bottom-color: rgb(217, 217, 217);\n    background-color: #333;\n    color: #333;\n}\n\n.theme-header .navbar-brand:hover {\n\tcolor: #fff;\n}\n.theme-footer .navbar-brand:hover {\n\tcolor: #fff;\n}\n\n\nbutton {\n\tmargin-right: 5px;\n\tbackground-color: #fff;\n}\n\n.table-responsive{\n\ttop:20px;\n}\n\n/* texto */\n.text-primary {\n    color: #fff;\n    top: 20px;\n}\n.text-primary-important {\n\tcolor: #fff!important;\n}\n.text-warning {\n\tcolor: #fff;\n}\n.text-warning-important {\n\tcolor: #fff!important;\n}\n.text-success {\n\tcolor: #fff;\n}\n.text-success-important {\n\tcolor: #fff!important;\n}\n.text-black {\n\tcolor: #fff;\n\tfont-weight: 100;\n}\n.text-purple {\n\tcolor: #fff;\n\tfont-weight: 100;\n}\n.text-laranja {\n\tcolor: #fff;\n\tfont-weight: 100;\n}\n.text-info {\n\tcolor: #fff;\n\tfont-weight: 100;\n}\n.text-danger {\n\tcolor: #fff;\n\tfont-weight: 100;\n}\n\n/* Botoes */\n\n.btn {\n\tcolor: #fff;\n\tbackground: #222;\n\tborder: #222;\n}\n\n.btn-primary.btn-outline,\n.btn-primary,\n.btn-default,\n.btn-default.btn-outline,\n.btn-secondary.btn-outline,\n.btn-secondary,\n.btn-success,\n.btn-success.btn-outline,\n.btn-info,\n.btn-info.btn-outline,\n.btn-warning,\n.btn-warning.btn-outline,\n.btn-danger,\n.btn-danger.btn-outline\n{\n\tcolor: #fff;\n\tbackground-color: #222;\n\tborder-color: #222;\n}\n\n.btn-primary:hover,\n.btn-primary[disabled]:hover,\n.btn-primary.btn-outline:hover,\n.btn-default:hover,\n.btn-default[disabled]:hover,\n.btn-default.btn-outline:hover,\n.btn-secondary:hover,\n.btn-secondary.btn-outline:hover,\n.btn-secondary[disabled]:hover,\n.btn-success:hover,\n.btn-success.btn-outline:hover,\n.btn-success[disabled]:hover,\n.btn-info:hover,\n.btn-info.btn-outline:hover,\n.btn-info[disabled]:hover,\n.btn-warning:hover,\n.btn-warning.btn-outline:hover,\n.btn-warning[disabled]:hover,\n.btn-danger:hover,\n.btn-danger.btn-outline:hover\n.btn-danger[disabled]:hover\n {\n \tcolor: #fff;\n\tbackground-color: #555;\n\tborder-color: #555;\n}\n\n.theme-menu-container {\n\tborder-right: 1px solid #ADADAD;\n\theight: 100%;\n\tbackground-color: #000;\n}\n\n.theme-main-container.menu {\n\tborder-left: 0px;\n\tbackground-color: #000;\n\tmargin: 0px 0 50px 0px;\n}\n\n.theme-main {\n\t\tbackground-color: #000;\n\t\ttext-align: left;\n}\n\n.theme-app.tabbed .page-wrapper {\n\tmargin-top: 110px;\n}\n\n\n.theme-menu-item {\n\tborder-bottom: 0px!important;\n}\n\n.theme-menu-item-caption{\n\tcolor: #fff;\n}\n\ni.fa,\nlabel{\n\tcolor: #fff;\n}\n\na,\na:hover{\n\tcolor: #fff333;\n}\n\n.table-striped > tbody > tr:nth-of-type(odd){\n\tbackground-color: #333;\n}\n\n.table-striped > tbody > tr:hover,\n.nav-tabs>li>a:hover,\n.nav>li>a:hover{\n\tbackground-color: #555;\n\tcolor: #fff;\n}\t\n\n.progress-bar{\n\tbackground-color: #666;\n\tborder-color: #fff\n}\n\n.pagination>.active>a,\n.pagination>.active>a:hover{\n\tbackground-color: #333;\n\tborder-color: #333\n}\n\n.pagination>li>a,\n.pagination>li>a:hover{\n\tbackground-color: #666;\n\tborder-color: #666;\n\tcolor: #fff;\n}\n\n.form-control,\n.input-group-addon:first-child{\n\tbackground-color: #333;\n\tborder-color: #fff;\n\tcolor: #fff;\n}\n\n.table-bordered{\n\tborder: none;\n}\n\n.table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, \n.table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, \n.table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th{\n\tcolor: #fff;\n\tborder-top: 1px solid #fff;\n}\n\n.btn-primary.active,\n.btn-primary.active:hover{\n\tbackground-color: #666;\n\tborder-color: #fff;\n}\n\n.panel-primary>.panel-heading {\n    color:#fff;\n    background-color: #555;\n    border-color: #fff;\n}\n\n.panel-primary>.panel-footer {\n    background-color: #333;\n    border-color: #fff;\n}\n\n.panel-primary {\n    border-color: #fff;\n}\n\n.tabs-nav .active {\n    background-color: #333;\n    color: #fff;\n}\n\n.tabs-nav a {\n\tbackground-color: #666;\n    color: #fff;\n}\n\n\n/* Material Design Switch */\n.material-switch-contraste-contraste {\n\tmargin-top: 5px;\n}\n.material-switch-contraste > input[type=\"checkbox\"] {\n\tdisplay: none;\n}\n\n.material-switch-contraste > label {\n\tcursor: pointer;\n\theight: 0px;\n\tposition: relative;\n\twidth: 40px;\n\ttop:-20px;\n}\n\n.material-switch-contraste > label::before {\n\tleft: 0px;\n\tbackground: rgb(0, 0, 0);\n\tbox-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);\n\tborder-radius: 8px;\n\tcontent: '';\n\theight: 13px;\n\tmargin-top: 3px;\n\tposition:absolute;\n\topacity: 0.3;\n\ttransition: all 0.4s ease-in-out;\n\twidth: 34px;\n\ttop: 11px;\n}\n.material-switch-contraste > label::after {\n\tbackground: rgb(255, 255, 255);\n\tborder-radius: 16px;\n\tbox-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);\n\tcontent: '';\n\theight: 20px;\n\tmargin-left: -6px;\n\tposition: absolute;\n\ttop: 11px;\n\ttransition: all 0.3s ease-in-out;\n\twidth: 20px;\n}\n\n.material-switch-contraste > input[type=\"checkbox\"]:checked + label::before {\n\tbackground: #fff;\n\tbox-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);\n\topacity: 1;\n\twidth: 34px;\n}\n\n.material-switch-contraste > input[type=\"checkbox\"]:checked + label::after {\n\tbackground: inherit;\n\tbox-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);\n\tleft: 20px;\n\theight: 20px;\n\twidth: 20px;\n}\n\n.breadcrumb{\n\tmargin-top: 10px;\n\tbackground-color: #333;\n}\n\n.breadcrumb>.active{\n\tcolor: #fff;\n}","icon":"fa-dropbox","contraste":20,"name":"Caixa Material Contraste Preto","value":"preto-theme-padrao.css","tema":0}
};

var DEFAULT_BUTTON_MESSAGE = "Procedimento executado com sucesso";
