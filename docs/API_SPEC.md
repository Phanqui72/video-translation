# API Specification - Management API

## Authentication
- **Mechanism**: JWT (JSON Web Token) / OAuth2.
- **Base URL**: `/api` (Standard Spring Boot context or gateway path).
- **Header**: `Authorization: Bearer <token>`

## Core Modules

### 1. Authentication & Authorization
| Endpoint | Method | Description | Roles |
|----------|--------|-------------|-------|
| `/api/account/login` | POST | Login and get JWT | Public |
| `/api/account/profile` | GET | Get current user info | User |
| `/api/account/create` | POST | Register/Create new account | Admin |

### 2. Group Management
| Endpoint | Method | Description | Roles |
|----------|--------|-------------|-------|
| `/api/group/list` | GET | List all groups | Admin |
| `/api/group/create` | POST | Create new group | Admin |

### 3. Permission Management
| Endpoint | Method | Description | Roles |
|----------|--------|-------------|-------|
| `/api/permission/list` | GET | List all available permissions | Admin |

## Upcoming Modules (Badminton Store Management)
- **Product Management**: `/api/product`
- **Category Management**: `/api/category`
- **Order Management**: `/api/order`
- **Customer Management**: `/api/customer`
- **Inventory/Stock**: `/api/inventory`
