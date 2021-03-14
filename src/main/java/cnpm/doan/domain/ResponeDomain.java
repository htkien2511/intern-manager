package cnpm.doan.domain;

import cnpm.doan.util.HTTPStatus;
import org.springframework.http.HttpStatus;

public class ResponeDomain {
    private String messsage;
    private boolean success;

    public ResponeDomain(String messsage, boolean status) {
        this.messsage = messsage;
        this.success = status;
    }

    public String getMesssage() {
        return messsage;
    }

    public void setMesssage(String messsage) {
        this.messsage = messsage;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
