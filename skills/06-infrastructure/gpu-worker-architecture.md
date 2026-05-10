# Skill: GPU Worker Architecture

## 1. Purpose
Defines the specialized infrastructure and software stack required for high-performance AI inference and video rendering.

## 2. Architecture Principles
- **GPU Isolation**: Each worker process should have exclusive access to one or more GPU cores/VRAM.
- **Model Registry**: Centralize AI models to avoid downloading them multiple times on each worker.
- **Task Orchestration**: Use specialized queues to route tasks to the right GPU type (e.g., A100 for training, T4 for inference).

## 3. Implementation Rules
- **Drivers**: Use NVIDIA Container Toolkit to pass GPU access to Docker containers.
- **VRAM Management**: Implement strict memory monitoring and clear cache between tasks.
- **Parallelism**: Use `torch.multiprocessing` or separate containers for concurrent tasks on a single GPU if VRAM allows.

## 4. Best Practices
- **Inference Engines**: Use TensorRT or ONNX Runtime for optimized model execution.
- **Pre-loading**: Keep models in memory between tasks to avoid the 30-60s loading penalty.
- **Health Checks**: Monitor GPU temperature and utilization; restart workers if they hang.

## 5. Anti-Patterns
- **CPU Inference**: Trying to run Whisper or Video-Retalking on a CPU in production.
- **Leaking VRAM**: Failing to clear the GPU cache, leading to Out of Memory (OOM) errors.

## 6. Scaling considerations
- **KEDA Scalers**: Scale based on the number of pending tasks in the GPU queue.
- **Spot Instances**: Use cheaper cloud GPU instances for non-urgent background tasks.

## 7. AI Agent Instructions
- **Design workers to be "GPU-aware".**
- **Include logic for model loading and VRAM management.**
- **Recommend NVIDIA-based containers for AI tasks.**
