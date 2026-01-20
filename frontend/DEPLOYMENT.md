# Deployment Guide

This guide covers various deployment options for the Ecommerce Frontend application.

## 🚀 Production Build

### Build the Application
```bash
npm run build
```

This creates an optimized production build in the `build/` directory with:
- Minified JavaScript and CSS
- Optimized assets
- Source maps for debugging
- Service worker for PWA capabilities

## 🌐 Deployment Options

### 1. Static Hosting Services

#### Netlify
1. **Build**: `npm run build`
2. **Deploy**: Drag and drop the `build` folder to Netlify
3. **Configure**: Set build command to `npm run build` and publish directory to `build`

#### Vercel
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: `vercel --prod`
3. **Configure**: Set build command and output directory in `vercel.json`

#### GitHub Pages
1. **Install**: `npm install --save-dev gh-pages`
2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```
3. **Deploy**: `npm run deploy`

### 2. Cloud Platforms

#### AWS S3 + CloudFront
1. **Upload**: Upload `build` folder to S3 bucket
2. **Configure**: Enable static website hosting
3. **CDN**: Set up CloudFront distribution

#### Google Cloud Storage
1. **Upload**: Upload `build` folder to GCS bucket
2. **Configure**: Enable static website hosting
3. **CDN**: Set up Cloud CDN

#### Azure Blob Storage
1. **Upload**: Upload `build` folder to Azure Blob Storage
2. **Configure**: Enable static website hosting
3. **CDN**: Set up Azure CDN

### 3. Container Deployment

#### Docker
1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```
2. **Build**: `docker build -t ecommerce-frontend .`
3. **Run**: `docker run -p 80:80 ecommerce-frontend`

#### Kubernetes
1. **Create deployment YAML**
2. **Apply**: `kubectl apply -f deployment.yaml`
3. **Expose**: `kubectl expose deployment ecommerce-frontend --type=LoadBalancer`

## ⚙️ Environment Configuration

### Production Environment Variables
Create `.env.production`:
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_ANALYTICS=true
```

### Security Headers
Configure your web server to include:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 🔧 Server Configuration

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/html/build
    
    # Enable compression
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
    </Location>
    
    # Handle React Router
    <Directory "/var/www/html/build">
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## 📊 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic with React.lazy
- **Tree Shaking**: Remove unused code
- **Minification**: JavaScript and CSS minification
- **Image Optimization**: WebP format support

### Runtime Optimization
- **CDN**: Use CDN for static assets
- **Caching**: Implement proper caching headers
- **Compression**: Enable Gzip/Brotli compression
- **HTTP/2**: Enable HTTP/2 for multiplexing

## 🔍 Monitoring and Analytics

### Google Analytics
Add to `public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking
Add Sentry for error tracking:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.REACT_APP_ENVIRONMENT,
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Build
      run: npm run build
    - name: Deploy
      run: # Your deployment script
```

### GitLab CI
```yaml
deploy:
  stage: deploy
  script:
    - npm ci
    - npm run build
    - # Your deployment script
  only:
    - main
```

## 🚨 Troubleshooting

### Common Issues

#### Blank Page on Deploy
- Check `REACT_APP_API_URL` environment variable
- Verify build completed successfully
- Check browser console for errors

#### Routing Issues
- Ensure server handles client-side routing
- Configure fallback to `index.html`
- Check for 404 errors on refresh

#### Asset Loading Issues
- Verify asset paths in build
- Check CDN configuration
- Ensure proper MIME types

### Debugging
- Use source maps for debugging
- Check network requests in browser dev tools
- Verify environment variables in production

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Update environment variables
- [ ] Run tests: `npm test`
- [ ] Build successfully: `npm run build`
- [ ] Check build output size
- [ ] Verify API endpoints

### Post-Deployment
- [ ] Test all pages load correctly
- [ ] Check routing works
- [ ] Verify API connectivity
- [ ] Test authentication flow
- [ ] Check mobile responsiveness
- [ ] Monitor error rates
- [ ] Set up alerts

## 🔐 Security Considerations

- Use HTTPS in production
- Implement proper CORS policies
- Validate all user inputs
- Keep dependencies updated
- Use Content Security Policy (CSP)
- Regular security audits

---

For specific deployment platform instructions, refer to the platform's documentation.
