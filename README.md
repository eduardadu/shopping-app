# Frontend Challenge - Project Overview

This app was built as part of a frontend challenge. Due to time constraints, some aspects were left incomplete or could be improved:

## To-Do List

- **Error Handling & Empty States**
  - Implement better handling for empty fields (e.g., when the cart is empty or no products are available on the homepage).
- **Tailwind Configuration**
  - Define specific Tailwind sizes in the `tailwind.config.js` file instead of using arbitrary values between brackets.
- **Navigation Modularity**
  - Refactor navigation-related logic into dedicated functions to improve modularity and maintainability.
- **Animations & Transitions**
  - Add animations and smoother transitions (e.g., image loading effects) to enhance user experience.
- **Project Structure & Organization**
  - Reorganize files by feature (e.g., create a dedicated folder for the shopping cart and its utilities).
- **Shopping Cart Components**
  - Create reusable components for the shopping cart page to improve code maintainability.

## Design & Implementation Decisions

- **No General Button/Input Components**
  - Since buttons and inputs were only used once, separate components were not created for them.
- **Color Inconsistencies**
  - The project currently has a mix of black and blue as primary colors. With more time, the color scheme would be unified.
- **Responsive Design Choices**
  - Some liberties were taken regarding responsiveness, such as flexible sizing and wrapping in the product grid.

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
