package br.com.sisus.exception;

/**
 * 
 * @author SIOGP
 *
 */
public class DatabaseException extends GeneralException {

	private static final String MSG_ERRO_FALHA_REQUISICAO = "Falha ao processar requisi??o: %s";
	private static final String MSG_ERRO_SERVIDOR_INOPERANTE = "Servidor momentaneamente inoperante";
	private static final int ERRO_DATABASE_700 = 700;
	/**
	 * 
	 */
	private static final long serialVersionUID = 4047095000189213620L;
	public static final DatabaseException RESPONSE_CODE_ERROR_GENERAL = new DatabaseException(ERRO_DATABASE_700,MSG_ERRO_SERVIDOR_INOPERANTE);
	public static final DatabaseException RESPONSE_CODE_ERROR_PROCESS_FAIL = new DatabaseException(ERRO_DATABASE_700,MSG_ERRO_FALHA_REQUISICAO);
	
	public DatabaseException(int code, String message) {
		super(code,message);
	}	
	public DatabaseException(GeneralException general, String[]args) {
		super(general,args);
	}
	public DatabaseException(GeneralException general, String arg) {
		super(general,arg);
	}	
	public DatabaseException(GeneralException general) {
		super(general);
	}	


}

