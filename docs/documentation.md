# Documentation of Custom Map
At the moment this web app only works in desktop devices, the mobile ones may experience some glitches or a compression of the UI.

> Last modified on 13/02/2022

## Some informations
This desktop application supports both light and dark mode. The colors, main dimensions and styles are contained into /src/styles.css.<br>
Tests are not implemented, because useless for this project.<br>
The image folder is located at /src/assets/img/ and the favicon at /src/favicon.ico

The *STARTING_POINT* folder is the old original project, now it doesn't have any importance in the finished project.

## Technologies
Angular, HTML5, CSS3, TypeScript, JSON
<hr><br>

## Data & Customization
The json files containing the configuration and the content are located in `/src/app/data`.<br>

### config.json
Page configuration<br>

| Setting | Description | Type | What modifies? |
|---|---| :--: |---|
| `page-name` | Name of the page/project | string | Title of the first big card of side-panel |
| `page-description` | Description of the page/project | string | Paragraph of the first big card of side-panel |
| `page-organization`<br> &emsp; 1.`name`<br> &emsp; 2. `icon` | Organization informations<br> &emsp; 1. Name of the organization<br> &emsp; 2. Path[^1] to the icon | <br> 1. string <br> 2. string | Header |
| `page-settings`<br> &emsp; 1. `autoTheme` | Page settings<br> &emsp; 1. Enable automatic theme selection based on browser theme | <br> 1. boolean | Entire page |
| `accessToken`<br> &emsp; 1. `jawg_map`<br> &emsp; 2. `fontAwesome` | Access tokens to third services<br> &emsp; 1. Jawg for the map<br> &emsp; 2. Font Awesome for icons | <br> 1. string <br> 2. string | |
| `map`<br> &emsp; 1. `minZoom`<br> &emsp; 2. `maxZoom`<br> &emsp; 3. `initial`<br> &emsp;&emsp; 3.1. `position`<br> &emsp;&emsp; 3.2. `zoom`<br> &emsp; 4. `marker`<br> &emsp;&emsp; 4.1. `icon`<br> &emsp;&emsp; 4.2. `size`<br> &emsp;&emsp; 4.3. `anchor`<br> &emsp;&emsp; 4.4. `zoomForFocus` | Map settings<br>&emsp;1. Minimum zoom of the map<br>&emsp;2. Maximum zoom of the map<br>&emsp;3. Initial settings<br>&emsp;&emsp;3.1. Coordinates to show<br>&emsp;&emsp;3.2. Zoom<br>&emsp;&emsp;4. Marker settings<br>&emsp;&emsp;4.1. Path[^1] to the marker icon<br>&emsp;&emsp;4.2. Dimensions<br>&emsp;&emsp;4.3. Anchor<br>&emsp;&emsp;4.4. Zoom when card is focused| 1. int<br>2. int<br>3.1. Array \<float> [2]<br>3.2. int<br>4.1. string<br>4.2. Array \<int> [2]<br>4.3. Array \<int> [2]<br>4.4. int | Map |

[^1]: The relative path starting from `/src/assets` folder

### content.json
This file contains the effective content of the page.<br>
The main object includes<br>
<details>
<summary><tt>cards (array of objects)</tt></summary>
  <br><b>The card is composed of these proprieties</b><br><br>

| Key | Desciprion | Type |
|---|---| :--: |
| `unique_id` | Unique card ID | string |
| `title` | The title | string |
| `brief_description` | A brief description shown in side-panel | Array \<string>[^2] |
| `tags` | A collection of tags related to the card | Array \<string> |
| `coord` | Coordinates of the place for the marker position into the map | Array \<int> |
</details>
<br>
<details>
<summary><tt>contents (object)</tt></summary>
  <br><b>Foreach card has also these proprieties inside of contents</b><br>Every content is associated to the corresponding card from the object key that is the <tt>unique_id</tt> of the card<br><br>
  
| Key | Description | Type | Notes |
|---|---| :--: |---|
| `text` | Full place content to be shown on card focused | Array \<string>[^2] | You can use html in there. The mark tag is redesigned on purpose for this functionality |
| `authors` | List of the card authors | Array \<string> | |
| `images`<br> &emsp; 1. `mip`<br> &emsp; 2. `bottom` | Images to include in full card explanation<br> &emsp; 1. Most Important Painting path[^1]<br> &emsp; 2. A list of paths[^1] of images | object<br> &emsp; 1. string<br> &emsp; 2. Array <string> | |
</details>

[^2]: Each string of the array is a paragraph

## Further Customizations
- **Change the map** → go to /src/app/map/map.component.ts and modify the L.titleLayer () call into initMap (), changing the url and attribution<br>
- **Change card focused page** → go to /src/app/side-panel/side-panel.component.html and modify the code inside of the section tag using <tt>focusedCard</tt> variable<br>

<hr><br>

## Components
| Component | Description | Input parameters | Output parameters | Selector | Public attributes | Public methods | 
|---|---|---|---| :--: |---|---|
| `home` | The home page | | | app-home | <details><summary><tt>sidePanelIsReduced: boolean</tt></summary><pre>True if panel is reduced to the minimum width</pre></details> <details><summary><tt>sidePanelIsFocused: boolean</tt></summary><pre>True if a card is focused, so side-panel is at its maximum width</pre></details> | <details><summary><tt>toogleSidePanel ()</tt></summary><pre>toggles the side-panel</pre></details> <details><summary><tt>cardFocused (card: any)</tt></summary><pre>when card is clicked, the page changes layout in order to show the card full content. The card parameter is the clicked card object</pre></details> <details><summary><tt>cardBlurred (card: any)</tt></summary><pre>the opposite of cardFocused</pre></details> |
| `header` | Header of the page | | | app-header | | |
| `side-panel` | The side panel with the list of cards | | <details><summary><tt>cardFocused: EventEmitter \<any></tt></summary><pre>emitted when card is clicked. It carries the clicked card object</pre></details> <details><summary><tt>cardBlurred: EventEmitter \<any></tt></summary><pre>emitted when card de-focused. It carries the clicked card object</pre></details> | app-side-panel | <details><summary><tt>focusedCard: any</tt></summary><pre>The complete content of the focused card</pre></details> <details><summary><tt>cards: Array \<any></tt></summary><pre>The array of card contents (object)</pre></details> | <details><summary><tt>focusCard (card_uid: string)</tt></summary><pre>Method called when card is clicked, it proceed with the notification of the parent component (cardFocused)</pre></details> <details><summary><tt>blurCard (card_uid: string)</tt></summary><pre>Method called when card is de-focused, it proceed with the notification of the parent component (cardBlurred)</pre></details> |
| `card` | The card of a place | <details><summary><tt>data: any</tt></summary><pre>The content of the card</pre></details> | | app-card | | |
| `map` | The map containing all the places | <details><summary><tt>flyToEvent: Observable \<any></tt></summary><pre>Listener for flyTo events (focus of a card)</pre></details> | | app-map | | |

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
