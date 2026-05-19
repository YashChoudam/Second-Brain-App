# Second-Brain-App

A personal knowledge management system - a digital repository for storing and organizing ideas, insights, links, and information.

## Project Structure

```txt
backend/
  src/
    database/
    middlewares/
    models/
    routes/
    index.ts
  package.json
  tsconfig.json
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server starts only after MongoDB connects successfully.

## Environment Variables

Create a `.env` file inside `backend/`.

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_USERSECRET=your_jwt_secret
```

## MongoDB Atlas Connection

MongoDB is connected from `backend/src/database/db.ts`.

The app reads `MONGO_URI` from `.env`:

```ts
const mongoUri = process.env.MONGO_URI;
await mongoose.connect(mongoUri);
```

Connection flow:

1. `backend/src/index.ts` imports `connectDB`.
2. `connectDB()` checks whether `MONGO_URI` exists.
3. Mongoose connects to MongoDB Atlas using that URI.
4. If the connection succeeds, the Express server starts.
5. If the connection fails, the app logs the error and exits.

Your MongoDB Atlas URI usually looks like this:

```txt
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
```

Make sure your Atlas cluster allows your IP address and that the database user credentials are correct.

## JWT Authentication

JWT is used after login to protect private routes.

Login flow:

1. User sends `email` and `password` to `/api/v1/user/login`.
2. The backend finds the user by email.
3. `bcrypt.compare()` checks the plain password against the hashed password stored in MongoDB.
4. If the password is correct, `jwt.sign()` creates a token using `JWT_USERSECRET`.
5. The token contains the user `id` and `email`.

Protected route flow:

1. Client sends the token in the request headers.
2. The `authUser` middleware reads `req.headers.token`.
3. `jwt.verify()` validates the token using `JWT_USERSECRET`.
4. If valid, `req.user` is set with the logged-in user's `id` and `email`.
5. The route uses `req.user.id` to create, fetch, or delete only that user's data.

Header format for protected routes:

```txt
token: <jwt_token>
```

## Base URL

```txt
http://localhost:<PORT>
```

All user routes are mounted under:

```txt
/api/v1/user
```

## Routes

### Health Check

```http
GET /
```

Returns:

```txt
Hello world
```

### Signup

```http
POST /api/v1/user/signup
```

Creates a new user. Passwords are hashed using `bcrypt` before saving.

Request body:

```json
{
  "email": "user@example.com",
  "username": "yash",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "Signed Up successfully "
}
```

Possible errors:

```json
{
  "message": "User already exists"
}
```

### Login

```http
POST /api/v1/user/login
```

Logs in an existing user and returns a JWT token.

Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "token": "jwt_token_here"
}
```

Possible errors:

```json
{
  "message": "User does not exist with this email"
}
```

```json
{
  "message": "Incorrect Credentials"
}
```

### Add Content

```http
POST /api/v1/user/content
```

Protected route. Adds a new content item for the logged-in user.

Headers:

```txt
token: <jwt_token>
```

Request body:

```json
{
  "link": "https://example.com/article",
  "type": "article",
  "title": "Useful Article",
  "tags": ["tag_object_id_1", "tag_object_id_2"]
}
```

Allowed `type` values:

```txt
image, video, article, tweet, document
```

Success response:

```json
{
  "message": "Content added successfully",
  "content": {}
}
```

### Get Content

```http
GET /api/v1/user/content
```

Protected route. Fetches all content created by the logged-in user.

Headers:

```txt
token: <jwt_token>
```

The backend filters content using:

```ts
userId: req.user.id;
```

It also populates tag details using:

```ts
.populate("tags")
```

Success response:

```json
{
  "message": "Content fetched Successfully",
  "content": []
}
```

### Delete Content

```http
DELETE /api/v1/user/content/:contentId
```

Protected route. Deletes one content item only if it belongs to the logged-in user.

Headers:

```txt
token: <jwt_token>
```

Example:

```http
DELETE /api/v1/user/content/65f1a2b3c4d5e6f789123456
```

The backend checks both:

```ts
_id: contentId;
userId: req.user.id;
```

Success response:

```json
{
  "message": "Content deleted successfully",
  "deletedContent": {}
}
```

### Create Brain Share Link

```http
POST /api/v1/user/brain/share
```

Protected route. Creates a share hash for the logged-in user's brain.

Headers:

```txt
token: <jwt_token>
```

If a share link already exists, the existing hash is returned.

Success response:

```json
{
  "message": "Share link created successfully",
  "hash": "generated_hash",
  "shareUrl": "/api/v1/user/brain/generated_hash"
}
```

Note: the route currently creates and returns the share URL, but the public `GET /api/v1/user/brain/:hash` route is not implemented yet.

## Models

### User

Stores account information.

```txt
email, username, password
```

`email` is unique. `password` stores the bcrypt hashed password.

### Content

Stores saved links or notes.

```txt
link, type, title, tags, userId
```

Each content item belongs to one user.

### Tag

Stores reusable tag names.

```txt
title
```

### Link

Stores share links.

```txt
hash, userId
```

Each share hash belongs to one user.
