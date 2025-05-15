# FaceFit Backend

This is the backend API for the FaceFit application.

## Deployment Instructions for Render

### Method 1: Using the Dashboard

1. Create a Render account at [render.com](https://render.com/)
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure your service with these settings:
   - **Name**: facefit-backend (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
5. Add the following environment variables:
   - `PORT`: 10000 (Render will automatically use this internally)
   - `NODE_ENV`: production
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string
   - `JWT_EXPIRATION`: 24h (or your preferred duration)
   - `JWT_ADMIN_SECRET`: A different secure random string
   - `JWT_ADMIN_EXPIRATION`: 24h (or your preferred duration)
6. Click "Create Web Service"

### Method 2: Using the render.yaml File (Blueprint)

1. Push the `render.yaml` file to your repository
2. Go to the Render Dashboard and click "Blueprint"
3. Connect to your repository
4. Render will automatically configure the service based on the YAML file
5. You'll need to manually set the `MONGO_URI` environment variable after deployment

## Required Environment Variables

```
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/facefit
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=24h
JWT_ADMIN_SECRET=your_admin_jwt_secret_here
JWT_ADMIN_EXPIRATION=24h
```

## Troubleshooting

### bcrypt Error on Deployment

If you encounter an error related to bcrypt during deployment, such as "invalid ELF header", this is likely due to Node.js version incompatibility. We've configured the application to use Node.js 16.x, which is compatible with our bcrypt version.

If you still encounter issues:

1. Try updating your bcrypt version: `npm update bcrypt`
2. If using a newer Node.js version, rebuild bcrypt from source: `npm rebuild bcrypt --build-from-source`
3. Or consider using a different hashing library like argon2 if needed 