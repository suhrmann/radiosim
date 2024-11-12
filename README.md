![Radio Device](./public/images/og_image.png)

# FunkSim - A BOS-Radio Device Simulator

This is a Vue 3 project utilizing Nuxt.js, Pinia, and Composition API to simulate a radio device.

## Features

- Interactive context buttons for managing dynamic actions.
- Centralized locking mechanism to disable all buttons when the system state is locked.
- Modular design using the Composition API and Pinia for state management.
- Implementation of modals for specific features (e.g., Group Selection Modal).

## Tech Stack

- **Vue 3**: The core framework used for building the user interface.
- **Nuxt.js**: For server-side rendering, better developer experience, and overall structure.
- **Pinia**: State management to handle application-level states like button locking, modal visibility, etc.
- **TypeScript**: Strong typing to reduce runtime errors and improve code maintainability.
- **Tailwind CSS**: Utility-first CSS framework used for styling.

## Setup Instructions

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- **Node.js** (version 16 or higher)
- **NPM** or **Yarn** or **PNPM** (to install dependencies)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/context-buttons-project.git
   cd context-buttons-project
   ```

2. **Install dependencies**:
   Using NPM:
   ```sh
   npm install
   ```
   Or using Yarn:
   ```sh
   yarn install
   ```
   Or using PNPM:
   ```sh
   pnpm install
   ```

3. **Run the development server**:
   Using NPM:
   ```sh
   npm run dev
   ```
   Or using Yarn:
   ```sh
   yarn dev
   ```
   Or using PNPM:
   ```sh
   pnpm dev
   ```

4. **Access the project**:
   Open your browser and go to `http://localhost:3000` to see the application in action.

### Building for Production

To create an optimized build for production, run:

```sh
npm run build
```

Or using Yarn:

```sh
yarn build
```

Or using PNPM:

```sh
pnpm build
```

The build artifacts will be stored in the `.output` directory, ready to be deployed.

### Scripts

- `npm run dev` or `yarn dev` or `pnpm dev`: Starts the development server.
- `npm run build` or `yarn build` or `pnpm build`: Creates a production build.

## Project Structure

- **/components**: Reusable Vue components like context buttons, modals, etc.
- **/composables**: Contains reusable logic, like button lock handling.
- **/stores**: Pinia stores used to manage global application state.
- **/pages**: Page components managed by Nuxt for routing.

## Contributing

If you wish to contribute:

1. **Fork** the repository.
2. **Create a new branch** for your feature or bug fix.
3. **Commit** your changes and push them to your branch.
4. **Create a Pull Request** and describe your changes in detail.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Nuxt.js Documentation**: For the latest best practices and tips.
- **Vue 3 and Pinia**: For providing an excellent modern JavaScript framework and state management.
- **Tailwind CSS**: For the fast and easy styling of components.