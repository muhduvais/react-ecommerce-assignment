# Project Progress Log

## Phase 1: Initialization

- Setup Vite + React + TypeScript project
- Configured Tailwind CSS
- Cleaned default boilerplate

### Architecture Thoughts
- Planning to follow modular structure
- Separate concerns: components, pages, services, context

## Phase 2 — Routing & Structure

- Set up React Router with routes:
  - `/` (Home)
  - `/product/:id` (Product Detail)
  - `/cart` (Cart)
- Created basic folder structure for scalability.

---

## Phase 3 — Data Modeling

- Created TypeScript interfaces:
  - `Product`
  - `CartItem`
  - `Category`

### Note
Used interfaces to keep data consistent.
Cart stores only required product fields instead of full product object.

## Phase 4 — API Layer

- Set up Axios instance for API calls
- Created product service functions:
  - Fetch all products
  - Fetch single product
  - Fetch categories
  - Fetch products by category

### Note
Centralized API logic to keep components clean and reusable.