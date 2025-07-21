package com.apu.market.apu_market.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.apu.market.apu_market.errors.DataNotFound;

@RestControllerAdvice
public class ErrorControllers {

    @ExceptionHandler(DataNotFound.class)
    public ResponseEntity<?> dataNotFound(DataNotFound ex){
        Map<String,String> body = new HashMap<>();
        body.put("message", ex.getMessage());
        body.put("date",LocalDate.now().toString());
        body.put("code", HttpStatus.NOT_FOUND.toString());
        return ResponseEntity.badRequest().body(body);
    }
}
