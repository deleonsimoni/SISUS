	package br.com.sisus.rs.entity.funcionalidade;
/*
	Esta classe � a fronteira entre sua aplica��o e o seu banco de dados 	
	Aqui poderao ser implementadas todas as rotinas de persistencia necessarias a sua aplicacao
*/
import java.util.List;

import br.com.sisus.rs.entity.BaseEntity;

import java.util.ArrayList;
import java.util.HashMap;
/**
 * 
 * @author SIOGP
 *
 */
public class CadastrofuncionalidadeEntity implements BaseEntity {
	private static final long serialVersionUID = 6933641140920629711L;
	private Long id;
	private String nomepesquisa = "";
          private List<String> tabelacontent = new ArrayList<String>();
          private List<HashMap<String,String>> tabeladata = new ArrayList<HashMap<String,String>>();
	private String rule = "";
	public CadastrofuncionalidadeEntity() {
		super();
		 				tabelacontent.add("Coluna 1");
		 				tabelacontent.add("Coluna 2");
		 				tabelacontent.add("Coluna 3");
		     		HashMap<String, String> tabelacontent1 = new HashMap<String,String>();
			     				tabelacontent1.put("Coluna 1", "itemLinha1");
			     				tabelacontent1.put("Coluna 2", "itemLinha1");
			     				tabelacontent1.put("Coluna 3", "itemLinha1");
     		tabeladata.add(tabelacontent1);
		     		HashMap<String, String> tabelacontent2 = new HashMap<String,String>();
			     				tabelacontent2.put("Coluna 1", "itemLinha2");
			     				tabelacontent2.put("Coluna 2", "itemLinha2");
			     				tabelacontent2.put("Coluna 3", "itemLinha2");
     		tabeladata.add(tabelacontent2);
		     		HashMap<String, String> tabelacontent3 = new HashMap<String,String>();
			     				tabelacontent3.put("Coluna 1", "itemLinha3");
			     				tabelacontent3.put("Coluna 2", "itemLinha3");
			     				tabelacontent3.put("Coluna 3", "itemLinha3");
     		tabeladata.add(tabelacontent3);
		     		HashMap<String, String> tabelacontent4 = new HashMap<String,String>();
			     				tabelacontent4.put("Coluna 1", "itemLinha4");
			     				tabelacontent4.put("Coluna 2", "itemLinha4");
			     				tabelacontent4.put("Coluna 3", "itemLinha4");
     		tabeladata.add(tabelacontent4);
		     		HashMap<String, String> tabelacontent5 = new HashMap<String,String>();
			     				tabelacontent5.put("Coluna 1", "itemLinha5");
			     				tabelacontent5.put("Coluna 2", "itemLinha5");
			     				tabelacontent5.put("Coluna 3", "itemLinha5");
     		tabeladata.add(tabelacontent5);
		     		HashMap<String, String> tabelacontent6 = new HashMap<String,String>();
			     				tabelacontent6.put("Coluna 1", "itemLinha6");
			     				tabelacontent6.put("Coluna 2", "itemLinha6");
			     				tabelacontent6.put("Coluna 3", "itemLinha6");
     		tabeladata.add(tabelacontent6);
		     		HashMap<String, String> tabelacontent7 = new HashMap<String,String>();
			     				tabelacontent7.put("Coluna 1", "itemLinha7");
			     				tabelacontent7.put("Coluna 2", "itemLinha7");
			     				tabelacontent7.put("Coluna 3", "itemLinha7");
     		tabeladata.add(tabelacontent7);
		     		HashMap<String, String> tabelacontent8 = new HashMap<String,String>();
			     				tabelacontent8.put("Coluna 1", "itemLinha8");
			     				tabelacontent8.put("Coluna 2", "itemLinha8");
			     				tabelacontent8.put("Coluna 3", "itemLinha8");
     		tabeladata.add(tabelacontent8);
		     		HashMap<String, String> tabelacontent9 = new HashMap<String,String>();
			     				tabelacontent9.put("Coluna 1", "itemLinha9");
			     				tabelacontent9.put("Coluna 2", "itemLinha9");
			     				tabelacontent9.put("Coluna 3", "itemLinha9");
     		tabeladata.add(tabelacontent9);
		     		HashMap<String, String> tabelacontent10 = new HashMap<String,String>();
			     				tabelacontent10.put("Coluna 1", "itemLinha10");
			     				tabelacontent10.put("Coluna 2", "itemLinha10");
			     				tabelacontent10.put("Coluna 3", "itemLinha10");
     		tabeladata.add(tabelacontent10);
		     		HashMap<String, String> tabelacontent11 = new HashMap<String,String>();
			     				tabelacontent11.put("Coluna 1", "itemLinha11");
			     				tabelacontent11.put("Coluna 2", "itemLinha11");
			     				tabelacontent11.put("Coluna 3", "itemLinha11");
     		tabeladata.add(tabelacontent11);
		     		HashMap<String, String> tabelacontent12 = new HashMap<String,String>();
			     				tabelacontent12.put("Coluna 1", "itemLinha12");
			     				tabelacontent12.put("Coluna 2", "itemLinha12");
			     				tabelacontent12.put("Coluna 3", "itemLinha12");
     		tabeladata.add(tabelacontent12);
		     		HashMap<String, String> tabelacontent13 = new HashMap<String,String>();
			     				tabelacontent13.put("Coluna 1", "itemLinha13");
			     				tabelacontent13.put("Coluna 2", "itemLinha13");
			     				tabelacontent13.put("Coluna 3", "itemLinha13");
     		tabeladata.add(tabelacontent13);
		     		HashMap<String, String> tabelacontent14 = new HashMap<String,String>();
			     				tabelacontent14.put("Coluna 1", "itemLinha14");
			     				tabelacontent14.put("Coluna 2", "itemLinha14");
			     				tabelacontent14.put("Coluna 3", "itemLinha14");
     		tabeladata.add(tabelacontent14);
		     		HashMap<String, String> tabelacontent15 = new HashMap<String,String>();
			     				tabelacontent15.put("Coluna 1", "itemLinha15");
			     				tabelacontent15.put("Coluna 2", "itemLinha15");
			     				tabelacontent15.put("Coluna 3", "itemLinha15");
     		tabeladata.add(tabelacontent15);
		     		HashMap<String, String> tabelacontent16 = new HashMap<String,String>();
			     				tabelacontent16.put("Coluna 1", "itemLinha16");
			     				tabelacontent16.put("Coluna 2", "itemLinha16");
			     				tabelacontent16.put("Coluna 3", "itemLinha16");
     		tabeladata.add(tabelacontent16);
		     		HashMap<String, String> tabelacontent17 = new HashMap<String,String>();
			     				tabelacontent17.put("Coluna 1", "itemLinha17");
			     				tabelacontent17.put("Coluna 2", "itemLinha17");
			     				tabelacontent17.put("Coluna 3", "itemLinha17");
     		tabeladata.add(tabelacontent17);
		     		HashMap<String, String> tabelacontent18 = new HashMap<String,String>();
			     				tabelacontent18.put("Coluna 1", "itemLinha18");
			     				tabelacontent18.put("Coluna 2", "itemLinha18");
			     				tabelacontent18.put("Coluna 3", "itemLinha18");
     		tabeladata.add(tabelacontent18);
		     		HashMap<String, String> tabelacontent19 = new HashMap<String,String>();
			     				tabelacontent19.put("Coluna 1", "itemLinha19");
			     				tabelacontent19.put("Coluna 2", "itemLinha19");
			     				tabelacontent19.put("Coluna 3", "itemLinha19");
     		tabeladata.add(tabelacontent19);
		     		HashMap<String, String> tabelacontent20 = new HashMap<String,String>();
			     				tabelacontent20.put("Coluna 1", "itemLinha20");
			     				tabelacontent20.put("Coluna 2", "itemLinha20");
			     				tabelacontent20.put("Coluna 3", "itemLinha20");
     		tabeladata.add(tabelacontent20);
		     		HashMap<String, String> tabelacontent21 = new HashMap<String,String>();
			     				tabelacontent21.put("Coluna 1", "itemLinha21");
			     				tabelacontent21.put("Coluna 2", "itemLinha21");
			     				tabelacontent21.put("Coluna 3", "itemLinha21");
     		tabeladata.add(tabelacontent21);
		     		HashMap<String, String> tabelacontent22 = new HashMap<String,String>();
			     				tabelacontent22.put("Coluna 1", "itemLinha22");
			     				tabelacontent22.put("Coluna 2", "itemLinha22");
			     				tabelacontent22.put("Coluna 3", "itemLinha22");
     		tabeladata.add(tabelacontent22);
		     		HashMap<String, String> tabelacontent23 = new HashMap<String,String>();
			     				tabelacontent23.put("Coluna 1", "itemLinha23");
			     				tabelacontent23.put("Coluna 2", "itemLinha23");
			     				tabelacontent23.put("Coluna 3", "itemLinha23");
     		tabeladata.add(tabelacontent23);
		     		HashMap<String, String> tabelacontent24 = new HashMap<String,String>();
			     				tabelacontent24.put("Coluna 1", "itemLinha24");
			     				tabelacontent24.put("Coluna 2", "itemLinha24");
			     				tabelacontent24.put("Coluna 3", "itemLinha24");
     		tabeladata.add(tabelacontent24);
		     		HashMap<String, String> tabelacontent25 = new HashMap<String,String>();
			     				tabelacontent25.put("Coluna 1", "itemLinha25");
			     				tabelacontent25.put("Coluna 2", "itemLinha25");
			     				tabelacontent25.put("Coluna 3", "itemLinha25");
     		tabeladata.add(tabelacontent25);
		     		HashMap<String, String> tabelacontent26 = new HashMap<String,String>();
			     				tabelacontent26.put("Coluna 1", "itemLinha26");
			     				tabelacontent26.put("Coluna 2", "itemLinha26");
			     				tabelacontent26.put("Coluna 3", "itemLinha26");
     		tabeladata.add(tabelacontent26);
		     		HashMap<String, String> tabelacontent27 = new HashMap<String,String>();
			     				tabelacontent27.put("Coluna 1", "itemLinha27");
			     				tabelacontent27.put("Coluna 2", "itemLinha27");
			     				tabelacontent27.put("Coluna 3", "itemLinha27");
     		tabeladata.add(tabelacontent27);
		     		HashMap<String, String> tabelacontent28 = new HashMap<String,String>();
			     				tabelacontent28.put("Coluna 1", "itemLinha28");
			     				tabelacontent28.put("Coluna 2", "itemLinha28");
			     				tabelacontent28.put("Coluna 3", "itemLinha28");
     		tabeladata.add(tabelacontent28);
		     		HashMap<String, String> tabelacontent29 = new HashMap<String,String>();
			     				tabelacontent29.put("Coluna 1", "itemLinha29");
			     				tabelacontent29.put("Coluna 2", "itemLinha29");
			     				tabelacontent29.put("Coluna 3", "itemLinha29");
     		tabeladata.add(tabelacontent29);
		     		HashMap<String, String> tabelacontent30 = new HashMap<String,String>();
			     				tabelacontent30.put("Coluna 1", "itemLinha30");
			     				tabelacontent30.put("Coluna 2", "itemLinha30");
			     				tabelacontent30.put("Coluna 3", "itemLinha30");
     		tabeladata.add(tabelacontent30);
		     		HashMap<String, String> tabelacontent31 = new HashMap<String,String>();
			     				tabelacontent31.put("Coluna 1", "itemLinha31");
			     				tabelacontent31.put("Coluna 2", "itemLinha31");
			     				tabelacontent31.put("Coluna 3", "itemLinha31");
     		tabeladata.add(tabelacontent31);
		     		HashMap<String, String> tabelacontent32 = new HashMap<String,String>();
			     				tabelacontent32.put("Coluna 1", "itemLinha32");
			     				tabelacontent32.put("Coluna 2", "itemLinha32");
			     				tabelacontent32.put("Coluna 3", "itemLinha32");
     		tabeladata.add(tabelacontent32);
		     		HashMap<String, String> tabelacontent33 = new HashMap<String,String>();
			     				tabelacontent33.put("Coluna 1", "itemLinha33");
			     				tabelacontent33.put("Coluna 2", "itemLinha33");
			     				tabelacontent33.put("Coluna 3", "itemLinha33");
     		tabeladata.add(tabelacontent33);
		     		HashMap<String, String> tabelacontent34 = new HashMap<String,String>();
			     				tabelacontent34.put("Coluna 1", "itemLinha34");
			     				tabelacontent34.put("Coluna 2", "itemLinha34");
			     				tabelacontent34.put("Coluna 3", "itemLinha34");
     		tabeladata.add(tabelacontent34);
		     		HashMap<String, String> tabelacontent35 = new HashMap<String,String>();
			     				tabelacontent35.put("Coluna 1", "itemLinha35");
			     				tabelacontent35.put("Coluna 2", "itemLinha35");
			     				tabelacontent35.put("Coluna 3", "itemLinha35");
     		tabeladata.add(tabelacontent35);
		     		HashMap<String, String> tabelacontent36 = new HashMap<String,String>();
			     				tabelacontent36.put("Coluna 1", "itemLinha36");
			     				tabelacontent36.put("Coluna 2", "itemLinha36");
			     				tabelacontent36.put("Coluna 3", "itemLinha36");
     		tabeladata.add(tabelacontent36);
		     		HashMap<String, String> tabelacontent37 = new HashMap<String,String>();
			     				tabelacontent37.put("Coluna 1", "itemLinha37");
			     				tabelacontent37.put("Coluna 2", "itemLinha37");
			     				tabelacontent37.put("Coluna 3", "itemLinha37");
     		tabeladata.add(tabelacontent37);
		     		HashMap<String, String> tabelacontent38 = new HashMap<String,String>();
			     				tabelacontent38.put("Coluna 1", "itemLinha38");
			     				tabelacontent38.put("Coluna 2", "itemLinha38");
			     				tabelacontent38.put("Coluna 3", "itemLinha38");
     		tabeladata.add(tabelacontent38);
		     		HashMap<String, String> tabelacontent39 = new HashMap<String,String>();
			     				tabelacontent39.put("Coluna 1", "itemLinha39");
			     				tabelacontent39.put("Coluna 2", "itemLinha39");
			     				tabelacontent39.put("Coluna 3", "itemLinha39");
     		tabeladata.add(tabelacontent39);
		     		HashMap<String, String> tabelacontent40 = new HashMap<String,String>();
			     				tabelacontent40.put("Coluna 1", "itemLinha40");
			     				tabelacontent40.put("Coluna 2", "itemLinha40");
			     				tabelacontent40.put("Coluna 3", "itemLinha40");
     		tabeladata.add(tabelacontent40);
		     		HashMap<String, String> tabelacontent41 = new HashMap<String,String>();
			     				tabelacontent41.put("Coluna 1", "itemLinha41");
			     				tabelacontent41.put("Coluna 2", "itemLinha41");
			     				tabelacontent41.put("Coluna 3", "itemLinha41");
     		tabeladata.add(tabelacontent41);
		     		HashMap<String, String> tabelacontent42 = new HashMap<String,String>();
			     				tabelacontent42.put("Coluna 1", "itemLinha42");
			     				tabelacontent42.put("Coluna 2", "itemLinha42");
			     				tabelacontent42.put("Coluna 3", "itemLinha42");
     		tabeladata.add(tabelacontent42);
		     		HashMap<String, String> tabelacontent43 = new HashMap<String,String>();
			     				tabelacontent43.put("Coluna 1", "itemLinha43");
			     				tabelacontent43.put("Coluna 2", "itemLinha43");
			     				tabelacontent43.put("Coluna 3", "itemLinha43");
     		tabeladata.add(tabelacontent43);
		     		HashMap<String, String> tabelacontent44 = new HashMap<String,String>();
			     				tabelacontent44.put("Coluna 1", "itemLinha44");
			     				tabelacontent44.put("Coluna 2", "itemLinha44");
			     				tabelacontent44.put("Coluna 3", "itemLinha44");
     		tabeladata.add(tabelacontent44);
		     		HashMap<String, String> tabelacontent45 = new HashMap<String,String>();
			     				tabelacontent45.put("Coluna 1", "itemLinha45");
			     				tabelacontent45.put("Coluna 2", "itemLinha45");
			     				tabelacontent45.put("Coluna 3", "itemLinha45");
     		tabeladata.add(tabelacontent45);
		     		HashMap<String, String> tabelacontent46 = new HashMap<String,String>();
			     				tabelacontent46.put("Coluna 1", "itemLinha46");
			     				tabelacontent46.put("Coluna 2", "itemLinha46");
			     				tabelacontent46.put("Coluna 3", "itemLinha46");
     		tabeladata.add(tabelacontent46);
		     		HashMap<String, String> tabelacontent47 = new HashMap<String,String>();
			     				tabelacontent47.put("Coluna 1", "itemLinha47");
			     				tabelacontent47.put("Coluna 2", "itemLinha47");
			     				tabelacontent47.put("Coluna 3", "itemLinha47");
     		tabeladata.add(tabelacontent47);
		     		HashMap<String, String> tabelacontent48 = new HashMap<String,String>();
			     				tabelacontent48.put("Coluna 1", "itemLinha48");
			     				tabelacontent48.put("Coluna 2", "itemLinha48");
			     				tabelacontent48.put("Coluna 3", "itemLinha48");
     		tabeladata.add(tabelacontent48);
		     		HashMap<String, String> tabelacontent49 = new HashMap<String,String>();
			     				tabelacontent49.put("Coluna 1", "itemLinha49");
			     				tabelacontent49.put("Coluna 2", "itemLinha49");
			     				tabelacontent49.put("Coluna 3", "itemLinha49");
     		tabeladata.add(tabelacontent49);
		     		HashMap<String, String> tabelacontent50 = new HashMap<String,String>();
			     				tabelacontent50.put("Coluna 1", "itemLinha50");
			     				tabelacontent50.put("Coluna 2", "itemLinha50");
			     				tabelacontent50.put("Coluna 3", "itemLinha50");
     		tabeladata.add(tabelacontent50);
	}
	public Long getId() {
		return id;
	}
	public void setId(final Long valor) {
		id = valor;
	}
	public String getNomepesquisa() {
		return nomepesquisa;
	}
	public void setNomepesquisa(final String valor) {
		nomepesquisa = valor;
	}
	public List<String> getTabela() {
        return tabelacontent;
	}
	public void setTabela(final List<String> lista) {
		tabelacontent = lista;
	}	
	public List<HashMap<String,String>> getTabelaData() {
        return tabeladata;
	}
	public void setTabelaData(final List<HashMap<String,String>> lista) {
		tabeladata = lista;
	}		
	public String getRule() {
		return rule;
	}
	public void setRule(final String valor) {
		rule = valor;
	}
}

