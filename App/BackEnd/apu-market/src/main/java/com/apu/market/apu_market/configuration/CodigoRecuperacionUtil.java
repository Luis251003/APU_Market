package com.apu.market.apu_market.configuration;

import java.security.SecureRandom;

public class CodigoRecuperacionUtil {

    private static final SecureRandom secureRandom = new SecureRandom();
    private static int codeRecovery;

    public static String generarCodigo(){
        int codigo = secureRandom.nextInt(90000) + 10000;
        codeRecovery = codigo;
        return String.valueOf(codigo);
    }

    public static int getCodeRecovery() {
        return codeRecovery;
    }
    public static void setCodeRecovery(int codeRecovery) {
        CodigoRecuperacionUtil.codeRecovery = codeRecovery;
    }
}
