# Skill: Docker Guidelines

## 1. Purpose
Standardizes containerization for all system components to ensure environment consistency.

## 2. Architecture Principles
- **Multi-stage Builds**: Minimize image size by separating build and runtime environments.
- **Stateless Containers**: Containers should not store state locally; use volumes or external storage.
- **Immutability**: Once an image is built, it should never be modified.

## 3. Implementation Rules
- **Base Images**: Use official, lightweight images (e.g., `openjdk:11-jre-slim`, `python:3.9-slim`).
- **USER Instruction**: Never run containers as `root`. Use a non-privileged user.
- **ENV Variables**: Pass configurations via environment variables.

## 4. Best Practices
- **Health Checks**: Include `HEALTHCHECK` instructions in the Dockerfile.
- **Layer Optimization**: Order instructions from least to most frequent changes to leverage cache.
- **Scanning**: Regularly scan images for vulnerabilities (e.g., using Trivy).

## 5. Anti-Patterns
- **Storing Secrets in Images**: Hardcoding API keys in the Dockerfile.
- **Latest Tag**: Using `:latest` in production; always use specific version tags.

## 6. Example Implementation (Spring Boot Dockerfile)
```dockerfile
FROM openjdk:11-jre-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
USER 1001
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 7. AI Agent Instructions
- **Generate Dockerfiles for any new service.**
- **Enforce multi-stage builds.**
- **Include non-root user configurations.**
