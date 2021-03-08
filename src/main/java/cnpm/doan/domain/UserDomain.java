package cnpm.doan.domain;

public class UserDomain {
    private String name;
    private String email;
    private String department;
    private String address;

    public UserDomain(String name, String email, String department, String address) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
