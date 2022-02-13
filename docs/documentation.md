# Documentation of Custom Map
The creation of this documentation is still in progress, so something may be not present yet
<br><br>
## Technologies
Angular, HTML, CSS, TypeScript, JSON

## Components
| Component | Description | Input parameters | Output parameters | Selector | Attributes | Methods | 
|---|---|---|---| :--: |---|---|
| `home` | The home page | | | app-home | <details><summary><tt>sidePanelIsReduced: boolean</tt></summary><pre>True if panel is reduced to the minimum width</pre></details> <details><summary><tt>sidePanelIsFocused: boolean</tt></summary><pre>True if a card is focused, so side-panel is at its maximum width</pre></details> | <details><summary><tt>toogleSidePanel ()</tt></summary><pre>toggles the side-panel</pre></details> <details><summary><tt>cardFocused (card: any)</tt></summary><pre>when card is clicked, the page changes layout in order to show the card full content. The card parameter is the clicked card object</pre></details> <details><summary><tt>cardBlurred (card: any)</tt></summary><pre>the opposite of cardFocused</pre></details> |
| `header` | Header of the page | | | app-header | | |
| `side-panel` | The side panel with the list of cards | | <details><summary><tt>cardFocused: EventEmitter \<any\></tt></summary><pre>emitted when card is clicked. It carries the clicked card object</pre></details> <details><summary><tt>cardBlurred: EventEmitter \<any\></tt></summary><pre>emitted when card de-focused. It carries the clicked card object</pre></details> | app-side-panel | | |

## Custom pipes
| Pipe | Description | Input parameter | Return |
|---|---|---|---|
| `arraybr` | Join strings with new line | Array of strings | Joined strings with '\<br>'

## Services
| Service | Description | Attributes | Methods |
|---|---|---|---|
| `Platform Customization Service (PCS)` | Loads config and content file, and provides them within the project | <details><summary><tt>config</tt></summary><pre>configuration settings of the project</pre></details> <details><summary><tt>content</tt></summary><pre>content of the page</pre></details> | <details><summary><tt>importCustomizations</tt></summary><pre>loads and parse json files</pre></details> |

## Vulnerabilities
The json files can contain malicoius code that is injected into html (XSS attack).
  
<br><hr>
## For development only
You can set the secrets (access tokens) needed for the project into the `/src/environmentssecret.ts` file
| Secret | Exported variable name | Type |
|---| :--: |---|
| jawg map access token | `accessToken` | string |
| Font Awesome access token | `fontAwesome_token` | string|
