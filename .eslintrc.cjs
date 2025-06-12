module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    ignorePatterns: ["docs/unused", "nexus"],
    extends: ["./nexus/.eslintrc-server.cjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
    },
    overrides: [
        {
            files: [
                "postcss.config.js",
                "tailwind.config.js",
                "src/store/combined.store.ts",
            ],
            rules: {
                "import/no-default-export": "off",
                "import/no-unused-modules": "off",
            },
        },
        {
            files: ["src/types/satisfactory/apis/dataTransferObject/**"],
            rules: {
                "import/no-unused-modules": "off",
            },
        },
    ],
};
