# Skill: Analytics Engine

## 1. Purpose
Defines the system for tracking user behavior, video performance, and business metrics.

## 2. Architecture Principles
- **Event-based Tracking**: Track atomic events (e.g., `VIDEO_UPLOADED`, `TRANSLATION_DONE`, `SOCIAL_SHARE`).
- **OLAP vs OLTP**: Separate analytics data (BigQuery/ClickHouse) from transactional data (Postgres).
- **Privacy by Design**: Anonymize PII in analytics reports.

## 3. Implementation Rules
- **Aggregation**: Use background jobs to pre-calculate daily/monthly metrics.
- **Real-time Stats**: Use Redis for "live" counters (e.g., "Current active renders").
- **External Integration**: Support exporting data to Google Analytics or Mixpanel.

## 4. Best Practices
- **Funnel Analysis**: Track where users drop off in the translation pipeline.
- **Resource Attribution**: Track how many credits each video/user consumes.
- **Custom Dashboards**: Allow Enterprise users to see their own usage stats.

## 5. Anti-Patterns
- **Running Analytics Queries on Production DB**: Slowing down the main application with `GROUP BY` on millions of rows.
- **Tracking Everything**: Logging useless data that will never be analyzed.

## 6. AI Agent Instructions
- **Recommend specialized analytics databases for high-volume event data.**
- **Enforce clear event naming conventions.**
- **Suggest pre-aggregation for dashboard performance.**
