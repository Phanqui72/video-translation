# Skill: NestJS Best Practices

## 1. Purpose
Provides guidance for Node.js based microservices (if used) using the NestJS framework.

## 2. Architecture Principles
- **Modular Design**: Every feature should be its own `Module`.
- **Dependency Injection**: Leverage NestJS's built-in DI system.
- **Decorators**: Extensive use of decorators for metadata and behavior.

## 3. Folder Structure
```text
src/
  modules/
    video/
      video.controller.ts
      video.service.ts
      video.module.ts
      dto/
  common/
    filters/
    interceptors/
```

## 4. Implementation Rules
- **DTOs**: Use `class-validator` and `class-transformer`.
- **Guards**: Use for Authentication and Authorization.
- **Interceptors**: Use for response transformation and logging.

## 5. Best Practices
- **Strict Typing**: Use TypeScript interfaces and types for everything.
- **Async/Await**: Never use callbacks; always use Promises.
- **Configuration**: Use `@nestjs/config`.

## 6. Anti-Patterns
- **Direct Express Access**: Accessing `req` or `res` directly unless absolutely necessary.
- **Global Everything**: Overusing `@Global()` modules.

## 7. Example Implementation
```typescript
@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private repo: Repository<Video>) {}
  
  async findOne(id: number): Promise<Video> {
    return this.repo.findOne(id);
  }
}
```

## 8. AI Agent Instructions
- **Generate code using the NestJS CLI patterns.**
- **Enforce the use of Modules and Controllers.**
