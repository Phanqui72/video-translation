package com.mgr.api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Disabled for MVP. Email functionality will be restored later.
 */
@Service
@Slf4j
public class EmailService {
    public void sendEmail(String email, String msg, String subject, boolean html) {
        log.info("Email service is disabled. Message to {}: {}", email, msg);
    }
}
