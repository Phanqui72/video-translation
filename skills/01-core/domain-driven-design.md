# Skill: Domain-Driven Design (DDD)

## 1. Purpose
Encourages modeling the software based on the business domain to manage complexity and ensure the code reflects business requirements.

## 2. Architecture Principles
- **Ubiquitous Language**: Use the same terms in code as business stakeholders (e.g., "Credits", "Subscription", "Project").
- **Bounded Contexts**: Separate logical areas of the system (e.g., Media Domain vs. User Domain).
- **Aggregates**: Group entities that belong together and have a single root (e.g., a `Project` aggregate containing `Video` and `Subtitle` entities).
- **Value Objects**: Use immutable objects for simple values (e.g., `Money`, `Duration`).

## 3. Folder Structure (DDD-lite)
```text
com.mgr.api.domain
├── media
│   ├── model
│   ├── repository
│   └── service
├── account
│   ├── model
│   ├── repository
│   └── service
└── billing
```

## 4. Implementation Rules
- **Encapsulation**: Aggregates should control their internal state. Don't use public setters for complex state changes; use descriptive methods like `video.startProcessing()`.
- **Domain Events**: Entities can emit events when significant things happen.

## 5. Best Practices
- **Focus on Behavior**: Avoid anemic domain models (models with only getters/setters and no logic).
- **Use Repositories for Aggregate Roots**: Only create repositories for the main entity in an aggregate.

## 6. Anti-Patterns
- **Anemic Domain Model**: Putting all logic in Services and leaving Entities as simple data containers.
- **Leaking Domain Logic**: Putting business rules in the UI or Database layer.

## 7. Scalability Considerations
- **Context Boundaries**: Clear boundaries make it easier to split a module into a separate microservice later.

## 8. Security Considerations
- **Invariant Enforcement**: The domain model should enforce security-related invariants (e.g., a user cannot have negative credits).

## 9. Example Implementation (Rich Domain Model)
```java
@Entity
public class Project {
    private Long credits;
    
    public void deductCredits(Long amount) {
        if (this.credits < amount) {
            throw new InsufficientCreditsException();
        }
        this.credits -= amount;
    }
}
```

## 10. AI Agent Instructions
- **Look for business logic in Services and suggest moving it to Domain Entities where appropriate.**
- **Enforce naming consistency with business terminology.**
- **Group related logic into cohesive modules.**
