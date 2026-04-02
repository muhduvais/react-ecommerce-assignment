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

## Phase 5 — Cart Context

- Implemented global cart state using Context API
- Added:
  - Add to cart
  - Remove from cart
  - Total items and total price calculation

  ## Phase 6 — URL Sync (Filtering & Sorting)

- Implemented category filtering using URL query params
- Added sorting (price and name)
- Used `useSearchParams` to sync UI with URL

### Note
Filters and sorting persist on refresh and support back/forward navigation.
Multi-category filtering is not implemented due to API limitations and requirement to avoid local filtering.

## Phase 7 — Cart Persistence

- Implemented cart persistence using localStorage
- Cart state loads on app initialization
- Automatically syncs on updates

## Phase 8 — Home Page UI

- Displayed products in responsive grid
- Created reusable ProductCard component
- Added Add to Cart functionality

## Phase 9 — Product Detail Page

- Implemented dynamic route `/product/:id`
- Fetched and displayed individual product details
- Added Add to Cart functionality

## Phase 10 — Cart Page

- Displayed cart items with quantity
- Added remove from cart functionality
- Showed total items and total price
- Added navigation to cart page