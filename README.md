# List User - Fullstack Next.js

Aplikasi List User menggunakan Next.js (App Router) dengan fitur CRUD (Create, Read, Update, Delete) dan migrasi database menggunakan PostgreSQL/MySQL. Aplikasi ini menggunakan ORM Drizzle untuk migrasi dan koneksi database serta validasi input dengan Zod.

## Tech Stack

Berikut merupakan teknologi-teknologi yang digunakan dalam project ini.

| Technology              | Used        |
|------------------------|------------|
| **Programming Language** | TypeScript  |
| **Framework**           | Next.js v14.2.0 |
| **Database**            | PostgreSQL |
| **Deployment**         | vps |

## Libraries

Berikut merupakan libraries yang digunakan dalam project ini.

| Library | Version |
|---------|---------|
| drizzle-kit | 0.30.4 |
| drizzle-orm | 0.39.3 |
| framer-motion | 12.4.7 |
| lucide-react | 0.475.0 |
| next | 14.2.0 |
| pg | 8.13.3 |
| postgres | 3.4.5 |
| react | 18.2.0 |
| sonner | 2.0.1 |
| tailwind-merge | 3.0.1 |
| tailwindcss-animate | 1.0.7 |
| zod | 3.24.2 |

## Struktur Project
```
/src
 ├── app
 │   ├── api
 │   │   ├── users
 │   │   │   ├── firstname
 │   │   │   │   └── [firstname]
 │   │   │   ├── [id]
 │   ├── backend
 │   │   ├── controllers
 │   │   ├── repositories
 │   │   ├── services
 │   ├── data
 │   ├── fragment
 │   ├── types
 │   ├── user
 │   │   ├── new
 │   │   ├── [id]
 │   ├── validators
 ├── components
 │   ├── ui
 ├── lib
 │   ├── drizzle
 │   │   ├── migrations
 │   │   │   ├── meta
 │   ├── utils
```

## Instalasi dan Penggunaan

### 1. Clone Repository
```bash
 git clone https://github.com/username/repository-name.git
 cd repository-name
```

### 2. Install Dependencies
```bash
 npm install
```

### 3. Konfigurasi Database
- Buat database PostgreSQL/MySQL
- Buat file `.env` berdasarkan contoh `.env.example`
- Isi konfigurasi database di `.env` seperti berikut:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=db_usermanagement
DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```

#### Contoh `.env.example`
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=db_usermanagement
DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```
- Jalankan migrasi database:
```bash
 npm run drizzle:push
```

### 4. Menjalankan Aplikasi
```bash
 npm run dev
```
Akses aplikasi di `http://localhost:3000`

