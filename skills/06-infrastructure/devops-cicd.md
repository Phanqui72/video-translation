# Skill: DevOps & CI/CD

## 1. Purpose
Defines the automation pipelines for building, testing, and deploying the entire platform.

## 2. Architecture Principles
- **Infrastructure as Code (IaC)**: Use Terraform or CloudFormation for all cloud resources.
- **Continuous Integration**: Every PR must pass build and tests.
- **Continuous Deployment**: Automated deployment to staging; gated deployment to production.

## 3. Implementation Rules
- **Pipelines**: Use GitHub Actions, GitLab CI, or Jenkins.
- **Build Artifacts**: Store Docker images in a private registry (e.g., ECR, GCR, Docker Hub).
- **Environment Management**: Use different namespaces or clusters for staging and production.

## 4. Best Practices
- **Blue-Green / Canary Deployments**: Minimize risk during production releases.
- **Rollback Mechanism**: Every deployment must be easily reversible.
- **Audit Logs**: Record who deployed what and when.

## 5. Anti-Patterns
- **Manual Deploys**: Running `docker push` or `kubectl apply` from a local machine to production.
- **Ignoring Failures**: Allowing the pipeline to continue even if tests fail.

## 6. Example Implementation (GitHub Actions Snippet)
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker Image
        run: docker build -t my-app:${{ github.sha }} .
      - name: Push to Registry
        run: docker push my-app:${{ github.sha }}
```

## 7. AI Agent Instructions
- **Generate CI/CD configuration files for all new modules.**
- **Enforce automated testing in the pipeline.**
- **Recommend IaC for any infrastructure changes.**
