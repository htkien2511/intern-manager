package cnpm.doan.api;


import cnpm.doan.domain.Account;
import cnpm.doan.domain.ResponeDomain;
import cnpm.doan.domain.UserWithToken;
import cnpm.doan.entity.Token;
import cnpm.doan.entity.User;
import cnpm.doan.security.JwtUtil;
import cnpm.doan.security.UserPrincipal;
import cnpm.doan.service.TokenService;
import cnpm.doan.service.UserService;
import cnpm.doan.util.HTTPStatus;
import cnpm.doan.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(maxAge = 3600)
@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@ModelAttribute Account account) {
        System.out.println(account.getEmail() + "," + account.getPassword());
        UserPrincipal userPrincipal = userService.findByUsername(account.getEmail());
        if (account == null || !new BCryptPasswordEncoder().matches(account.getPassword(), userPrincipal.getPassword())) {
            return ResponseEntity.ok(new ResponeDomain(Message.USER_NOT_FOUND.getDetail(), HTTPStatus.fail));
        }
        Token token = new Token();
        token.setToken(jwtUtil.generateToken(userPrincipal));
        token.setTokenExpDate(jwtUtil.generateExpirationDate());
        tokenService.createToken(token);
        User user = userService.findUserByEmail(account.getEmail());
        UserWithToken userWithToken = new UserWithToken(user, token.getToken());
        return ResponseEntity.ok(new ResponeDomain(userWithToken, Message.SUCCESSFUlLY.getDetail(), true));
    }

}