package cnpm.doan.util;

public enum Message {
    EMAIL_EXISTED("Existed email"),
    SUBJECT_EMAIL_FORGOT_PASS("Thay đổi mật khẩu tài khoản Shapee Cloud"),
    INVALID_TOKEN("This token was accessed or expired "),
    EMAIL_NOT_FOUND("Email is not found"), ERROR_SENDING_EMAIL("Error while sending email"),
    CONTENT_EMAIL("Please check in your email"),
    USER_NOT_FOUND("Your password or email is incorrect!"),
    MISSING_UNAUTHORIZED("missing authorized to access this URL"),
    EMPTY_RESULT("Empty result"),
    DATA_NOT_EXIST("Data not exist"),
    INVALID_DATE("Invalid date. Please choose another date"),
    SUCCESSFUlLY("Successfully"),
    INVALID_MANGER("Invalid manager's username");
    private String detail;

    Message(String detail) {
        this.detail = detail;
    }

    public String getDetail() {
        return detail;
    }
}
