package br.com.sisus;

/*
	Nesta classe � definida a integra��o com a coletagem de m�tricas. 	
	
	Esta coleta � enviada ao CaixaAnalythics e possibilita um amplo acompanhamento da utiliza��o do seu projeto por seus clientes.
	Os dados s�o enviados por post via threads ass�ncronas. 
	
	Para seu correto funcionamento � necess�rio acesso a internet, no entanto a impossibilidade de acessar a internet n�o ir� prejudicar o funcionamento da aplica��o.
	Para n�o comprometer a privacidade do seu usuario, nenhuma informacao particular deve ser enviada.
	ex: cpf, data de nascimento, endereco, etc
	
*/
import java.util.Random;

/**
 * 
 * @author SIOGP
 *
 */
public final class Metrics{
	private static final long MILISEGUNDOS = 1000L;
	private static final String ANALYTHICS_CODE = null; 
	//private CaixaAnalytics tracker = null;
	private static final String APP_NAME = "SISUS:1153d7f7c027211867778aff82789964c88bfd7f";
	private static final String APP_ID = "1153d7f7c027211867778aff82789964c88bfd7f";
	private static final String APP_CID = "SISUS_SERVICE";
	
	private static final String APP_VERSION = "1.0";
	private static final String APP_DESCR = "Modelo de Aplicação do PRIMO";
	private static final String APP_TYPE = "ANGULAR003v200";
	private static final String APP_CONTACT = "andre.lourdes@caixa.gov.br";
	private static final String APP_BUILDER_NAME = "andre.lourdes@caixa.gov.br";
	private static final String APP_BUILDER_FULL_NAME = "Andre Marcelo de Lourdes";
	private static final String APP_USER_ID = "5079";
	private static final String APP_VIEWS = "5";
	private static final String APP_MENUS = "2";	
	
	private static Metrics metric;
	
	public static Metrics getInstance() {
		if (metric == null) {
			metric = new Metrics();
		}
		return metric;
	}
	
	private Metrics() {
		
		if (ANALYTHICS_CODE != null) {			
			
			final int session = randInt(1, 2147483647);
			/*tracker = new CaixaAnalytics(ANALYTHICS_CODE,session,APP_CID);
			
			this.track("appID",APP_ID);
			this.track("appCID",APP_CID);
			this.track("appName",APP_NAME);
			this.track("appVersion",APP_VERSION);
			this.track("appDescr",APP_DESCR);
			this.track("appType",APP_TYPE);
			this.track("appContact",APP_CONTACT);
			this.track("appBuilderName",APP_BUILDER_NAME);
			this.track("appBuilderFullName",APP_BUILDER_FULL_NAME);
			this.track("appUserId",APP_USER_ID);
			
			this.track("appViews",APP_VIEWS);
			this.track("appMenus",APP_MENUS);*/
			
		}
	}
	
	public void track(String action, String label) {
		track(action,label,null);
	}
	public void track(String action){
		track(action,null,null);
	}	

	public void track(String action, String label, Integer version) {
		/*if (tracker == null) {
			return;
		}
		if (version != null) {
			tracker.trackEvent(action, label, version);
		} else if (label != null) {
			tracker.trackEvent(action, label);
		} else {
			tracker.trackEvent(action);
		}*/
	}		
	
		private int randInt(int min, int max) {
		Random rand = new Random();
		int randomNum = rand.nextInt((max - min) + 1) + min;

		return randomNum;
	}
}

