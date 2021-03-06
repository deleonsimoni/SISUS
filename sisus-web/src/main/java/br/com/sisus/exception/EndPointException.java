package br.com.sisus.exception;

import br.com.sisus.exception.GeneralException;

/**
 * 
 * @author SIOGP
 *
 */
public class EndPointException extends GeneralException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -906684481733836559L;
	
	public static final GeneralException RESPONSE_CODE_ERROR_GENERAL = new GeneralException(600,"Servidor momentaneamente inoperante");
	public static final GeneralException RESPONSE_CODE_ERROR_DATA_NOT_FOUND = new GeneralException(601,"Falha ao processar comando. Dados n?o recebidos");
	public static final GeneralException RESPONSE_CODE_ERROR_COMMAND_NOT_DEFINED = new GeneralException(602,"Falha ao processar comando. Comando n?o reconhecido: %s");
	public static final GeneralException RESPONSE_CODE_ERROR_INVALID_TOKEN = new GeneralException(603, "Usu?rio n?o identificado nesta sess?o.");
	public static final GeneralException RESPONSE_CODE_ERROR_INVALID_PARAMETER = new GeneralException(604, "Parametro n?o recebido: %s");
	
	public EndPointException(int code, String message) {
		super(code,message);
	}	
	public EndPointException(GeneralException general, String[]args) {
		super(general,args);
	}
	public EndPointException(GeneralException general, String arg) {
		super(general,arg);
	}	
	public EndPointException(GeneralException general) {
		super(general);
	}	


}

