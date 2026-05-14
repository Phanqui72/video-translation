package com.mgr.api.repository;

import com.mgr.api.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long>, JpaSpecificationExecutor<Video> {

    Optional<Video> findByIdAndAccountId(Long id, Long accountId);

    List<Video> findByProjectIdAndStatus(Long projectId, int status);

    long countByProjectIdAndStatus(Long projectId, int status);
}
