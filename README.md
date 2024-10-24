# Feature folder system

[Video explanation of this folder structure](https://www.youtube.com/watch?v=xyxrB2Aa7KE)

The project has two ESLint configurations with different plugins that allow you to check the correctness of the imports. You can choose one of the configurations depending on your preferences.

Plugins:

- [eslint-plugin-project-structure](https://github.com/Igorkowalski94/eslint-plugin-project-structure/wiki/Plugin-homepage#root).
- [eslint-plugin-boundaries](https://github.com/javierbrea/eslint-plugin-boundaries).

> [!WARNING]  
> `eslint-plugin-boundaries` does not support ESLint 9.

If you want to compare the configurations of both plugins:

- The configuration for `eslint-plugin-boundaries` is located in `.eslintrc.json`.
- The configuration for `eslint-plugin-project-structure` is located in `independentModules.jsonc`. The plugin allows you to move the configuration to a separate file that suggests syntax and checks its correctness. You can also move the entire configuration to `.eslintrc.json`.

If you want to check import validation using `eslint-plugin-project-structure`:

1. Remove `.eslintrc.json`.
2. Rename `.eslintrc.alt.json` to `.eslintrc.json`.
