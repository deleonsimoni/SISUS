	package br.com.sisus.rs.requisicao.funcionalidade;
/*
	Esta classe armazena a informacao recebida e enviada entre o webservice e a interface
*/
import java.util.List;

import br.com.sisus.rs.requisicao.Requisicao;

import java.util.ArrayList;
/**
 * 
 * @author SIOGP
 *
 */
public class FormulariofuncionalidadeRequisicao extends Requisicao {
	private static final long serialVersionUID = 3075165143170327078L;
	private Long id;
	private String nomecadastro = "Nome de Entrada";
	private String datacadastro = "2016-01-02T10:00:00.000Z";
	private String listacadastro = "";
          private List<String> listacadastrocontent = new ArrayList<String>();
	public FormulariofuncionalidadeRequisicao() {
		super();
            	listacadastrocontent.add("Item 1");
            	listacadastrocontent.add("Item 2");
            	listacadastrocontent.add("Item 3");
         listacadastro = listacadastrocontent.get(0);
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNomecadastro() {
		return nomecadastro;
	}
	public void setNomecadastro(String valor) {
		nomecadastro = valor;
	}
	public String getDatacadastro() {
		return datacadastro;
	}
	public void setDatacadastro(String valor) {
		datacadastro = valor;
	}
	public String getListacadastro() {
		return listacadastro;
	}
	public void setListacadastro(String valor) {
		listacadastro = valor;
	}
	public List<String> getListacadastroContent() {
        return listacadastrocontent;
	}
	public void setListacadastroContent(List<String> lista) {
		this.listacadastrocontent = lista;
	}	
}

