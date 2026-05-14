package com.mgr.api.controller;

import com.mgr.api.constant.MgrConstant;
import com.mgr.api.dto.ApiMessageDto;
import com.mgr.api.dto.ErrorCode;
import com.mgr.api.dto.ResponseListDto;
import com.mgr.api.dto.video.VideoDto;
import com.mgr.api.exception.BadRequestException;
import com.mgr.api.exception.NotFoundException;
import com.mgr.api.mapper.VideoMapper;
import com.mgr.api.model.Account;
import com.mgr.api.model.Project;
import com.mgr.api.model.Video;
import com.mgr.api.model.criteria.VideoCriteria;
import com.mgr.api.repository.AccountRepository;
import com.mgr.api.repository.ProjectRepository;
import com.mgr.api.repository.VideoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/video")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class VideoController extends ABasicController {

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
            "mp4", "mkv", "avi", "mov", "webm", "flv", "wmv"
    );

    private static final long MAX_FILE_SIZE = 2L * 1024 * 1024 * 1024; // 2GB

    @Value("${app.upload.dir:uploads/videos}")
    private String uploadDir;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private VideoMapper videoMapper;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<VideoDto> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("projectId") Long projectId,
            @RequestParam(value = "languageSource", defaultValue = "zh") String languageSource
    ) {
        Long accountId = getCurrentUser();

        // Validate file
        if (file.isEmpty()) {
            throw new BadRequestException("File is empty!", ErrorCode.VIDEO_ERROR_UPLOAD_FAILED);
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BadRequestException("File size exceeds the 2GB limit!", ErrorCode.VIDEO_ERROR_FILE_TOO_LARGE);
        }

        // Validate extension
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new BadRequestException("Unsupported file format: " + extension, ErrorCode.VIDEO_ERROR_UNSUPPORTED_FORMAT);
        }

        // Validate project ownership
        Project project = projectRepository.findByIdAndAccountId(projectId, accountId)
                .orElseThrow(() -> new NotFoundException("Project not found!", ErrorCode.PROJECT_ERROR_NOT_FOUND));

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException("Account not found!", ErrorCode.ACCOUNT_ERROR_NOT_FOUND));

        // Store file locally
        String storagePath;
        try {
            storagePath = storeFile(file, accountId, projectId);
        } catch (IOException e) {
            log.error("[Video] Failed to store file: {}", e.getMessage(), e);
            throw new BadRequestException("Failed to upload file!", ErrorCode.VIDEO_ERROR_UPLOAD_FAILED);
        }

        // Create video record
        Video video = new Video();
        video.setProject(project);
        video.setAccount(account);
        video.setOriginalFilename(originalFilename);
        video.setStorageUrl(storagePath);
        video.setFileSize(file.getSize());
        video.setFileFormat(extension);
        video.setContentType(file.getContentType());
        video.setLanguageSource(languageSource);
        video.setUploadStatus("uploaded");
        videoRepository.save(video);

        log.info("[Video] Uploaded '{}' ({} bytes) to project {} for account {}",
                originalFilename, file.getSize(), projectId, accountId);

        return makeSuccessResponse(videoMapper.fromVideoToDto(video), "Upload video success.");
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiMessageDto<VideoDto> get(@PathVariable("id") Long id) {
        Long accountId = getCurrentUser();
        Video video = videoRepository.findByIdAndAccountId(id, accountId)
                .orElseThrow(() -> new NotFoundException("Video not found!", ErrorCode.VIDEO_ERROR_NOT_FOUND));

        return makeSuccessResponse(videoMapper.fromVideoToDto(video), "Get video success.");
    }

    @GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiMessageDto<ResponseListDto<List<VideoDto>>> list(VideoCriteria criteria, Pageable pageable) {
        Long accountId = getCurrentUser();
        criteria.setAccountId(accountId);
        criteria.setStatus(MgrConstant.STATUS_ACTIVE);

        Page<Video> page = videoRepository.findAll(criteria.getSpecification(), pageable);
        ResponseListDto<List<VideoDto>> responseListDto = new ResponseListDto<>(
                videoMapper.fromEntityToVideoDtoList(page.getContent()),
                page.getTotalElements(),
                page.getTotalPages()
        );
        return makeSuccessResponse(responseListDto, "List video success.");
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ApiMessageDto<Void> delete(@PathVariable("id") Long id) {
        Long accountId = getCurrentUser();
        Video video = videoRepository.findByIdAndAccountId(id, accountId)
                .orElseThrow(() -> new NotFoundException("Video not found!", ErrorCode.VIDEO_ERROR_NOT_FOUND));

        // Soft delete
        video.setStatus(MgrConstant.STATUS_DELETE);
        videoRepository.save(video);

        log.info("[Video] Soft-deleted video {} for account {}", id, accountId);
        return makeSuccessResponse("Delete video success.");
    }

    // ===================== Utility Methods =====================

    private String storeFile(MultipartFile file, Long accountId, Long projectId) throws IOException {
        String subDir = accountId + "/" + projectId;
        Path dirPath = Paths.get(uploadDir, subDir);
        Files.createDirectories(dirPath);

        String uniqueName = UUID.randomUUID().toString() + "." + getFileExtension(file.getOriginalFilename());
        Path filePath = dirPath.resolve(uniqueName);
        file.transferTo(filePath.toFile());

        return subDir + "/" + uniqueName;
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}
