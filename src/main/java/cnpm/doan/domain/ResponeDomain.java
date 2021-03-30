package cnpm.doan.domain;

public class ResponeDomain {
    private Object data;
    private String messsage;
    private boolean success;

    public ResponeDomain(String messsage, boolean status) {
        this.messsage = messsage;
        this.success = status;
    }

    public ResponeDomain(Object object, String messsage, boolean success) {
        this.data = object;
        this.messsage = messsage;
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
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
