# 🛍️ E-Commerce API - NestJS

✨ **A robust e-commerce API** Create a robust e-commerce API using TypeScript and NestJS.

## 🚀 Features

- **Company Management** 🏢  
  - CRUD operations for companies
  - One-to-one product relationship

- **Product Catalog** 📦  
  - Full product lifecycle management
  - Barcode search functionality
  - Category/Subcategory system

- **Enterprise Features** 🔒  
  - Redis caching for high performance
  - Input validation
  - Global error handling
  - CI/CD with GitHub Actions

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#⚙️-configuration)
- [Running the App](#🏃-running-the-app)
- [Testing](#🧪-testing)
- [Deployment](#🚀-deployment)

## 🛠️ Prerequisites

- Node.js 18+ 🟢
- npm 9+ 📦
- Redis 7+ 🧠
- MySQL 8+ 🐬

## 📥 Installation

```bash
# Clone repository
git clone https://github.com/amirsefati/tug-ecommerce

# Install dependencies
cd ecommerce-api && npm install

# Create environment file
cp .env.example .env

```

## 🗄️ Configuration
```bash
# Database
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# Redis
REDIS_HOST=
REDIS_PORT=

# App
PORT=

# Deployment
HEROKU_API_KEY=
HEROKU_EMAIL=
```
## 🗄️ Running the App

Launches the NestJS app in production mode (static build).

```bash
"start": "nest start"
```

Runs NestJS in development with live reload on file changes.

```bash
"start:dev": "nest start --watch"
```

## 🔬 Testing
This test suite now focuses on:

- CRUD operations for companies and products
- Input validation
- Cache integration
- Error handling
- Business logic validation

```bash
npm run test:e2e
```

## 🚀 Deployment

### GitHub Secrets Setup
 - Add these secrets in GitHub repo Settings → Secrets:
```bash 
HEROKU_API_KEY: Get from Heroku Account Settings

HEROKU_EMAIL: Your Heroku account email
```

### Deployment Process

 - Push to main branch triggers:
 - Automated tests
 - Production build
 - Deployment to Heroku
 - Health check verification

### Advanced Configuration
a. Database Setup (Example for mysql):

```bash
bash
Copy
heroku addons:create heroku-mysql:hobby-dev
```
