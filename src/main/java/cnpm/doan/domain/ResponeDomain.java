package cnpm.doan.domain;

import org.springframework.http.HttpStatus;

public class ResponeDomain {
    private String messsage;
    private HttpStatus status;

    public ResponeDomain(String messsage, HttpStatus status) {
        this.messsage = messsage;
        this.status = status;
    }

    public String getMesssage() {
        return messsage;
    }

    public void setMesssage(String messsage) {
        this.messsage = messsage;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
