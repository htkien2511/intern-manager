package cnpm.doan.repository;

import cnpm.doan.entity.MemberTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberTaskRepository extends JpaRepository<MemberTask, Integer> {
}
