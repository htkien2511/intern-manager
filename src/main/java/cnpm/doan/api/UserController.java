package cnpm.doan.api;

import cnpm.doan.domain.Account;
import cnpm.doan.domain.UserDomain;
import cnpm.doan.entity.User;
import cnpm.doan.service.RoleService;
import cnpm.doan.service.UserService;
import cnpm.doan.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity getUser(@RequestParam(name = "role_name") String roleName) {
        System.out.println(roleName);
        List<User> users = userService.findUserByRoleName(roleName);
        List<UserDomain> result = users.stream().map(t -> new UserDomain(t))
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@ModelAttribute Account account) {
        User user = userService.findUserByEmail(account.getEmail());
        if (user != null) {
            return ResponseEntity.ok(Message.EMAIL_EXISTED.getDetail());
        }
        User newUser = new User();
        newUser.setEmail(account.getEmail());
        newUser.setPassword(new BCryptPasswordEncoder().encode(account.getPassword()));
        newUser.setRoles(roleService.findRoleByRoleName("ROLE_USER"));
        userService.createUser(newUser);
        return ResponseEntity.ok(account.getEmail());
    }

    @PostMapping("/user_profile")
    public ResponseEntity<?> getUserProfile(@RequestParam("email") String email) {
        User user = userService.findUserByEmail(email);
        return ResponseEntity.ok(new UserDomain(user));
    }
}
