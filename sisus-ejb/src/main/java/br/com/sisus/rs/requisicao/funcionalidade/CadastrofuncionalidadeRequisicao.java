	package br.com.sisus.rs.requisicao.funcionalidade;
/*
	Esta classe armazena a informacao recebida e enviada entre o webservice e a interface
*/
import java.util.List;

import br.com.sisus.rs.requisicao.Requisicao;

import java.util.ArrayList;
import java.util.HashMap;
/**
 * 
 * @author SIOGP
 *
 */
public class CadastrofuncionalidadeRequisicao extends Requisicao {
	private static final long serialVersionUID = 3075165143170327078L;
	private Long id;
	private String nomepesquisa = "";
    private List<String> tabelacontent = new ArrayList<String>();
    private List<HashMap<String,String>> tabeladata = new ArrayList<HashMap<String,String>>();
	private String rule = "";
	public CadastrofuncionalidadeRequisicao() {
		super();
      	 final HashMap<String,String> tabeladataMap = new HashMap<String,String>();
            	tabelacontent.add("Coluna 1");        
            	tabeladataMap.put("Coluna 1","valor");
            	tabelacontent.add("Coluna 2");        
            	tabeladataMap.put("Coluna 2","valor");
            	tabelacontent.add("Coluna 3");        
            	tabeladataMap.put("Coluna 3","valor");
        tabeladata.add(tabeladataMap);
        tabeladata.add(tabeladataMap);
        tabeladata.add(tabeladataMap);
        tabeladata.add(tabeladataMap);
        tabeladata.add(tabeladataMap);
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNomepesquisa() {
		return nomepesquisa;
	}
	public void setNomepesquisa(String valor) {
		nomepesquisa = valor;
	}
	public List<String> getTabela() {
        return tabelacontent;
	}
	public void setTabela(List<String> lista) {
		this.tabelacontent = lista;
	}	
	public List<HashMap<String,String>> getTabelaData() {
        return tabeladata;
	}
	public void setTabelaData(List<HashMap<String,String>> lista) {
		this.tabeladata = lista;
	}
	public String getRule() {
		return rule;
	}
	public void setRule(String valor) {
		rule = valor;
	}
}

