package br.com.sisus.util;

import org.json.JSONObject;

/**
 * 
 * @author SIOGP
 *
 */
public class JSONObjectWrapper extends JSONObject {

	public JSONObjectWrapper(String data){
		super(data);
	}

	@Override
	public String getString(String key){
		if (super.has(key)) {
			return super.getString(key);
		} else {
			return null;
		}
	}

	
	@Override
	public boolean getBoolean(String key){
		if (super.has(key)) {
		return super.getBoolean(key);
		} else {
			return false;
		}
	}

}

