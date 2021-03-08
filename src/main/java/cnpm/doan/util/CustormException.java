package cnpm.doan.util;

public class CustormException extends Exception {
    private Message errorType;

    public CustormException(Message errorType) {
        this.errorType = errorType;
    }

    @Override
    public void printStackTrace() {
        System.out.println(errorType.getDetail());
    }

    public Message getErrorType() {
        return errorType;
    }
}
