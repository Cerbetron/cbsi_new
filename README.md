# CSPIF Frontend

This is the frontend React application for the CSPIF project.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

1. **Install dependencies**

   ```
   npm install
   ```

2. **Start the development server**

   ```
   npm run start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000) by default.

3. **Build for production**

   ```
   npm run build
   ```

   The production-ready files will be in the `build` directory.

## Project Structure

- `src/` - Source code for the React app
- `public/` - Static assets and the HTML template

## Additional Notes

- Make sure your backend server (if any) is running and configured to accept requests from this frontend.
- For route configuration, see `src/routes/AppRoutes.jsx`.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
