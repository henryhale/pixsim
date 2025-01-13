# Development Setup

## Prerequisites

-   [Git](https://git-scm.org)
-   [Node.js v20+](https://nodejs.org)
-   [pnpm v9+](https://pnpm.io)

## Setup

To get started with development, follow these steps:

-   Clone the GitHub repository using
    ```sh
    git clone https://github.com/henryhale/pixsim.git
    cd pixsim
    ```
-   Install dev dependencies
    ```sh
    pnpm install
    ```
-   Run development server - demo apps
    ```sh
    pnpm dev
    ```
-   Run development server - documentation
    ```sh
    pnpm dev:docs
    ```

## Building

To build the project, use

```sh
pnpm build
```

This will generate the production-ready distribution files in the
`docs/.vitepress/dist` directory.

To preview the bundled docs site, use

```sh
pnpm preview
```

## Issues

In case of any issues, bugs, or improvements, feel free to open a [new issue](https://github.com/henryhale/pixsim/issues/new/choose) on GitHub.
