package cnpm.doan.domain;

public class UserWithToken extends UserDomain {
    private String token;

    public UserWithToken(String name, String email, String department, String address, String token) {
        super(name, email, department, address);
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
