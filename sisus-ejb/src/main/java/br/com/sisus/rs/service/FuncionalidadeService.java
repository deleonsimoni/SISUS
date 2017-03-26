package br.com.sisus.rs.service;
/*
	Nesta classe é definido o EJB do seu projeto. 	
	Para este template cada tela possui seu proprio EJB
*/
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Named;
import org.apache.log4j.Logger;

import br.com.sisus.rs.entity.funcionalidade.CadastrofuncionalidadeEntity;
import br.com.sisus.rs.entity.funcionalidade.FormulariofuncionalidadeEntity;
import br.com.sisus.rs.requisicao.funcionalidade.CadastrofuncionalidadeRequisicao;
import br.com.sisus.rs.requisicao.funcionalidade.FormulariofuncionalidadeRequisicao;
import br.com.sisus.rs.retorno.funcionalidade.CadastrofuncionalidadeRetorno;
import br.com.sisus.rs.retorno.funcionalidade.FormulariofuncionalidadeRetorno;
/**
 * 
 * @author SIOGP
 *
 */
@Stateless
@LocalBean
@Named
public class FuncionalidadeService {
	private static final Logger LOGGER = Logger.getLogger(FuncionalidadeService.class);
	/* colecao da tela Cadastrofuncionalidade*/
	private Map<Long, Object> elementosCadastrofuncionalidade;
	/* colecao da tela Formulariofuncionalidade*/
	private Map<Long, Object> elementosFormulariofuncionalidade;
	public FuncionalidadeService() {
		super();
/*
	As variaveis elementosXXXX armazenam em memoria uma coleção de objetos a serem exibidos em tela.
	Faz-se útil em caso de tabelas	
*/
		/* inicialização da coleção da tela Cadastrofuncionalidade*/
		elementosCadastrofuncionalidade = new HashMap<Long, Object>();
		/* inicialização da coleção da tela Formulariofuncionalidade*/
		elementosFormulariofuncionalidade = new HashMap<Long, Object>();
/*
	A inicialização dos elementos abaixo somente é necessario para a demonstracao da carga inicial dos elementos em tela.
	Deve ser removido quando não for mais necessário
*/
		CadastrofuncionalidadeEntity cadastrofuncionalidade = new CadastrofuncionalidadeEntity();
		elementosCadastrofuncionalidade.put(cadastrofuncionalidade.getId(), cadastrofuncionalidade);
		FormulariofuncionalidadeEntity formulariofuncionalidade = new FormulariofuncionalidadeEntity();
		elementosFormulariofuncionalidade.put(formulariofuncionalidade.getId(), formulariofuncionalidade);
	}
/*
	O metodo createCadastrofuncionalidade é utilizado para incluir um CadastrofuncionalidadeEntity na colecao de elementosCadastrofuncionalidade.		
*/
	public  CadastrofuncionalidadeRetorno createCadastrofuncionalidade(CadastrofuncionalidadeRequisicao requisicao) {
		LOGGER.info("Chamando o metodo: create()");
		CadastrofuncionalidadeEntity cadastrofuncionalidade = new CadastrofuncionalidadeEntity();
		cadastrofuncionalidade.setId(System.currentTimeMillis());
	   cadastrofuncionalidade.setNomepesquisa(requisicao.getNomepesquisa());
	   cadastrofuncionalidade.setRule(requisicao.getRule());
		elementosCadastrofuncionalidade.put(cadastrofuncionalidade.getId(), cadastrofuncionalidade);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Inclusão feita com sucesso.");
		CadastrofuncionalidadeRetorno retorno = new CadastrofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		retorno.getData().add(cadastrofuncionalidade);
		return retorno;
	}
/*
	O metodo readAllCadastrofuncionalidade() é utilizado para obter todos os CadastrofuncionalidadeEntity existentes na colecao de elementosCadastrofuncionalidade.	
*/
	public CadastrofuncionalidadeRetorno readAllCadastrofuncionalidade() {
		LOGGER.info("Chamando o metodo: readAll()");
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Leitura feita com sucesso.");
		CadastrofuncionalidadeRetorno retorno = new CadastrofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		for (Object cadastrofuncionalidade: elementosCadastrofuncionalidade.values()) {
			retorno.getData().add((CadastrofuncionalidadeEntity) cadastrofuncionalidade);
		}
		return retorno;
	}
/*
	O metodo readCadastrofuncionalidade(Long id) é utilizado para obter um elemento CadastrofuncionalidadeEntity existente na colecao de elementosCadastrofuncionalidade.
*/
	public CadastrofuncionalidadeRetorno readCadastrofuncionalidade(Long id) {
		LOGGER.info("Chamando o metodo: read("+id+")");
		CadastrofuncionalidadeEntity cadastrofuncionalidade = (CadastrofuncionalidadeEntity) elementosCadastrofuncionalidade.get(id);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Leitura por \"id\" feita com sucesso.");
		CadastrofuncionalidadeRetorno retorno = new CadastrofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		retorno.getData().add(cadastrofuncionalidade);
		return retorno;
	}
/*
	O metodo updateCadastrofuncionalidade é utilizado para atualizar um elemento CadastrofuncionalidadeEntity existente na colecao de elementosCadastrofuncionalidade.
*/
	public CadastrofuncionalidadeRetorno updateCadastrofuncionalidade(Long id, CadastrofuncionalidadeRequisicao requisicao) {
		LOGGER.info("Chamando o metodo: update("+id+","+requisicao+")");
		CadastrofuncionalidadeEntity cadastrofuncionalidade = (CadastrofuncionalidadeEntity) elementosCadastrofuncionalidade.get(id);
	   cadastrofuncionalidade.setNomepesquisa(requisicao.getNomepesquisa());
	   cadastrofuncionalidade.setRule(requisicao.getRule());
		elementosCadastrofuncionalidade.remove(id);
		elementosCadastrofuncionalidade.put(id, cadastrofuncionalidade);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Atualização feita com sucesso.");
		CadastrofuncionalidadeRetorno retorno = new CadastrofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		retorno.getData().add(cadastrofuncionalidade);
		return retorno;
	}
/*
	O metodo deleteCadastrofuncionalidade é utilizado para remover um elemento CadastrofuncionalidadeEntity existente na colecao de elementosCadastrofuncionalidade.
*/
	public CadastrofuncionalidadeRetorno deleteCadastrofuncionalidade(Long id) {
		LOGGER.info("Chamando o metodo: delete("+id+")");
		elementosCadastrofuncionalidade.remove(id);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Exclusão feita com sucesso.");
		CadastrofuncionalidadeRetorno retorno = new CadastrofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		return retorno;
	}
/*
	O metodo createFormulariofuncionalidade é utilizado para incluir um FormulariofuncionalidadeEntity na colecao de elementosFormulariofuncionalidade.		
*/
	public  FormulariofuncionalidadeRetorno createFormulariofuncionalidade(FormulariofuncionalidadeRequisicao requisicao) {
		LOGGER.info("Chamando o metodo: create()");
		FormulariofuncionalidadeEntity formulariofuncionalidade = new FormulariofuncionalidadeEntity();
		formulariofuncionalidade.setId(System.currentTimeMillis());
	   formulariofuncionalidade.setNomecadastro(requisicao.getNomecadastro());
	   formulariofuncionalidade.setDatacadastro(requisicao.getDatacadastro());
	   formulariofuncionalidade.setListacadastro(requisicao.getListacadastro());
		elementosFormulariofuncionalidade.put(formulariofuncionalidade.getId(), formulariofuncionalidade);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Inclusão feita com sucesso.");
		FormulariofuncionalidadeRetorno retorno = new FormulariofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		retorno.getData().add(formulariofuncionalidade);
		return retorno;
	}
/*
	O metodo readAllFormulariofuncionalidade() é utilizado para obter todos os FormulariofuncionalidadeEntity existentes na colecao de elementosFormulariofuncionalidade.	
*/
	public FormulariofuncionalidadeRetorno readAllFormulariofuncionalidade() {
		LOGGER.info("Chamando o metodo: readAll()");
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Leitura feita com sucesso.");
		FormulariofuncionalidadeRetorno retorno = new FormulariofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		for (Object formulariofuncionalidade: elementosFormulariofuncionalidade.values()) {
			retorno.getData().add((FormulariofuncionalidadeEntity) formulariofuncionalidade);
		}
		return retorno;
	}
/*
	O metodo readFormulariofuncionalidade(Long id) é utilizado para obter um elemento FormulariofuncionalidadeEntity existente na colecao de elementosFormulariofuncionalidade.
*/
	public FormulariofuncionalidadeRetorno readFormulariofuncionalidade(Long id) {
		LOGGER.info("Chamando o metodo: read("+id+")");
		FormulariofuncionalidadeEntity formulariofuncionalidade = (FormulariofuncionalidadeEntity) elementosFormulariofuncionalidade.get(id);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Leitura por \"id\" feita com sucesso.");
		FormulariofuncionalidadeRetorno retorno = new FormulariofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		retorno.getData().add(formulariofuncionalidade);
		return retorno;
	}
/*
	O metodo updateFormulariofuncionalidade é utilizado para atualizar um elemento FormulariofuncionalidadeEntity existente na colecao de elementosFormulariofuncionalidade.
*/
	public FormulariofuncionalidadeRetorno updateFormulariofuncionalidade(Long id, FormulariofuncionalidadeRequisicao requisicao) {
		LOGGER.info("Chamando o metodo: update("+id+","+requisicao+")");
		FormulariofuncionalidadeEntity formulariofuncionalidade = (FormulariofuncionalidadeEntity) elementosFormulariofuncionalidade.get(id);
	   formulariofuncionalidade.setNomecadastro(requisicao.getNomecadastro());
	   formulariofuncionalidade.setDatacadastro(requisicao.getDatacadastro());
	   formulariofuncionalidade.setListacadastro(requisicao.getListacadastro());
		elementosFormulariofuncionalidade.remove(id);
		elementosFormulariofuncionalidade.put(id, formulariofuncionalidade);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Atualização feita com sucesso.");
		FormulariofuncionalidadeRetorno retorno = new FormulariofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		retorno.getData().add(formulariofuncionalidade);
		return retorno;
	}
/*
	O metodo deleteFormulariofuncionalidade é utilizado para remover um elemento FormulariofuncionalidadeEntity existente na colecao de elementosFormulariofuncionalidade.
*/
	public FormulariofuncionalidadeRetorno deleteFormulariofuncionalidade(Long id) {
		LOGGER.info("Chamando o metodo: delete("+id+")");
		elementosFormulariofuncionalidade.remove(id);
		List<String> msgsErro = new ArrayList<String>();
		msgsErro.add("Exclusão feita com sucesso.");
		FormulariofuncionalidadeRetorno retorno = new FormulariofuncionalidadeRetorno();
		retorno.setTemErro(Boolean.FALSE);
		retorno.setMsgsErro(msgsErro);
		return retorno;
	}
}

