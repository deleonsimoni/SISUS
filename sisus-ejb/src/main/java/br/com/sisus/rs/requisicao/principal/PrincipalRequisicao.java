package br.com.sisus.rs.requisicao.principal;
import br.com.sisus.rs.requisicao.Requisicao;
/**
 * 
 * @author SIOGP
 *
 */
public class PrincipalRequisicao extends Requisicao {
	private static final long serialVersionUID = 3075165143170327078L;
	private Long id;
	private String imagem = "";
	public PrincipalRequisicao() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getImagem() {
		return imagem;
	}
	public void setImagem(String valor) {
		imagem = valor;
	}
}

