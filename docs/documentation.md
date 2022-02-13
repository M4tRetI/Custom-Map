# Documentation of Custom Map
At the moment this web app only works in desktop devices, the mobile ones may experience some glitches or a compression of the UI.

<div align="right"><tt>Last modified on 13/02/2022</tt></div>

## Some informations
This desktop application supports both light and dark mode. The colors, main dimensions and styles are contained into /src/styles.css.<br>
Tests are not implemented, because useless for this project.<br>
The image folder is located at /src/assets/img/ and the favicon at /src/favicon.ico

The *STARTING_POINT* folder is the old original project, now it doesn't have any importance in the finished project.

## Technologies
Angular, HTML5, CSS3, TypeScript, JSON
<hr><br>

## Components
| Component | Description | Input parameters | Output parameters | Selector | Public attributes | Public methods | 
|---|---|---|---| :--: |---|---|
| `home` | The home page | | | app-home | <details><summary><tt>sidePanelIsReduced: boolean</tt></summary><pre>True if panel is reduced to the minimum width</pre></details> <details><summary><tt>sidePanelIsFocused: boolean</tt></summary><pre>True if a card is focused, so side-panel is at its maximum width</pre></details> | <details><summary><tt>toogleSidePanel ()</tt></summary><pre>toggles the side-panel</pre></details> <details><summary><tt>cardFocused (card: any)</tt></summary><pre>when card is clicked, the page changes layout in order to show the card full content. The card parameter is the clicked card object</pre></details> <details><summary><tt>cardBlurred (card: any)</tt></summary><pre>the opposite of cardFocused</pre></details> |
| `header` | Header of the page | | | app-header | | |
| `side-panel` | The side panel with the list of cards | | <details><summary><tt>cardFocused: EventEmitter \<any\></tt></summary><pre>emitted when card is clicked. It carries the clicked card object</pre></details> <details><summary><tt>cardBlurred: EventEmitter \<any\></tt></summary><pre>emitted when card de-focused. It carries the clicked card object</pre></details> | app-side-panel | <details><summary><tt>focusedCard: any</tt></summary><pre>The complete content of the focused card</pre></details> <details><summary><tt>cards: Array \<any\></tt></summary><pre>The array of card contents (object)</pre></details> | <details><summary><tt>focusCard (card_uid: string)</tt></summary><pre>Method called when card is clicked, it proceed with the notification of the parent component (cardFocused)</pre></details> <details><summary><tt>blurCard (card_uid: string)</tt></summary><pre>Method called when card is de-focused, it proceed with the notification of the parent component (cardBlurred)</pre></details> |
| `card` | The card of a place | <details><summary><tt>data: any</tt></summary><pre>The content of the card</pre></details> | | app-card | | |
| `map` | The map containing all the places | <details><summary><tt>flyToEvent: Observable \<any\></tt></summary><pre>Listener for flyTo events (focus of a card)</pre></details> | | app-map | | |

## Custom pipes
| Pipe | Description | Input parameter | Return |
|---|---|---|---|
| `arraybr` | Join strings with new line | Array of strings | Joined strings with '\<br>'

## Services
| Service | Description | Public attributes | Public methods |
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
