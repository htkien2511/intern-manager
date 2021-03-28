package cnpm.doan.api;

import cnpm.doan.domain.ProjectDomain;
import cnpm.doan.domain.ResponeDomain;
import cnpm.doan.entity.Project;
import cnpm.doan.entity.User;
import cnpm.doan.service.ProjectService;
import cnpm.doan.service.UserService;
import cnpm.doan.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController()
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserService userService;

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @GetMapping("/projects")
    public ResponseEntity<?> getAllProject() {
        List<Project> projects = projectService.getAllProject();
        if (projects.size() == 0) {
            return ResponseEntity.ok(new ResponeDomain(Message.EMPTY_RESULT.getDetail(), true));
        }
        if (projects == null) {
            return ResponseEntity.ok(new ResponeDomain(Message.DATA_NOT_EXIST.getDetail(), true));
        }
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/project")
    public ResponseEntity<?> getProjectByUsername(@RequestParam("username") String username) {
        List<Project> projects = projectService.getProjectByUsername(username);
        if (projects.size() == 0) {
            return ResponseEntity.ok(new ResponeDomain(Message.EMPTY_RESULT.getDetail(), true));
        }
        if (projects == null) {
            return ResponseEntity.ok(new ResponeDomain(Message.DATA_NOT_EXIST.getDetail(), true));
        }
        return ResponseEntity.ok(projects);
    }

//    @PostMapping("/project/create")
//    public ResponseEntity<?> createProject(@RequestBody ProjectDomain request) {
//
//        String username = request.getUsernameOfAdmin();
//        User user = userService.findUserByEmail(username);
//    }
}
