package com.mgr.api.model.criteria;

import com.mgr.api.model.Video;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class VideoCriteria implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private Long projectId;
    private Long accountId;
    private String originalFilename;
    private String uploadStatus;
    private String languageSource;
    private Integer status;

    public Specification<Video> getSpecification() {
        return new Specification<Video>() {
            private static final long serialVersionUID = 1L;

            @Override
            public Predicate toPredicate(Root<Video> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();

                if (getId() != null) {
                    predicates.add(cb.equal(root.get("id"), getId()));
                }
                if (getProjectId() != null) {
                    predicates.add(cb.equal(root.get("project").get("id"), getProjectId()));
                }
                if (getAccountId() != null) {
                    predicates.add(cb.equal(root.get("account").get("id"), getAccountId()));
                }
                if (getStatus() != null) {
                    predicates.add(cb.equal(root.get("status"), getStatus()));
                }
                if (!StringUtils.isEmpty(getOriginalFilename())) {
                    predicates.add(cb.like(cb.lower(root.get("originalFilename")),
                            "%" + getOriginalFilename().toLowerCase() + "%"));
                }
                if (!StringUtils.isEmpty(getUploadStatus())) {
                    predicates.add(cb.equal(root.get("uploadStatus"), getUploadStatus()));
                }
                if (!StringUtils.isEmpty(getLanguageSource())) {
                    predicates.add(cb.equal(root.get("languageSource"), getLanguageSource()));
                }
                return cb.and(predicates.toArray(new Predicate[0]));
            }
        };
    }
}
