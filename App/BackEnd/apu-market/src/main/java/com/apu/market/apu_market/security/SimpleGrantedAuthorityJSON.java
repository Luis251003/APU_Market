package com.apu.market.apu_market.security;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;


public abstract class SimpleGrantedAuthorityJSON {

    private String authority;

    @JsonCreator
    public SimpleGrantedAuthorityJSON(@JsonProperty("authority") String role ){
        this.authority=role;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
