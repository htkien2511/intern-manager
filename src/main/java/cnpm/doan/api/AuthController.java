package cnpm.doan.api;


import cnpm.doan.domain.Account;
import cnpm.doan.domain.UserWithToken;
import cnpm.doan.entity.Token;
import cnpm.doan.entity.User;
import cnpm.doan.security.JwtUtil;
import cnpm.doan.security.UserPrincipal;
import cnpm.doan.service.TokenService;
import cnpm.doan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@ModelAttribute Account account) {
        UserPrincipal userPrincipal = userService.findByUsername(account.getEmail());
        if (account == null || !new BCryptPasswordEncoder().matches(account.getPassword(), userPrincipal.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or password not found");
        }
        Token token = new Token();
        token.setToken(jwtUtil.generateToken(userPrincipal));
        token.setTokenExpDate(jwtUtil.generateExpirationDate());
        tokenService.createToken(token);
        User user = userService.findUserByEmail(account.getEmail());
        UserWithToken userWithToken = new UserWithToken(user.getName(), user.getEmail(),user.getDepartment().getName(), user.getAddress(),  token.getToken());
        return ResponseEntity.ok(userWithToken);
    }

}