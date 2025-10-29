package vn.edu.hust.vrgamesapp.exception;

import org.springframework.http.HttpStatus;

public class VrAPIException extends RuntimeException{
    private HttpStatus status;
    private String message;

    public VrAPIException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public VrAPIException(String message, HttpStatus status, String message1) {
        super(message);
        this.status = status;
        this.message = message1;
    }

    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}