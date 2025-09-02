package com.apu.market.apu_market.security;

public class JWTConfig {
    public static final String PREFIX_TOKEN="Bearer ";
    public static final String CONTENT_TYPE="application/json";
    public static final String HEADER_AUTHORIZATION="Authorization";
    public static final String COOKIE_NAME="JWTCookie";
    public static final int COOKIE_EXPIRATION_SECONDS=60*60;
}
