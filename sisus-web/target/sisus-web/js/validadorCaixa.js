//Criação dos REGEX para validação na formatação dos campos
var REGEX_CPF = "^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$";
var REGEX_CNPJ = "^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}\\-\\d{2}$";
var REGEX_NIS_PIS_PASEP = "^\\d{3}\\.\\d{4}\\.\\d{3}\\-\\d{1}$";
var REGEX_CEP = "^\\d{5}\\-\\d{3}$";
var REGEX_AGENCIA = "^\\d{4}$";
var REGEX_MATRICULA = "^\([A-z]{1})\\d{6}$";
var REGEX_EMAIL = "^([a-z0-9_\.-]+)@([\da-z\.-]+)\\.([a-z\.]{2,6})$";
var REGEX_TELEFONE = "^\\([1-9]{2}\\)[2-9][0-9]{3,4}\\-[0-9]{4}$";
var REGEX_MOEDA_BRASIL = "^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$";
var REGEX_MOEDA_EUA = "/^((?:\d{1,3}\,?)+)(\.\d{1,2})/";



//Dispara função para verificar o CPF
function disparaCPF(strCPF){

	//Chama função de verificar CPF
	showError = validaCPF(strCPF);
	if(!showError) {
		$('#cpf-help').removeClass('hide');
		$('#cpf-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#cpf-help').addClass('hide');
		$('#cpf-group').addClass('has-success').removeClass('has-error');
	}

}

//Dispara função para verificar a agência
function disparaAgencia(strAgencia){

	//Chama função de verificar agência
	showError = validaAgencia(strAgencia);
	if(!showError) {
		$('#agencia-help').removeClass('hide');
		$('#agencia-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#agencia-help').addClass('hide');
		$('#agencia-group').addClass('has-success').removeClass('has-error');
	}

}

//Dispara função para verificar a matrícula
function disparaMatricula(strMatricula){

	//Chama função de verificar matrícula
	showError = validaCPF(strMatricula);
	if(!showError) {
		$('#matricula-help').removeClass('hide');
		$('#matricula-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#matricula-help').addClass('hide');
		$('#matricula-group').addClass('has-success').removeClass('has-error');
	}

}

//Dispara função para verificar a operação
function disparaOperacao(strOperacao){

	//Chama função de verificar operação
	showError = validaCPF(strOperacao);
	if(!showError) {
		$('#operacao-help').removeClass('hide');
		$('#operacao-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#operacao-help').addClass('hide');
		$('#operacao-group').addClass('has-success').removeClass('has-error');
	}

}

//Dispara função para verificar o CNPJ
function disparaCNPJ(strCNPJ){

	//Chama função de verificar CNPJ
	showError = validaCNPJ(strCNPJ);
	if(!showError) {
		$('#cnpj-help').removeClass('hide');
		$('#cnpj-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#cnpj-help').addClass('hide');
		$('#cnpj-group').addClass('has-success').removeClass('has-error');
	}

}

//Dispara função para verificar o PIS
function disparaPIS(strNIS){

	//Chama função de verificar NIS
	showError = validaNIS_PIS_PASEP(strNIS);
	if(!showError) {
		$('#pis-help').removeClass('hide');
		$('#pis-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#pis-help').addClass('hide');
		$('#pis-group').addClass('has-success').removeClass('has-error');
	}

}

//Dispara função para verificar o NIS
function disparaNIS(strNIS){

	//Chama função de verificar NIS
	showError = validaNIS_PIS_PASEP(strNIS);
	if(!showError) {
		$('#nis-help').removeClass('hide');
		$('#nis-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#nis-help').addClass('hide');
		$('#nis-group').addClass('has-success').removeClass('has-error');
	}

}

//Dispara função para verificar o PASEP
function disparaPASEP(strNIS){

	//Chama função de verificar NIS
	showError = validaNIS_PIS_PASEP(strNIS);
	if(!showError) {
		$('#pasep-help').removeClass('hide');
		$('#pasep-group').addClass('has-error').removeClass('has-success');
	}
	if(showError) {
		$('#pasep-help').addClass('hide');
		$('#pasep-group').addClass('has-success').removeClass('has-error');
	}

}

//Metodo resposavel por validar o campo CPF
function validaCPF(strCPF){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_CPF);
	if(!padrao.test(strCPF.value)){
		strCPF.value='';
		strCPF.focus();
		return false;
	}

	//Retira do valor apenas os númericos para efetuar o calculo
	var cpf = strCPF.value.replace(/[^\d]+/g,'');

	//Verifica se o campo está vazio
	if(cpf == '') {
		strCPF.value='';
		strCPF.focus();
		return false;
	}

	// Verifica numeros repetidos no cpf, para evitar que processe cpf já invalido
	if (cpf.length != 11 ||
		cpf == "00000000000" ||
		cpf == "11111111111" ||
		cpf == "22222222222" ||
		cpf == "33333333333" ||
		cpf == "44444444444" ||
		cpf == "55555555555" ||
		cpf == "66666666666" ||
		cpf == "77777777777" ||
		cpf == "88888888888" ||
		cpf == "99999999999"){
		strCPF.value='';
		strCPF.focus();
		return false;
	}

	// Valida 1o digito verificador
	add = 0;
	for (i=0; i < 9; i ++)
		add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(9))){
		strCPF.value='';
		strCPF.focus();
		return false;
	}

	// Valida 2o digito verificador 
	add = 0;
	for (i = 0; i < 10; i ++)
		add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
		rev = 0;
	if (rev != parseInt(cpf.charAt(10))) {
		strCPF.value='';
		strCPF.focus();
		return false;
	}

	return true;
}


//Funcao responsavel por validar o campo CNPJ
function validaCNPJ(strCNPJ){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_CNPJ);
	if(!padrao.test(strCNPJ.value)){
		strCNPJ.value='';
		strCNPJ.focus();
		return false;
	}

	//Retira do valor apenas os dados numericos
	var cnpj = strCNPJ.value.replace(/[^\d]+/g,'');

	//verifica se o cnpj está vazio
	if(cnpj == ''){
		strCNPJ.value='';
		strCNPJ.focus();
		return false;
	}

	//Verifica se o campo digitado tem o tamanho adequado para um CNPJ
	if (cnpj.length != 14){
		strCNPJ.value='';
		strCNPJ.focus();
		return false;
	}

	// Verifica numeros repetidos no cnpj, para evitar que processe cnpj já invalido
	if (cnpj == "00000000000000" ||
		cnpj == "11111111111111" ||
		cnpj == "22222222222222" ||
		cnpj == "33333333333333" ||
		cnpj == "44444444444444" ||
		cnpj == "55555555555555" ||
		cnpj == "66666666666666" ||
		cnpj == "77777777777777" ||
		cnpj == "88888888888888" ||
		cnpj == "99999999999999"){

		strCNPJ.value='';
		strCNPJ.focus();
		return false;

	}

	// Validar o digito verificadore - 01 - do CNPJ
	tamanho = cnpj.length - 2
	numeros = cnpj.substring(0,tamanho);
	digitos = cnpj.substring(tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
			pos = 9;
	}

	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

	//Digito validador invalido
	if (resultado != digitos.charAt(0)){
		strCNPJ.value='';
		strCNPJ.focus();
		return false;
	}

	// Validar o digito verificadore - 02 - do CNPJ
	tamanho = tamanho + 1;
	numeros = cnpj.substring(0,tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
			pos = 9;
	}

	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

	//Digito validador invalido
	if (resultado != digitos.charAt(1)){
		strCNPJ.value='';
		strCNPJ.focus();
		return false;
	}

	return true;

}


//Função de validação para NIS, PIS, PASEP
function validaNIS_PIS_PASEP(strNisPisPasep){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_NIS_PIS_PASEP);
	if(!padrao.test(strNisPisPasep.value)){
		strNisPisPasep.value='';
		strNisPisPasep.focus();
		return false;
	}

	//Retira pontos e hífen do valor do campo
	var numero_pis = strNisPisPasep.value.replace(/[^\d]+/g,'');

	//Variaveis de controle de validação
	var soma=0;
	var resto=0;

	//Verifica o tamanho do campo e o conteúdo
	if(numero_pis != "" && numero_pis.length == 11){
		var crppis = parseInt(numero_pis.substr(10,1));
		if(isNaN(crppis)){
			strNisPisPasep.value = '';
			strNisPisPasep.focus();
			return false;
		}

		var soma = 0;

		//Executa o cálculo para a validação do campo
		for(var cont=0;cont<numero_pis.length;cont++){
			if(cont==0)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 3);
			if(cont==1)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 2);
			if(cont==2)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 9);
			if(cont==3)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 8);
			if(cont==4)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 7);
			if(cont==5)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 6);
			if(cont==6)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 5);
			if(cont==7)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 4);
			if(cont==8)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 3);
			if(cont==9)soma = soma + (parseInt(numero_pis.substr(cont,1)) * 2);
		}

		resto=11 - (soma % 11);

		if((resto == 10) || (resto == 11))

			resto = 0;

		if(resto == crppis){

			return true;

		}else{
			strNisPisPasep.value = '';
			strNisPisPasep.focus();
			return false;
		}

	}else{
		strNisPisPasep.value = '';
		strNisPisPasep.focus();
		return false;
	}
}


function validaCEP(strCEP){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_CEP);
	if(!padrao.test(strCEP.value)){
		$('#cep-help').removeClass('hide');
		$('#cep-group').addClass('has-error').removeClass('has-success');
		strCEP.value='';
		strCEP.focus();
		return false;
	} else {
		$('#cep-help').addClass('hide');
		$('#cep-group').addClass('has-success').removeClass('has-error');
	}

}

function validaAgencia(strAgencia){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_AGENCIA);
	if(!(strAgencia.value.length == 4 && padrao.test(strAgencia.value))){
		strAgencia.value='';
		strAgencia.focus();
		return false;
	} else {
		return true;
	}

}

function validaConta(strConta){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_CONTA);
	if(!strConta.length <= 9){
		strConta.value='';
		strConta.focus();
		return false;
	}

}

function validaOperacao(strOperacao){

	var isCorreto = false;
	var operacoesValidasCaixa = [
		"001",
		"002",
		"003",
		"006",
		"008",
		"013",
		"022",
		"023",
		"028"
	]


	for (i = 0; i < operacoesValidasCaixa.length; i++) {
		if(operacoesValidasCaixa[i] == strOperacao.value){
			isCorreto = true;
			break;
		}
	}

	if(!isCorreto){
		$('#operacao-help').removeClass('hide');
		$('#operacao-group').addClass('has-error').removeClass('has-success');
		strOperacao.value='';
		strOperacao.focus();
	} else {
		$('#operacao-help').addClass('hide');
		$('#operacao-group').addClass('has-success').removeClass('has-error');
	}

}

function validaMatricula(strMatricula){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_MATRICULA);
	if(!padrao.test(strMatricula.value)){
		$('#matricula-help').removeClass('hide');
		$('#matricula-group').addClass('has-error').removeClass('has-success');
		strMatricula.value='';
		strMatricula.focus();
		return false;
	} else {
		$('#matricula-help').addClass('hide');
		$('#matricula-group').addClass('has-success').removeClass('has-error');
	}

}

function validaEmail(strEmail){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_EMAIL);
	if(!padrao.test(strEmail.value)){
		$('#email-help').removeClass('hide');
		$('#email-group').addClass('has-error').removeClass('has-success');
		strEmail.value='';
		strEmail.focus();
		return false;
	} else {
		$('#email-help').addClass('hide');
		$('#email-group').addClass('has-success').removeClass('has-error');
	}

}

function validaTelefone(strTelefone){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_TELEFONE);
	if(!padrao.test(strTelefone.value)){
		$('#telefone-help').removeClass('hide');
		$('#telefone-group').addClass('has-error').removeClass('has-success');
		strTelefone.value='';
		strTelefone.focus();
		return false;
	} else {
		$('#telefone-help').addClass('hide');
		$('#telefone-group').addClass('has-success').removeClass('has-error');
	}

}

function validaMoedaBrasil(strMoeda){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_MOEDA_BRASIL);
	if(!padrao.test(strMoeda.value)){
		$('#moeda-brasil-help').removeClass('hide');
		$('#moeda-brasil-group').addClass('has-error').removeClass('has-success');
		strMoeda.value='';
		strMoeda.focus();
		return false;
	} else {
		$('#moeda-brasil-help').addClass('hide');
		$('#moeda-brasil-group').addClass('has-success').removeClass('has-error');
	}

}

function validaMoedaEua(strMoeda){

	//Verifica se o campo foi formatado corretamente
	var padrao = new RegExp(REGEX_MOEDA_EUA);
	if(!padrao.test(strMoeda.value)){
		$('#moeda-eua-help').removeClass('hide');
		$('#moeda-eua-group').addClass('has-error').removeClass('has-success');
		strMoeda.value='';
		strMoeda.focus();
		return false;
	} else {
		$('#moeda-eua-help').addClass('hide');
		$('#moeda-eua-group').addClass('has-success').removeClass('has-error');
	}

}

function mascaraMoeda(strMoeda){
	$('#'+strMoeda.id+'').maskMoney();
}