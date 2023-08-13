## Contributing

First off, thank you for considering contributing to `msol-sns`. It's people like you that make it such a great tool.

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

**Note**: Please get your contributions approved by the maintainers of [msol-sns](https://github.com/WilfredAlmeida/msol-sns) before you start working on them. This will help avoid any conflicts and also help you understand if the contribution is in line with the project goals. You can do this by opening an issue with appropriate label and describing your contribution in detail.

### You have found a bug

Please open an issue with the label `bug`. To clearly explain the bug, describe it in as much detail as possible. Please add the steps-to-reproduce as well.

### You are requesting a new feature

Please open an issue with the label `enhancement` and include as much information as you can about the need for the feature. The maintainers will convert it into a discussion if needed.

### You want to add a new feature

Please open an issue with the label `enhancement` and include as much information as you can about the need for the feature. The maintainers will convert it into a discussion if needed. Once approved, the maintainers will assign the issue to you or anyone who wishes to work on the issue.

### You want support

Please open an issue with the label `help wanted`. The maintainers and other users of the platform will respond to it.

### You want to contact the maintainers

Open an issue or discussion on GitHub. Alternatively you can ping me on [Twitter](https://twitter.com/WilfredAlmeida) as well.

### Commits

Please keep commits modular. One big commit or commits with many files and breaking changes will be hard to understand and maintain and might lead to rejection of the contribution.

### Commit Messages

Please follow the semantic commit messages pattern similar to the one mentioned [here](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

### Pull Requests
Each pull request must have it own branch named `<issue>-description`. For eg. `1-add-readme`.

### Anything Else

Open an issue with the label `random` and discuss them there. You can ping me on [Twitter](https://twitter.com/WilfredAlmeida) as well.


## Developing Locally

`msol-sns` is built using:
1. Sveltekit
2. Vercel KV Database
3. Underdog API

### `.env` config
You need to provide the following values via the environment. The `KV_` values are provided on the Vercel KV DB dashboard. The `UNDERDOG_KEY` is available on its dashboard.
```
KV_URL
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
UNDERDOG_KEY
```

1. Clone the repository
2. Run `pnpm install` to download all the dependencies
3. Run `pnpm run dev -- --open` to start the application and launch it


## Development Versions
Following are the softwares & their versions used for development:
- `NodeJS v18.12.0`
- `pnpm 8.6.9`
- IDE: `MS Word`