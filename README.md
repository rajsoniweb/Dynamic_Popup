# PopupHandler - Dynamic Popup Script
 ## Overview
The PopupHandler is a JavaScript class that dynamically creates and manages popups with different statuses: confirmation, success, failure, and warning. It supports animated transitions, reusable DOM structures, and customizable messages. This script can be easily integrated into any project that requires user interaction via popups.

## Features
* **Status-based Popups**: Built-in support for various statuses such as success, error, warning, confirm, and custom image-based popups.
* **Customizable**: Easily modify button texts, popup messages, colours, and actions.

* **Smooth Animations**: Popup fade-in, fade-out, and scale-up/scale-down effects for a polished UX.   

* **Reusable DOM Structure**: A predefined modal template with minimal markup that is dynamically generated. 

* **Callback Support**: Custom callback functions can be triggered on button actions.  

* **Customizable Icons and Buttons**: Each status type has a unique SVG icon and configurable button text. 
  
## Table of Contents
* [Installation](##installation)
* [Usage](#Usage)
  * [Basic Usage](#basic-usage)
  * [Displaying a Success Message](#Displaying-a-Success-Message)
* [API Documentation](#API-Documentation)
  *  [Constructor](#Constructor)
  *  [showPopup](#showPopup)
  *  [hidePopup](#hidePopup)
  *  [Callback Handling](#Callback-Handling)
* [Customization](#Customization)
* [Contributing](#Contributing)
* [License](#License)

## Installation  
To use PopupHandler, simply download or clone this repository and include the popup-script.js file in your project.

git clone https://github.com/rajsoniweb/popup-handler.git

You can directly include the script in your project using the <script> tag::
```javascript
<script src="path/to/popup-script.js"></script>
```
Or use ES6 modules if your project supports it:  
```javascript
import PopupHandler from './PopupHandler.js';
```
## Usage
### Basic Example
Create an instance of the PopupHandler class:
```javascript
const popup = new PopupHandler();

popup.showPopup({
    message: 'Do you want to proceed?',
    status: 'confirm',
    callback: () => {
        console.log('Confirmed!');
    }
});
```
### Displaying a Success Message  
```javascript
popup.showPopup({
    message: 'Your operation was successful!',
    status: 'success'
});
```
## API Documentation  
### Constructor  
``` Javascript
new PopupHandler();
```
Creates a new instance of the PopupHandler class and initializes the DOM structure for popups.  

### showPopup
``` javascript
popup.showPopup(popupConfig);
```
Displays a popup with a custom message, status, and optional callback function.
``` javascript
popup.showPopup({
    message: "Are you sure you want to proceed?",
    status: "confirm",  // Available statuses: confirm, success, failed, error, fail, warning, image.
    callback: () => {
        console.log("Confirmed!");
    },
    actionButtonText: "Yes, proceed"
});
```

## Popup Status Types
* `confirm`: Displays a confirmation popup.
* `success`: Displays a success message with an OK button.
* `failed`:  Displays a failure message.
* `error`:   Displays a failure message.
* `error`:   Displays a failure message.
* `warning`: Displays a warning message.
* `image`:   Displays a image in popup.

## Configuration Options

Here are the available configuration options for the `showPopup` method:

| Option            | Type       | Description                                                  |
|-------------------|------------|--------------------------------------------------------------|
| `message`         | `string`   | The message text to display in the popup.                    |
| `status`          | `string`   | The popup type. Available options: `confirm`, `success`, `failed`, `error`, `fail`, `warning`. |
| `callback`        | `function` | Optional. A function to execute when the confirm button is clicked. |
| `actionButtonText`| `string`   | Optional. Custom text for the action/confirm button.          |
| `imageUrl`        | `string`   | Optional URL for displaying an image in the popup (used for the "image" status).|
| `color`           | `string`   | Optional color to customize the appearance of the popup (e.g., header color, icon color and status color).|
| `svgIcon`         | `string`   |  Optional svg icon to customize the appearance of the popup.|


## hidePopup
``` javascript
popup.hidePopup();
```
Hides the currently visible popup with a smooth fade-out and scale-down animation.

## Callback Handling
You can pass a function to the callback property to handle custom actions after the confirm button is clicked.

``` javascript
popup.showPopup({
    message: 'Are you sure you want to delete this item?',
    status: 'confirm',
    callback: () => {
        console.log('Item deleted!');
    }
});
```

## Customization
You can customize the appearance and behavior of the popups by providing additional properties in the popupConfig object:  

* **Colors**: Override the default colors by specifying the color property in the config.  
* **Button Text**: Modify the confirm button text using the actionButtonText property.  
* **Custom Icons**: The library includes SVG-based icons for different statuses. You can replace them or add custom icons by modifying the getSvgIcons method.  

## Example with Custom Colors and Button Text
```javascript
popup.showPopup({
    message: 'This is a warning message!',
    status: 'warning',
    actionButtonText: 'Proceed Anyway',
    color: '#ff5722'
});
```

## Contributing
We welcome contributions to improve this library. If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-new-popup-type`.
3. Commit your changes: `git commit -m 'Add a new popup type'`.
4. Push to the branch: `git push origin feature-new-popup-type`.
5. Open a pull request.


## License
This project is licensed under the MIT License. 
