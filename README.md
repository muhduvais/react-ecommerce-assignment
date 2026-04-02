# React E-Commerce Application

A simple e-commerce application built using React and TypeScript.

## 🚀 Features

* Product listing page
* Category-based filtering (via API)
* Sorting (price & name)
* Product detail page
* Add to cart
* Remove from cart
* Cart persistence using localStorage
* URL-based filter persistence
* End-to-end testing using Playwright

## 🛠️ Tech Stack

* React + TypeScript
* React Router
* Context API
* Axios
* Tailwind CSS
* Playwright (E2E Testing)

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd react-ecommerce-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Update `.env` if needed:

```env
VITE_API_BASE_URL=https://fakestoreapi.com or
VITE_API_BASE_URL=https://dummyjson.com
```

### 4. Run the app

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

## 🧪 Running Tests

```bash
npx playwright test
```

To run in UI mode:

```bash
npx playwright test --headed
```

## ⚙️ CI/CD

GitHub Actions is configured to run Playwright tests on every push.

## 📌 Notes

* Filtering and sorting is API-based as required.
* URL query parameters are used to persist filters and sorting.
* Cart data is stored in localStorage.

### API Note

The original requirement suggested using FakeStore API. However, due to API unavailability during development, DummyJSON (https://dummyjson.com) was used as an alternative.
The application is structured with a service layer, making it easy to switch APIs without affecting the UI.


---