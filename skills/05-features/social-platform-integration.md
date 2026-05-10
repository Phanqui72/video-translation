# Skill: Social Platform Integration

## 1. Purpose
Defines how to connect user accounts and automatically publish translated videos to platforms like YouTube, TikTok, and Facebook.

## 2. Architecture Principles
- **OAuth2 Flow**: Standardized login and permission granting.
- **Webhook Listeners**: Handle asynchronous events from social platforms (e.g., "Video published successfully").
- **Token Management**: Securely store and refresh OAuth tokens.

## 3. Implementation Rules
- **Platform-Specific Clients**: Create dedicated services for each platform (YouTubeService, TikTokService).
- **Rate Limiting**: Adhere to each platform's API quota.
- **Asset Preparation**: Automatically resize and re-encode videos to meet platform requirements (e.g., 9:16 for TikTok).

## 4. Best Practices
- **Batch Posting**: Allow users to schedule posts.
- **Analytics Sync**: Periodically pull view counts and engagement data.
- **Error Mapping**: Map social platform errors to internal, user-friendly messages.

## 5. Anti-Patterns
- **Scraping**: Trying to automate posting via web scraping instead of official APIs.
- **Storing Raw Tokens in Logs**: Accidentally logging access tokens.

## 6. Example Implementation (OAuth Strategy)
```java
public void publishToYouTube(Long videoId, String oauthToken) {
    Video video = videoRepository.findById(videoId).get();
    YouTubeClient client = new YouTubeClient(oauthToken);
    client.upload(video.getFilePath(), video.getTitle(), video.getDescription());
}
```

## 7. AI Agent Instructions
- **Enforce the use of official APIs.**
- **Recommend background jobs for all social media uploads.**
- **Suggest automated resizing for different platform formats.**
