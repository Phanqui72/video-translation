# Chiến Lược Kiểm Thử Hệ Thống (Testing Strategy)

Tài liệu này định nghĩa quy trình và các cấp độ kiểm thử để đảm bảo tính chính xác, bảo mật và hiệu năng của nền tảng Dịch & Lồng Tiếng Video.

---

## 1. Unit Testing (Kiểm thử đơn vị)
Mục tiêu: Đảm bảo các hàm, phương thức và logic nghiệp vụ nhỏ nhất hoạt động đúng.

- **Công nghệ**: JUnit 5, Mockito, AssertJ.
- **Phạm vi**: 
    - **Service Layer**: Kiểm thử logic tính toán credit, xử lý chuỗi phụ đề, logic phân quyền.
    - **Utils/Helpers**: Các hàm xử lý thời gian, định dạng video, mã hóa JWT.
    - **Mappers**: Chuyển đổi giữa Entity và DTO.
- **Quy tắc**:
    - Mock tất cả các phụ thuộc bên ngoài (Database, Mail Service, External APIs).
    - Độ bao phủ (Coverage) mục tiêu: > 80% logic nghiệp vụ.

---

## 2. Integration Testing (Kiểm thử tích hợp)
Mục tiêu: Kiểm tra sự tương tác giữa các module và giao tiếp với Database/Cache.

- **Công nghệ**: Spring Boot Test, Testcontainers (Docker), RestAssured.
- **Phạm vi**:
    - **API Endpoints**: Kiểm tra tính đúng đắn của Request/Response, mã lỗi HTTP.
    - **Repository Layer**: Kiểm tra các câu lệnh SQL, quan hệ giữa các bảng.
    - **Security Integration**: Kiểm tra việc áp dụng JWT lọc các request không hợp lệ.
- **Quy tắc**:
    - Sử dụng **Testcontainers** để khởi tạo Database (PostgreSQL/MySQL) và Redis thực tế trong lúc chạy test.
    - Kiểm tra các "Happy Path" và các "Edge Cases" (Sai token, dữ liệu rác).

---

## 3. System Testing / E2E Testing (Kiểm thử hệ thống)
Mục tiêu: Kiểm tra toàn bộ luồng nghiệp vụ từ giao diện người dùng đến kết quả cuối cùng.

- **Công nghệ**: Playwright (hoặc Cypress), Postman Newman.
- **Kịch bản trọng tâm**:
    1. **Luồng Đăng ký & Xác thực**: Đăng ký -> Verify Email -> Login -> Lấy Token.
    2. **Luồng Xử lý Video**: Upload -> Chờ Worker xử lý -> Kiểm tra trạng thái Job -> Xem kết quả Render.
    3. **Luồng Thanh toán**: Nạp Credit -> Sử dụng dịch vụ -> Kiểm tra trừ Credit và lịch sử giao dịch.
- **Môi trường**: Chạy trên môi trường Staging/UAT với cấu hình giống Production nhất có thể.

---

## 4. Performance & Load Testing (Kiểm thử hiệu năng)
Mục tiêu: Đảm bảo hệ thống chịu tải tốt với video dài và nhiều người dùng đồng thời.

- **Công nghệ**: k6 (JavaScript) hoặc JMeter.
- **Chỉ số đo lường**:
    - **Response Time**: < 200ms cho API thường.
    - **Throughput**: Số lượng request/giây mà hệ thống chịu được.
    - **Resource Usage**: Mức độ chiếm dụng CPU/RAM của AI Worker khi render video 4K.

---

## 5. Security Testing (Kiểm thử bảo mật)
- **Penetration Testing**: Kiểm tra lỗi SQL Injection, XSS, và lỗi phân quyền (Broken Object Level Authorization).
- **Tool**: OWASP ZAP, Snyk (quét lỗ hổng thư viện).

---

## 6. Quy trình thực hiện (Workflow)

1. **Local Dev**: Dev chạy Unit Test trước khi commit.
2. **Pull Request**: Hệ thống CI (Jenkins/GitHub Actions) tự động chạy Unit & Integration Test.
3. **Staging Deployment**: Chạy System/E2E Test tự động.
4. **Monitoring**: Theo dõi log và lỗi thực tế qua Sentry/Netdata.
