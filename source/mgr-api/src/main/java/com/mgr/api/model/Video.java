package com.mgr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = TablePrefix.PREFIX_TABLE + "video")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Video extends Auditable<String> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    @Column(name = "storage_url")
    private String storageUrl;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(length = 50)
    private String resolution;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "file_format", length = 20)
    private String fileFormat;

    @Column(name = "language_source", length = 10)
    private String languageSource;

    /**
     * Upload status: pending, uploading, uploaded, failed
     */
    @Column(name = "upload_status", length = 20)
    private String uploadStatus = "pending";

    @Column(name = "content_type")
    private String contentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;
}
