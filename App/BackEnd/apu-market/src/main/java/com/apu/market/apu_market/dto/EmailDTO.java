package com.apu.market.apu_market.dto;

public class EmailDTO {

    private String para;
    private String asunto;
    private String mensaje;

    public EmailDTO(){}
    
    public EmailDTO(String para, String asunto, String mensaje) {
        this.para = para;
        this.asunto = asunto;
        this.mensaje = mensaje;
    }

    public String getPara() {
        return para;
    }
    public void setPara(String para) {
        this.para = para;
    }
    public String getAsunto() {
        return asunto;
    }
    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }
    public String getMensaje() {
        return mensaje;
    }
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
