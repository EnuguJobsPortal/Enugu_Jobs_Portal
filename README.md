# React TypeScript Tailwind CSS Boilerplate

A simple boilerplate project for kickstarting your React web applications with TypeScript and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- React for building user interfaces.
- TypeScript for type-safe JavaScript.
- Tailwind CSS for utility-first styling.
- A pre-configured development environment.
- Common components and layout templates.
- Routing set up using React Router.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your development machine.
- npm or Yarn package manager installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/udoigwe/react-ts-tailwind-boilerplate.git

   a. Change the working directory:

      ```bash
      cd react-typescript-tailwind-boilerplate

   b. Install the project dependencies

      ```bash
      npm install

      OR

      ```bash
      yarn

### Usage

To start the development server and run the application, use the following command:

   ```bash
   npm run dev

   OR

   ```bash
   yarn dev

This will start the development server, and you can access the application at http://localhost:3000 in your web browser.

### Folder Structure

The project folder structure is organized as follows:

   src/
   |-- assets/
   |-- components/
   |-- layouts/
   |-- pages/
   |-- routes/
   |-- styles/
   |-- utils/
   |-- App.css
   |-- App.tsx
   |-- index.css
   |-- main.tsx
   |-- vite-env.d.ts

- assets/: Contains static assets like images, fonts, etc.
- components/: This folder contains reusable React components. Each component has its own folder with a .tsx file for the component logic and a .css (or .module.css for CSS Modules) file for styling.
- layouts/: Define layout components for consistent page structure.
- pages/: In this folder, you create components that represent the different pages or views of your application. Each page is a top-level component and is typically associated with a route.
- routes/: This folder can contain a file (AppRouter.tsx in this example) that defines your application's routing using a library like React Router. This helps keep the routing logic separate from your components.
- styles/: This folder can contain global styles (e.g., a global CSS file) or styles specific to your components. You can also use a CSS-in-JS library like styled-components or emotion.
- utils/: The utils folder is where you put utility functions, helper functions, and API related code. It helps keep your codebase clean and organized.
- App.tsx: This is the main entry point of your application and typically contains your top-level components or layout components.
- main.tsx: This is where you render your application using ReactDOM.
