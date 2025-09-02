package com.apu.market.apu_market.dto;

public class EmailDTO {

    private String destinatario;

    public EmailDTO(){}
    
    public EmailDTO(String destinatario) {
        this.destinatario = destinatario;
    }

    public String getDestinatario() {
        return destinatario;
    }
    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }
}
