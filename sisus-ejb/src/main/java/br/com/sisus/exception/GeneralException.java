package br.com.sisus.exception;

/**
 * 
 * @author SIOGP
 *
 */
public class GeneralException extends Exception {
	
	public static final GeneralException RESPONSE_CODE_ERROR_FAIL = new GeneralException(300,"Falha geral de processamento");
	public static final GeneralException RESPONSE_CODE_ERROR_USER_CHECK_FAIL = new GeneralException(301,"Falha ao identificar usu?rio");
	public static final GeneralException RESPONSE_CODE_ERROR_USER_PROCESS_FAIL = new GeneralException(302,"Falha ao processar usu?rio");
	public static final GeneralException RESPONSE_CODE_ERROR_USER_NOTIFICATION_FAIL = new GeneralException(303,"Falha ao notificar usu?rio");
	public static final GeneralException RESPONSE_CODE_ERROR_USER_GROUP_FAIL = new GeneralException(304,"Falha ao identificar grupo do usu?rio");
	public static final GeneralException RESPONSE_CODE_ERROR_PARSER_FAIL = new GeneralException(305,"Falha ao processar objeto (JSON)");
	public static final GeneralException RESPONSE_CODE_ERROR_FILEIO_FAIL = new GeneralException(306,"Falha ao ler/gravar dados em disco (IO)");
	public static final GeneralException RESPONSE_CODE_ERROR_SISGR_FAIL = new GeneralException(307,"Falha ao verificar o usuario no SISGR");
	public static final GeneralException RESPONSE_CODE_ERROR_USER_INSERT_FAIL = new GeneralException(308,"Falha ao inserir usu?rio");

	private static final long serialVersionUID = -717552789195978113L;
	private transient String message;
	private transient int code;
	private transient Exception error; 
	
	
	public GeneralException(int code, String message) {
		super();
		this.message = message;
		this.code = code;
	}
	
	public GeneralException(int code, String message, Exception error) {
		super();
		this.message = message;
		this.code = code;
		this.error = error;
	}
	
	public GeneralException(GeneralException general, String[]args) {
		super();
		this.message = String.format(general.getMessage(), (Object[])args);
		this.code = general.getCode();
	}
	public GeneralException(GeneralException general, String[]args, Exception cause) {
		super(cause);
		this.message = String.format(general.getMessage(), (Object[])args);
		this.code = general.getCode();
	}	
	public GeneralException(GeneralException general, String arg) {
		super();
		this.message = String.format(general.getMessage(), arg);
		this.code = general.getCode();
	}	
	public GeneralException(GeneralException general, String arg, Exception cause) {
		super(cause);
		this.message = String.format(general.getMessage(), arg);
		this.code = general.getCode();
	}	
	public GeneralException(GeneralException general) {
		super();
		this.message =general.getMessage();
		this.code = general.getCode();
	}	
	
	public GeneralException(GeneralException general, Exception cause) {
		super(cause);
		this.message = general.getMessage();
		this.code = general.getCode();
	}		
	
	@Override
	public String getMessage() {
		return message;
	}
	
	public int getCode() {
		return code;
	}
	
	public Exception getError() {
		return error;
	}
}

