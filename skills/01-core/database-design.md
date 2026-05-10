# Skill: Database Design

## 1. Purpose
Defines the strategy for data modeling, schema management, and performance optimization.

## 2. Architecture Principles
- **Relational Integrity**: Use foreign keys and constraints to ensure data consistency.
- **Normalization**: Aim for 3NF, but denormalize for performance in high-read scenarios.
- **Versioned Migrations**: All changes MUST use Liquibase.
- **Soft Deletes**: Use a `deleted` flag instead of deleting rows for auditability.

## 3. Folder Structure
```text
src/main/resources/liquibase
├── master.xml
├── release_v1
│   └── 001_init_schema.xml
└── release_v2
```

## 4. Implementation Rules
- **Naming Conventions**: `snake_case` for tables and columns.
- **Primary Keys**: Use `BIGINT AUTO_INCREMENT` (MySQL) or `BIGSERIAL` (Postgres).
- **Audit Columns**: Every table should have `created_at` and `modified_at`.

## 5. Best Practices
- **Indexes**: Create indexes for all columns used in filtering, sorting, or joins.
- **Explain Plan**: Always analyze the explain plan for complex queries.
- **Batch Processing**: Use batch inserts/updates for large datasets.

## 6. Anti-Patterns
- **Manual Schema Changes**: Editing the database via GUI or CLI directly.
- **Generic Columns**: Using `data` (JSON/TEXT) to store everything instead of proper columns.
- **Circular References**: Tables that depend on each other.

## 7. Scalability Considerations
- **Connection Pooling**: Use HikariCP with optimized settings.
- **Read/Write Splitting**: Use read replicas for heavy reporting queries.
- **Sharding**: Consider sharding for extremely large tables (e.g., logs, video chunks).

## 8. Security Considerations
- **SQL Injection**: Always use Prepared Statements (JPA does this by default).
- **Sensitive Data**: Encrypt columns like `email` or `phone_number` if required.

## 9. Example Implementation (Liquibase)
```xml
<changeSet id="1" author="mgr">
    <createTable tableName="video">
        <column name="id" type="BIGINT" autoIncrement="true">
            <constraints primaryKey="true" nullable="false"/>
        </column>
        <column name="title" type="VARCHAR(255)"/>
        <column name="created_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
    </createTable>
</changeSet>
```

## 10. AI Agent Instructions
- **Generate Liquibase changelogs for any schema change.**
- **Include indexes and audit columns by default.**
- **Follow snake_case naming for database objects.**
