	package br.com.sisus.rs.requisicao.sobre;
import br.com.sisus.rs.requisicao.Requisicao;
/**
 * 
 * @author SIOGP
 *
 */
public class SobreRequisicao extends Requisicao {
	private static final long serialVersionUID = 3075165143170327078L;
	private Long id;
	private String link = "";
	private String listagem = "";
	private String imgIcon013primosiogpinvertedsmallpng = "";
	private String lnkPrimosiogp2 = "";
	public SobreRequisicao() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String valor) {
		link = valor;
	}
	public String getListagem() {
		return listagem;
	}
	public void setListagem(String valor) {
		listagem = valor;
	}
	public String getImgicon013primosiogpinvertedsmallpng() {
		return imgIcon013primosiogpinvertedsmallpng;
	}
	public void setImgicon013primosiogpinvertedsmallpng(String valor) {
		imgIcon013primosiogpinvertedsmallpng = valor;
	}
	public String getLnkprimosiogp2() {
		return lnkPrimosiogp2;
	}
	public void setLnkprimosiogp2(String valor) {
		lnkPrimosiogp2 = valor;
	}
}

