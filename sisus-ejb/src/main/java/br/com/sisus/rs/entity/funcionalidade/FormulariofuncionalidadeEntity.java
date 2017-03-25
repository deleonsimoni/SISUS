	package br.com.sisus.rs.entity.funcionalidade;
/*
	Esta classe � a fronteira entre sua aplica��o e o seu banco de dados 	
	Aqui poderao ser implementadas todas as rotinas de persistencia necessarias a sua aplicacao
*/
import java.util.List;

import br.com.sisus.rs.entity.BaseEntity;

import java.util.ArrayList;
/**
 * 
 * @author SIOGP
 *
 */
public class FormulariofuncionalidadeEntity implements BaseEntity {
	private static final long serialVersionUID = 6933641140920629711L;
	private Long id;
	private String nomecadastro = "Nome de Entrada";
	private String datacadastro = "2016-01-02T10:00:00.000Z";
	private String listacadastro = "";
          private List<String> listacadastrocontent = new ArrayList<String>();
	public FormulariofuncionalidadeEntity() {
		super();
            	listacadastrocontent.add("Item 1");
            	listacadastrocontent.add("Item 2");
            	listacadastrocontent.add("Item 3");
         listacadastro = listacadastrocontent.get(0);
	}
	public Long getId() {
		return id;
	}
	public void setId(final Long valor) {
		id = valor;
	}
	public String getNomecadastro() {
		return nomecadastro;
	}
	public void setNomecadastro(final String valor) {
		nomecadastro = valor;
	}
	public String getDatacadastro() {
		return datacadastro;
	}
	public void setDatacadastro(final String valor) {
		datacadastro = valor;
	}
	public String getListacadastro() {
		return listacadastro;
	}
	public void setListacadastro(final String valor) {
		listacadastro = valor;
	}
	public List<String> getListacadastroContent() {
        return listacadastrocontent;
	}
	public void setListacadastroContent(List<String> lista) {
		this.listacadastrocontent = lista;
	}	
}

