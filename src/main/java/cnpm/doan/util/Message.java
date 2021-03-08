package cnpm.doan.util;

public enum Message {
    EMAIL_EXISTED("email đã tồn tại"),
    SUBJECT_EMAIL_FORGOT_PASS("Thay đổi mật khẩu tài khoản Shapee Cloud"),
    INVALID_TOKEN("Token này đã hết thời gian sử dụng hoặc đã được truy cập"),
    EMAIL_NOT_FOUND("Không tìm thấy email"), ERROR_SENDING_EMAIL("Error while sending email"),
    CONTENT_EMAIL("Kiểm tra trong email cá nhân của bạn.");
    private String detail;

    Message(String detail) {
        this.detail = detail;
    }

    public String getDetail() {
        return detail;
    }
}
