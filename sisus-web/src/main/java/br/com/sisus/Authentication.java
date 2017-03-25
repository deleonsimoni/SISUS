package br.com.sisus;

import java.util.Calendar;
import java.util.Date;

import org.apache.log4j.Logger;

/**
 * 
 * @author SIOGP
 *
 */

public class Authentication {
	
	private static final Logger LOG = Logger.getLogger(Authentication.class);
	private int code = -1;
	private Date validTo = null;
	
	private static final int MIN = 1000;
	private static final int MAX = 9999;
	private static final int VALIDTOHOURS = 24;
	
	private int min = MIN;
	private int max = MAX;
	private int validToHours = VALIDTOHOURS;
	
	private static Authentication auth = null;
	
	public Authentication() {
		LOG.debug("Authentication()");
	}
	
	public static Authentication getInstance() {
		if (auth == null) {
			auth = new Authentication();
		}
		return auth;
	}
	
	public void generate() {
		generate(min, max, validToHours);
	}
	
	public void generate(int min, int max, int validToHours) {
		this.min = min;
		this.max = max;
		this.validToHours = validToHours;
		
		generateDate(validToHours);
		generateCode(min, max);
	}
	
	public void generateCode(int min, int max) {
		int newcode = min + (int)(Math.random() * max);
		if (code != -1) {
			LOG.info("--------------> new authCode: " + Integer.toString(newcode));
		}
		code = newcode;
	}
	
	
	public void generateDate(int validToHours) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.HOUR_OF_DAY, validToHours);		
		validTo = calendar.getTime();
	}
	
	public boolean isExpired() {
		boolean result = false;
		
		Date now = new Date();
		if (validTo == null || now.after(validTo)) {
			result = true;
		}		
		
		return result;
	}
	
	
	public int getCode() {
		if (isExpired()) {
			generate(min, max, validToHours);
		}
		
		return code;
	}
	
	public Date getDate() {
		if (isExpired()) {
			generate(min, max, validToHours);
		}	
		return validTo;
	}
	

}
