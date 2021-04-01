package cnpm.doan.repository;

import cnpm.doan.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    @Query(value = "delete from Project p where p.id = ?1")
    void deleteProject(int idProject);

}
