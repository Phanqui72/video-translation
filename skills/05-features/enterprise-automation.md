# Skill: Enterprise Automation

## 1. Purpose
Covers high-level automation workflows for business clients, such as "Watch Folder" automation and bulk processing.

## 2. Architecture Principles
- **Workflow Orchestration**: Use a state machine or workflow engine (e.g., Camunda, Temporal) for complex multi-step automations.
- **Batch Processing**: Ability to process hundreds of videos simultaneously.
- **Webhooks**: Provide outbound webhooks to notify enterprise systems of completed tasks.

## 3. Implementation Rules
- **API Keys**: Support machine-to-machine authentication via API keys.
- **Template System**: Allow users to define "Recipes" (e.g., "Always translate CN to VN and publish to YouTube").
- **Quota Management**: Strict enforcement of enterprise-level limits.

## 4. Best Practices
- **Auto-Discovery**: Automatically find and process videos from a linked S3 bucket or YouTube channel.
- **Reporting**: Weekly automated PDF reports of processing activity.
- **Priority Queues**: Ensure enterprise tasks take precedence over free-tier tasks.

## 5. Anti-Patterns
- **Manual Intervention**: Designing workflows that require a human to click "OK" at every step.
- **Lack of Idempotency**: Running the same automation twice on the same video by mistake.

## 6. AI Agent Instructions
- **Design automation to be "hands-off".**
- **Incorporate robust error handling and auto-retry.**
- **Recommend outbound webhooks for system integration.**
