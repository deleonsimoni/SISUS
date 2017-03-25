	package br.com.sisus.rs.resource;
/*
	Nesta classe � definido o Webservice do seu projeto. 	
	Para este template cada funcionalidade possui seu proprio Webservice que � compartilhado por suas telas
*/
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.HeaderParam;

import br.com.sisus.rs.requisicao.funcionalidade.CadastrofuncionalidadeRequisicao;
import br.com.sisus.rs.requisicao.funcionalidade.FormulariofuncionalidadeRequisicao;
import br.com.sisus.rs.retorno.Retorno;
import br.com.sisus.rs.service.FuncionalidadeService;
/**
 * 
 * @author SIOGP
 *
 */
@RequestScoped
@Path("/funcionalidade")
@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class FuncionalidadeResource extends Resource {
	public FuncionalidadeResource() {
		metrics.track("webservice","Funcionalidade");
	}
	@EJB
	private FuncionalidadeService service;
	@POST @Path("/cadastrofuncionalidade")
	public Response createCadastrofuncionalidade(@HeaderParam("authCode") int authCode, CadastrofuncionalidadeRequisicao requisicao) {
		metrics.track("create","CadastrofuncionalidadeRequisicao");
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.createCadastrofuncionalidade(requisicao);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@PUT  @Path("/cadastrofuncionalidade/{id}")
	public Response updateCadastrofuncionalidade(@HeaderParam("authCode") int authCode, @PathParam("id") Long id, CadastrofuncionalidadeRequisicao requisicao) {
		metrics.track("update","CadastrofuncionalidadeRequisicao");
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.updateCadastrofuncionalidade(id, requisicao);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@GET @Path("/cadastrofuncionalidade")
	public Response readAllCadastrofuncionalidade(@HeaderParam("authCode") int authCode) {
		metrics.track("readAll");
		        if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.readAllCadastrofuncionalidade();
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@GET @Path("/cadastrofuncionalidade/{id}")
	public Response readCadastrofuncionalidade(@HeaderParam("authCode") int authCode, @PathParam("id") Long id) {
		metrics.track("read",Long.toString(id));	
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.readCadastrofuncionalidade(id);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@DELETE  @Path("/cadastrofuncionalidade/{id}")
	public Response deleteCadastrofuncionalidade(@HeaderParam("authCode") int authCode, @PathParam("id") Long id) {
		metrics.track("delete",Long.toString(id));		
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.deleteCadastrofuncionalidade(id);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@POST @Path("/formulariofuncionalidade")
	public Response createFormulariofuncionalidade(@HeaderParam("authCode") int authCode, FormulariofuncionalidadeRequisicao requisicao) {
		metrics.track("create","FormulariofuncionalidadeRequisicao");
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.createFormulariofuncionalidade(requisicao);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@PUT  @Path("/formulariofuncionalidade/{id}")
	public Response updateFormulariofuncionalidade(@HeaderParam("authCode") int authCode, @PathParam("id") Long id, FormulariofuncionalidadeRequisicao requisicao) {
		metrics.track("update","FormulariofuncionalidadeRequisicao");
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.updateFormulariofuncionalidade(id, requisicao);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@GET @Path("/formulariofuncionalidade")
	public Response readAllFormulariofuncionalidade(@HeaderParam("authCode") int authCode) {
		metrics.track("readAll");
		        if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.readAllFormulariofuncionalidade();
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@GET @Path("/formulariofuncionalidade/{id}")
	public Response readFormulariofuncionalidade(@HeaderParam("authCode") int authCode, @PathParam("id") Long id) {
		metrics.track("read",Long.toString(id));	
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.readFormulariofuncionalidade(id);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
	@DELETE  @Path("/formulariofuncionalidade/{id}")
	public Response deleteFormulariofuncionalidade(@HeaderParam("authCode") int authCode, @PathParam("id") Long id) {
		metrics.track("delete",Long.toString(id));		
		if (authCode != auth.getCode()) {
        	return semAutorizacao(authCode);
        }        
		Status status = Status.OK;
        Retorno retorno = service.deleteFormulariofuncionalidade(id);
        if (retorno != null && retorno.isTemErro()) {
            status = Status.NOT_FOUND;
        }
        return build(status, retorno);
	}
}

