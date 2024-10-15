# PopupHandler - Dynamic Popup Script
 ## Overview
The PopupHandler is a JavaScript class that dynamically creates and manages popups with different statuses: confirmation, success, failure, and warning. It supports animated transitions, reusable DOM structures, and customizable messages. This script can be easily integrated into any project that requires user interaction via popups.

## Features
Dynamic Popups: Supports multiple popup types (confirmation, success, failed, and warning).
Smooth Animations: Includes fade-in, fade-out, and scaling transitions for smooth UX.
Reusable DOM Structure: Popups are created dynamically using template literals.
Callback Support: Custom callback functions can be triggered on button actions.
Customizable Icons and Buttons: Each status type has a unique SVG icon and configurable button text.
Installation
To use PopupHandler, simply download or clone this repository and include the popup-script.js file in your project.

git clone https://github.com/rajsoniweb/popup-handler.git

Then, import the script into your HTML file:

`<script src="path/to/popup-script.js"></script>`


## Usage
## Initialize PopupHandler
Create an instance of the PopupHandler class:

`const popup = new PopupHandler();`


## Show a Popup
You can display a popup by calling the showPopup method and passing in a configuration object:

popup.showPopup({
    message: "Are you sure you want to proceed?",
    status: "confirm",  // Available statuses: confirm, success, failed, warning
    callback: () => {
        console.log("Confirmed!");
    },
    actionButtonText: "Yes, proceed"
});

## Popup Status Types
* `confirm`: Displays a confirmation popup.
* `success`: Displays a success message with an OK button.
* `failed`:  Displays a failure message.
* `warning`: Displays a warning message.

## Configuration Options

Here are the available configuration options for the `showPopup` method:

| Option            | Type       | Description                                                  |
|-------------------|------------|--------------------------------------------------------------|
| `message`         | `string`   | The message text to display in the popup.                    |
| `status`          | `string`   | The popup type. Available options: `confirm`, `success`, `failed`, `warning`. |
| `callback`        | `function` | Optional. A function to execute when the confirm button is clicked. |
| `actionButtonText`| `string`   | Optional. Custom text for the action/confirm button.          |


## Example
popup.showPopup({
    message: "Operation successful!",
    status: "success"
});


## Contributing
Feel free to submit pull requests or open issues to suggest improvements or report bugs.
