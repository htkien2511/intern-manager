package cnpm.doan.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "token_id")
    private int id;
    @Column(name = "token", length = 2000)
    private String token;
    @Column(name = "token_expdate")
    private Date tokenExpDate;

    public Token() {

    }

    public Token(int id, String token, Date tokenExpDate) {
        this.id = id;
        this.token = token;
        this.tokenExpDate = tokenExpDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getTokenExpDate() {
        return tokenExpDate;
    }

    public void setTokenExpDate(Date tokenExpDate) {
        this.tokenExpDate = tokenExpDate;
    }
}
