# Skill: Testing Strategy

## 1. Purpose
Defines the quality assurance framework to ensure the platform is robust and bug-free.

## 2. Architecture Principles
- **Test Pyramid**: Focus on many Unit Tests, fewer Integration Tests, and even fewer E2E Tests.
- **Isolation**: Unit tests must not depend on external databases or network services (use Mocks).
- **Automation**: All tests must run in the CI pipeline.

## 3. Implementation Rules
- **Unit Testing**: Use JUnit 5 and Mockito for Java; Jest for Frontend/Python.
- **Coverage**: Aim for 80%+ coverage on business logic (Services).
- **Naming**: Use `methodName_stateUnderTest_expectedBehavior`.

## 4. Best Practices
- **Integration Tests**: Use `@SpringBootTest` with Testcontainers for database/Redis testing.
- **Contract Testing**: Ensure API compatibility between frontend and backend.
- **Snapshot Testing**: Use for UI components to catch visual regressions.

## 5. Anti-Patterns
- **Testing Implementation Details**: Tests should focus on behavior and output, not private method calls.
- **Fragile Tests**: Tests that fail due to non-deterministic behavior (flaky tests).

## 6. Example Implementation (JUnit 5 + Mockito)
```java
@ExtendWith(MockitoExtension.class)
class VideoServiceTest {
    @Mock
    private VideoRepository videoRepository;
    
    @InjectMocks
    private VideoServiceImpl videoService;

    @Test
    void getById_ValidId_ReturnsDto() {
        // Arrange
        when(videoRepository.findById(1L)).thenReturn(Optional.of(new Video()));
        // Act
        VideoDto result = videoService.getById(1L);
        // Assert
        assertNotNull(result);
    }
}
```

## 7. AI Agent Instructions
- **Always generate unit tests for new service methods.**
- **Use Mockito for mocking dependencies.**
- **Include edge case testing (nulls, empty lists, exceptions).**
