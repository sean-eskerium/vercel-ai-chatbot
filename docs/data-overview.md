# Data Overview

This document outlines the data layer for the application—detailing both the data models stored in the PostgreSQL database (originally hosted on Vercel) and the integration with Vercel Blob storage. It further provides recommendations for deploying the app with Supabase as the backend service.

## Data Models & Structure

The application uses a PostgreSQL database managed via Drizzle ORM. The key models and their relationships are defined in the schema, allowing for structured storage of user data, chats, messages, votes, documents, and suggestions.

### Models

- **User**
  - Fields:
    - id: UUID, primary key, auto-generated
    - email: A varchar (64) representing the user's email address
    - password: A varchar (64) storing the user's password (if applicable)

- **Chat**
  - Fields:
    - id: UUID, primary key, auto-generated
    - createdAt: Timestamp indicating when the chat was created
    - title: Text field for the chat title
    - userId: UUID referencing the User who owns the chat
    - visibility: Enum (either 'public' or 'private') to indicate the chat's visibility

- **Message**
  - Fields:
    - id: UUID, primary key, auto-generated
    - chatId: UUID referencing the associated Chat
    - role: Varchar specifying the role (for example, system, user, or assistant)
    - content: JSON field storing the content of the message
    - createdAt: Timestamp for when the message was created

- **Vote**
  - Fields:
    - chatId: UUID referencing the Chat
    - messageId: UUID referencing the Message
    - isUpvoted: Boolean indicating whether the vote is an upvote
  - Note: Uses a composite primary key (chatId + messageId) to ensure unique votes per message in a chat.

- **Document**
  - Fields:
    - id: UUID, auto-generated
    - createdAt: Timestamp marking creation time
    - title: Text field for the document title
    - content: Text field for storing document content
    - kind: Enum with possible values ('text', 'code', 'image', 'sheet') to specify the type of document, defaulting to 'text'
    - userId: UUID referencing the User who owns the document
  - Note: Has a composite primary key (id and createdAt) to maintain uniqueness.

- **Suggestion**
  - Fields:
    - id: UUID, auto-generated
    - documentId: UUID linking the suggestion to a Document
    - documentCreatedAt: Timestamp matching the document creation time (for composite reference)
    - originalText: Text of the original content
    - suggestedText: Text of the proposed change
    - description: Optional text describing the suggestion
    - isResolved: Boolean indicating whether the suggestion has been addressed, defaults to false
    - userId: UUID referencing the user who made the suggestion
    - createdAt: Timestamp when the suggestion was created
  - Note: Includes a composite foreign key linking to Document using documentId and documentCreatedAt.

### Data Storage Integration

- **Vercel Database**: 
  - The app connects to a PostgreSQL database using Drizzle ORM, with the connection details provided by the environment variable `POSTGRES_URL` (typically pointing to Vercel's hosted PostgreSQL service).

- **Vercel Blob Storage**: 
  - File and media storage is handled via Vercel Blob services, authenticated by the environment variable `BLOB_READ_WRITE_TOKEN`. This is used for storing assets such as images, documents, or other file types associated with the application.

## Deployment on Supabase

For deployments on Vercel using Supabase as the backend instead of Vercel's native services, consider the following recommendations:

### Database

- **Supabase PostgreSQL**: 
  - Supabase offers a cloud-hosted PostgreSQL database that is fully compatible with Drizzle ORM. 
  - **Environment Changes**:
    - Update the `POSTGRES_URL` in your `.env` file to the connection string provided by Supabase.

### Storage

- **Supabase Storage**:
  - Supabase provides a storage solution that can replace Vercel Blob storage.
  - **Environment Variables**:
    - Introduce new environment variables such as `SUPABASE_URL` (your Supabase project URL) and `SUPABASE_ANON_KEY` (or `SUPABASE_SERVICE_ROLE_KEY` for server-side operations) to authenticate and use Supabase Storage.
  - **Code Adjustments**:
    - Modify any Vercel Blob API integrations in your code to use the Supabase Storage API endpoints. This might involve updating API calls, SDK initialization, and token usage.

### Additional Considerations

- Since the application leverages Drizzle ORM for database operations, no major code changes should be required when switching the underlying PostgreSQL instance from Vercel to Supabase—other than updating the connection string.
- Ensure any other dependencies or services that interface with Vercel-specific features are either updated or abstracted to work with Supabase. 
- Review your deployment scripts and CI/CD configuration (potentially in the `.github` directory) to reflect the new environment variables and any changes necessary for a Supabase deployment.

By implementing these changes, you can deploy your application on Vercel while leveraging a cloud-hosted Supabase database and storage solution. 