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
- [Deployment](#🚢-deployment)

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
