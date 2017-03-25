package br.com.sisus.rs.resource;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.sisus.Authentication;
import br.com.sisus.Metrics;
import br.com.sisus.rs.retorno.Retorno;

/**
 * @author SIOGP
 */
public class Resource {

	protected Metrics metrics = Metrics.getInstance();
    protected Authentication auth = Authentication.getInstance();
	
	protected Response build(Status status, Object object) {
		return Response.status(status)
				.entity(object)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Credentials", "true")
				.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept")
				.build();
	}
	
	protected Response semAutorizacao(int authCode) {
	    final List<String> msgsErro = new ArrayList<String>();
	
	    msgsErro.add("Código de acesso " + Integer.toString(authCode) + " não autorizado");                                               
	
	    Retorno retorno = new Retorno();
	    retorno.setTemErro(true);
	    retorno.setMsgsErro(msgsErro);                                            
	
	    return build(Status.UNAUTHORIZED, retorno);
	}
}
