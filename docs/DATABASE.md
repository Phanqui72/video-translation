# Database Schema Design

## ER Diagram (Conceptual)
The system uses a Relational Database (MySQL/PostgreSQL) with Liquibase for migration.

### Core Tables (RBAC)

#### 1. `account`
- `id` (BIGINT, PK, Auto-increment)
- `username` (VARCHAR, Unique)
- `password` (VARCHAR)
- `full_name` (VARCHAR)
- `email` (VARCHAR)
- `group_id` (BIGINT, FK -> `group.id`)
- `status` (INT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### 2. `group`
- `id` (BIGINT, PK, Auto-increment)
- `name` (VARCHAR)
- `description` (TEXT)
- `kind` (INT) - System/User group

#### 3. `permission`
- `id` (BIGINT, PK, Auto-increment)
- `name` (VARCHAR)
- `code` (VARCHAR)
- `description` (TEXT)
- `p_group` (VARCHAR) - Permission group

#### 4. `group_permission` (Join Table)
- `group_id` (BIGINT, FK)
- `permission_id` (BIGINT, FK)

## Store Management (Proposed)
- `product`: Details about rackets, shuttlecocks, shoes.
- `category`: Product categories.
- `order`: Customer orders.
- `order_item`: Items within an order.
- `stock`: Inventory levels.

## Migration Strategy
- **Tool**: Liquibase
- **Master Changelog**: `src/main/resources/liquibase/db.changelog-master.xml`
- **Naming Convention**: `yyyyMMddHHmmss_changelog.xml`
