# Skill: Kubernetes Guidelines

## 1. Purpose
Provides standards for deploying and managing services in a Kubernetes cluster.

## 2. Architecture Principles
- **Declarative Configuration**: Use YAML manifests or Helm charts for all deployments.
- **Resource Limits**: Every pod must have defined CPU/Memory requests and limits.
- **Auto-scaling**: Use Horizontal Pod Autoscaler (HPA) for load-based scaling.

## 3. Implementation Rules
- **Liveness/Readiness Probes**: Implement for all services to allow K8s to manage pod health.
- **Secrets Management**: Use K8s Secrets or external providers (Vault) for sensitive data.
- **ConfigMaps**: Use for non-sensitive environment-specific configurations.

## 4. Best Practices
- **Namespace Isolation**: Group related services into namespaces.
- **Rolling Updates**: Use zero-downtime deployment strategies.
- **Ingress Controller**: Use Nginx or similar for routing traffic to services.

## 5. Anti-Patterns
- **SSH into Pods**: Manually changing state inside a running pod.
- **Over-provisioning**: Requesting massive resources that the service doesn't use.

## 6. Example Implementation (Deployment Manifest)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: video-api
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: video-api
        image: mgr/video-api:v1.0
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
```

## 7. AI Agent Instructions
- **Always include resource limits in deployment manifests.**
- **Include health probes for all services.**
- **Use Helm charts for complex multi-service deployments.**
