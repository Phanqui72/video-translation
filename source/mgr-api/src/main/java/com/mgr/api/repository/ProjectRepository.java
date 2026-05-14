package com.mgr.api.repository;

import com.mgr.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {

    Optional<Project> findByIdAndAccountId(Long id, Long accountId);

    List<Project> findByAccountIdAndStatus(Long accountId, int status);

    @Query("SELECT COUNT(v) FROM Video v WHERE v.project.id = :projectId AND v.status = 1")
    long countVideosByProjectId(@Param("projectId") Long projectId);
}
