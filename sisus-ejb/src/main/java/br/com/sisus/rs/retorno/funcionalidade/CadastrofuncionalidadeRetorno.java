package br.com.sisus.rs.retorno.funcionalidade;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import br.com.sisus.rs.entity.funcionalidade.CadastrofuncionalidadeEntity;
import br.com.sisus.rs.retorno.Retorno;
/**
 * 
 * @author SIOGP
 *
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class  CadastrofuncionalidadeRetorno extends Retorno {
	@XmlElementWrapper(name="tipos")
	@XmlElement(name="tipo")
	private List<CadastrofuncionalidadeEntity> data;
	public CadastrofuncionalidadeRetorno() {
		data = new ArrayList<CadastrofuncionalidadeEntity>();		
	}
	public List<CadastrofuncionalidadeEntity> getData() {
		return data;
	}
	public void setData(List<CadastrofuncionalidadeEntity> data) {
		this.data = data;
	}
}

