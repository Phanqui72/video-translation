package com.mgr.api.model.criteria;

import com.mgr.api.model.Project;
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
public class ProjectCriteria implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private Long accountId;
    private String title;
    private String projectStatus;
    private String visibility;
    private Integer status;

    public Specification<Project> getSpecification() {
        return new Specification<Project>() {
            private static final long serialVersionUID = 1L;

            @Override
            public Predicate toPredicate(Root<Project> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();

                if (getId() != null) {
                    predicates.add(cb.equal(root.get("id"), getId()));
                }
                if (getAccountId() != null) {
                    predicates.add(cb.equal(root.get("account").get("id"), getAccountId()));
                }
                if (getStatus() != null) {
                    predicates.add(cb.equal(root.get("status"), getStatus()));
                }
                if (!StringUtils.isEmpty(getTitle())) {
                    predicates.add(cb.like(cb.lower(root.get("title")), "%" + getTitle().toLowerCase() + "%"));
                }
                if (!StringUtils.isEmpty(getProjectStatus())) {
                    predicates.add(cb.equal(root.get("projectStatus"), getProjectStatus()));
                }
                if (!StringUtils.isEmpty(getVisibility())) {
                    predicates.add(cb.equal(root.get("visibility"), getVisibility()));
                }
                return cb.and(predicates.toArray(new Predicate[0]));
            }
        };
    }
}
