# tomclima.github.io

This repository contains a personal blog and static website built with Eleventy (11ty). It uses Markdown for posts, Nunjucks templates for layouts, and a small set of custom components and assets.

## What this site uses

- Eleventy for static site generation
- Markdown for blog content
- Nunjucks templates in the _includes directory
- Custom frontend components in the components directory
- Static assets such as images and styles in the assets directory

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm start
   ```
   This will run Eleventy in watch mode and serve the site locally.
3. Build the site for production:
   ```bash
   npm run build
   ```
   The generated output will be placed in the _site directory.

## Project structure

- posts/: blog posts and content files
- _includes/: shared layout and template files
- components/: reusable UI components
- assets/: images, styles, and other static files
- .eleventy.js: Eleventy configuration and passthrough settings

## Writing a new post

Create a new Markdown file inside the posts directory. Eleventy will pick it up automatically when the site is built.

## Deployment

This site is intended to be published as a static site, such as via GitHub Pages. The production build output is generated in _site/.
