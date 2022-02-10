# Documentation of Custom Map
The creation of this documentation is still in progress, so something may be not present yet
<br><br>
## Used technologies
Angular, HTML, CSS, TypeScript, JSON

## Components
| Component | Description | Input parameters | Output parameters | Selector |
|---|---|---|---| :--: |
| `header` | Header of the page | | | app-header |
| `card` | The cards in side-panel | data | | app-card |

## Custom pipes
| Pipe | Description | Input parameter | Return |
|---|---|---|---|
| `arraybr` | Join strings with new line | Array of strings | Joined strings with '\<br>'

## Services
| Service | Description | Attributes | Methods | Notes |
|---|---|---|---|---|
| `Platform Customization Service (PCS)` | Loads config and content file, and provides them within the project | - `config`: configuration settings of the project <br> - `content`: content of the page | - `importCustomizations`: loads and parse json files | |

<br><hr>
## For development only
You can set the secrets (access tokens) needed for the project into the `/src/environmentssecret.ts` file
| Secret | Exported variable name | Type |
|---| :--: |---|
| jawg map access token | `accessToken` | string |
| Font Awesome access token | `fontAwesome_token` | string|
