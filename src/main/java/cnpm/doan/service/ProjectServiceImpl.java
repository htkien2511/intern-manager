package cnpm.doan.service;

import cnpm.doan.domain.ProjectDomain;
import cnpm.doan.entity.MemberProject;
import cnpm.doan.entity.Project;
import cnpm.doan.repository.MemberProjectRepository;
import cnpm.doan.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private MemberProjectRepository memProRepository;

    @Override
    public List<Project> getAllProject() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> getProjectByUsername(String username) {
        List<MemberProject> memberProjects = memProRepository.findAll();
        return memberProjects.stream()
                .filter(t -> t.getUser().getEmail().equals(username)).map(t -> t.getProject())
                .collect(Collectors.toList());
    }
//    String title, String description, LocalDate dueDate, String usernameOfAdmin
    @Override
    public void saveProject(ProjectDomain domain) {

//        Project project = new Project(domain.getTitle(), domain.getDescription());
    }
}
