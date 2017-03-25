package br.com.sisus.mbean;

/*
	Nesta classe � definido a interface de identifica��o do seu projeto. 	
	
	Esta identifica��o � lida pelo SIPRO via JMX de forma a apresentar informa��es sobre o projeto publicado na tela inicial.
	
*/

import java.util.Date;

/**
 * 
 * @author SIOGP
 *
 */
public interface IdentityMBean {
	int getCode();
	String getId();
	String getName();
	String getDescription();
	String getFormattedVersion();
	int getVersion();
	int getBuild();
	int getRelease();
	String getContext();
	String getIcon();
	String getExtraInfo();
	Date getDate();
	String getFormattedDate();
	String getUser();
	String getOwner();
	String getFramework();
    String getFormattedLoadTime();
    Date getLoadTime();	
    int getAuthCode();
    Date getAuthDate();     
    String getFormattedAuthDate();
	void generate();
	void generateCode(int min, int max);
	void generateDate(int validToHours); 
}

