package cnpm.doan.service;

import cnpm.doan.domain.ProjectDomain;
import cnpm.doan.entity.Project;
import cnpm.doan.util.CustormException;

import java.util.List;

public interface ProjectService {
    List<Project> getAllProject();

    List<Project> getProjectByUsername(String username);

    void saveProject(ProjectDomain domain) throws CustormException;

    Project findProjectById(int id);

    void deleteProject(int idProject);
}
