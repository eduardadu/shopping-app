# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Notes

This app was made as a frontend challenge.
Due do the time restrictions there are a couple things that were left to do:

- Very specific tailwind sizes that should be specified in the tailwind.config were left untreated
- Some functions could be created regarding the 'navigate' features to sustain modularity
- Implement animations and smoother transitions and loadings (of images for example)
- Reorganize folders and files by feature for example a folder for shopping cart and its utils etc...
- Lacking time, I did not make components for the shopping cart page

Reasoning for some of the decisions made in the implementation

- There isn't a component for buttons and inputs as they were only used once
- I noticed there was a mix of use between black and the the blue color frist, with more time I would try to match everything
- Took some liberty with the responsiveness of the website (for example on wrapping and flexible sizing on the product grid etc..)

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
