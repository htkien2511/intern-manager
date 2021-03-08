package cnpm.doan.api;

import cnpm.doan.domain.UserDomain;
import cnpm.doan.entity.User;
import cnpm.doan.service.UserService;
import cnpm.doan.util.CustormException;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.javamail.MimeMessageHelper;

import cnpm.doan.util.Message;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@RestController
public class ForgotPasswordController {
    @Autowired
    private UserService userService;
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String from;

    @PostMapping("/forgot_password")
    public ResponseEntity processForgotPassword(@RequestParam("email") String email, HttpServletRequest request) {
        String token = RandomString.make(7);
        try {
            userService.updateResetPasswordToken(token, email);
            String siteURL = request.getRequestURL().toString();
            String resetPasswordLink = siteURL.replace(request.getServletPath(), "") + "/reset_password?token=" + token;
            System.out.println(resetPasswordLink);
            sendEmail(email, resetPasswordLink);
            return ResponseEntity.ok(Message.CONTENT_EMAIL.getDetail());
        } catch (CustormException ex) {
            return ResponseEntity.ok(ex.getErrorType().getDetail());
        } catch (UnsupportedEncodingException | MessagingException e) {
            return ResponseEntity.ok(Message.ERROR_SENDING_EMAIL.getDetail());
        }
    }

    @GetMapping("/reset_password")
    public ResponseEntity showResetPasswordForm(@RequestParam(value = "token") String token) {
        User user = userService.findUserByResetPasswordToken(token);
        if (user == null) {
            return ResponseEntity.ok(Message.INVALID_TOKEN.getDetail());
        }
        return ResponseEntity.ok("oke");
    }

    @PostMapping("/reset_password")
    public ResponseEntity processResetPassword(@RequestParam("token") String token, @RequestParam("password") String password) {
        User user = userService.findUserByResetPasswordToken(token);
        if (user == null) {
            return ResponseEntity.ok(Message.INVALID_TOKEN.getDetail());
        } else {
            userService.updatePassword(user, password);
            UserDomain userDomain = new UserDomain(user.getName(), user.getEmail(), user.getAddress(), user.getDepartment().getName());
            return ResponseEntity.ok(userDomain);
        }
    }

    public void sendEmail(String recipientEmail, String link)
            throws javax.mail.MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(from);
        helper.setTo(recipientEmail);
        helper.setSubject(cnpm.doan.util.Message.SUBJECT_EMAIL_FORGOT_PASS.getDetail());
        String content = "<img src='https://scontent.fdad3-2.fna.fbcdn.net/v/t1.0-9/48384579_317001252241916_6859686426733182976_n.png?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=BuiQGHLlFAMAX-VNYVr&_nc_ht=scontent.fdad3-2.fna&oh=7e28303c598f2cc682e25c3ed10e1cd1&oe=606A0F6A'> "
                + "<br>"
                + "<p>Shapee Cloud chào bạn</p>"
                + "<br>"
                + "<p>Chúng tôi vừa nhận được yêu cầu thay đổi mật khẩu của bạn.</p>"
                + "<p>Hãy click vào link bên dưới để tiến hành thay đổi mật khẩu của bản nhé!</p>"
                + "<p><a href='" + link + "' style='padding:10px 20px;background-color:#337ab7;text-decoration:none;color:#fffffe;border-radius:5px;display:inline-block;max-width:70%;font-size:16px;margin:10px 0' >Thay đổi mật khẩu</a></p>"
                + "<p>Bỏ qua email này nếu bạn đã nhớ mật khẩu của mình."
                + "<br>"
                + "Shapee Cloud chúc bạn một ngày tốt lành.</p>";
        ;
        helper.setText(content, true);
        mailSender.send(message);
    }
}
