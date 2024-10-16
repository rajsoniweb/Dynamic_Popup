const _eleByid = document.getElementById.bind(document);

class PopupHandler {
    constructor() {
        // Create the basic structure of both popups
        this.createPopupStructure();

        // Event listener for closing the popup when clicking outside
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) { // Check if the click is on the overlay
                this.hidePopup(); // Hide the popup
            }
        });
    }

    svgIcons = {
        confirm: `
        <svg width="90" height="68" style="margin: -18px 0px -5px -25px;" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" x="25" y="25" fill="#ffc107" transform="rotate(45 60 60)"></rect>
                <text x="60" y="42" font-size="27" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">?</text>
            </svg>`,
        success: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#07a545" stroke="#07a545" stroke-width="2"/>
                <path d="M8 12.5l3 3 5-6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
        failed: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#d40404" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
            </svg>`,
        warning: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#ff9800" viewBox="0 0 24 24">
                <path d="M12 4 L21 21 H3 Z" style="fill:#ff9800; stroke:#ff9800; stroke-width:4; stroke-linejoin:round;" />
                <circle cx="12" cy="18" r="1.3" fill="#fff" />
                <rect x="11" y="7" width="2" height="8" fill="#fff" rx="2" />
            </svg>`
    };

    // Create a reusable DOM structure for both types of pop-ups using template literals
    createPopupStructure() {
        // Define the styles in variables
        const modalStyle = `
            display: none; 
            position: fixed; 
            left: 0; 
            top: 0; 
            width: 100%; 
            height: 100%; 
            background-color: rgba(0, 0, 0, 0.5); 
            z-index: 1000; 
            justify-content: center; 
            align-items: center;
            opacity: 0; /* Start hidden */
            transition: opacity 0.3s ease-in-out; /* Smooth opacity transition */
        `;

        const modalContentStyle = `
            background-color: #fff; 
            border-radius: 5px; 
            width: 500px; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
            display: flex;
            flex-direction: column;
            transform: scale(0.7); /* Start scaled down */
            transition: transform 0.3s ease-in-out; /* Smooth scaling transition */
        `;

        const popupContentStyle = `
            display: flex;
            padding: 35px 10px 10px 20px;
        `;

        const textContainerStyle = `
            padding-left: 20px;
            justify-content: center;
            display: flex;
            flex-direction: column;
        `;

        const popupStatusStyle = `
            margin: 0;
            font-size: 20px;
            margin-bottom: 8px;
            font-weight: 500;
        `;

        const popupMsgStyle = `
            font-size: 15px;
            font-weight: 400;
            color: #8a8a8a;
        `;

        const buttonStyle = `
            cursor: pointer;
            font-size: 14px;
            padding: 8px 16px;
            border: none;
            border-radius: 7px;
        `;

        const cancelButtonStyle = `
            background-color: #e0e0e0;
            color: #000;
            margin-right: 10px;
        `;

        const confirmButtonStyle = `
            background-color: #034488;
            color: #fff;
        `;

        const footerStyle = `
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            padding: 10px 10px 10px;
            border-top: 1px solid #ddd;
        `;

        // Modal HTML using template literals
        const modalHTML = `
            <div id="custom--popup" style="${modalStyle}">
                <div id="modal--content" style="${modalContentStyle}">
                    <div id="popup--header" style="padding: 2.3px; border-radius: 5px 5px 0 0"></div>
                    <div id="popup--content" style="${popupContentStyle}">
                        <div id="popup--icon">
                        </div>
                        <div id="text--container" style="${textContainerStyle}">
                            <h3 id="popup--status" style="${popupStatusStyle}"></h3>
                            <span id="popup--msg" style="${popupMsgStyle}"></span>
                        </div>
                    </div>
                    <div id="footer--container" style="${footerStyle}">
                        <button id="cancel--button" style="${cancelButtonStyle} ${buttonStyle}">Cancel</button>
                        <button id="action--button" style="${confirmButtonStyle} ${buttonStyle}">Confirm</button>
                    </div>
                </div>
            </div>
        `;

        // Insert modal HTML into the body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Store references to elements for later use
        this.modal = _eleByid('custom--popup');
        this.modalContent = _eleByid('modal--content');
        this.icon = _eleByid('popup--icon');
        this.iconText = _eleByid('iconText');
        this.header = _eleByid('popup--header');
        this.popupStatus = _eleByid('popup--status');
        this.popupMsg = _eleByid('popup--msg');
        this.cancelButton = _eleByid('cancel--button');
        this.actionButton = _eleByid('action--button');

        // Event listeners for closing the popup
        this.cancelButton.onclick = () => this.hidePopup();
        this.actionButton.onclick = () => this.hidePopup();
    };

    // Handle callback function
    handleActionWithCallback(callback) {
        this.hidePopup(); // Hide the popup first
        if (callback && typeof callback === 'function') {
            setTimeout(() => {
                callback(); // Execute the callback after the popup is hidden
            }, 300); // Same delay as in the original code
        }
    }

    /**
     * Show a popup with a custom message, status, and optional callback for confirmation actions.
     * @param {Object} popupConfig - Configuration for displaying the popup.
     * @param {string} popupConfig.message - The message to display inside the popup.
     * @param {string} popupConfig.status - The type or status of the popup (e.g., "confirm", "success", "failed", "warning", "error", 'image').
     * @param {function} [popupConfig.callback] - Optional callback function executed when the confirm button is clicked.
     * @param {string} [popupConfig.actionButtonText] - Optional text for the action/confirm button.
     * * @param {string} [popupConfig.imageUrl] - Optional URL for displaying an image in the popup (used for the "image" status).
     */
    showPopup(popupConfig) {
        const { message, status, callback, actionButtonText, imageUrl } = popupConfig;

        // Ensure status is lowercase for consistency
        const lowerStatus = status.toLowerCase();

        if (status === 'image' && !imageUrl) { 
            console.error("Image URL not provided to showPopup");
            return;
        }
        // Configurations based on status type
        const statusConfig = this.getStatusConfig(lowerStatus, actionButtonText, callback, imageUrl);

        if (!statusConfig) {
            console.error("Invalid status provided to showPopup");
            return;
        }
        
        // Apply styles and content to popup elements
        this.applyPopupStylesAndContent(lowerStatus, message, statusConfig);

        // Animate the popup (fade-in and scale-up)
        setTimeout(() => {
            this.modal.style.opacity = '1';
            this.modalContent.style.transform = 'scale(1)';
        }, 10);
    }

    /**
     * Get status-specific configuration for the popup.
     * @param {string} status - The status type of the popup.
     * @param {string} [actionButtonText] - Optional custom text for the action button.
     * @param {function} [callback] - Optional callback function for confirmation actions.
     * @returns {Object|null} The status configuration object or null if the status is invalid.
     * @param {string} [imageUrl] - Optional URL for displaying an image in the popup (used for the "image" status).
     */
    getStatusConfig(status, actionButtonText, callback, imageUrl) {
        const statusOptions = {
            confirm: {
                iconSVG: this.svgIcons.confirm,
                color: '#ffc107',
                actionText: actionButtonText || 'Confirm',
                cancelButton: 'inline-block',
                actionHandler: () => this.handleActionWithCallback(callback)
            },
            success: {
                iconSVG: this.svgIcons.success,
                color: '#07a545',
                actionText: actionButtonText || 'Done',
                cancelButton: 'none',
                actionHandler: () => this.handleActionWithCallback(callback)
            },
            failed: {
                iconSVG: this.svgIcons.failed,
                color: '#d40404',
                actionText: actionButtonText || 'Ok',
                cancelButton: 'none',
                actionHandler: () => this.handleActionWithCallback(callback)
            },
            error: {
                iconSVG: this.svgIcons.failed,
                color: '#d40404',
                actionText: actionButtonText || 'Ok',
                cancelButton: 'none',
                actionHandler: () => this.handleActionWithCallback(callback)
            },
            warning: {
                iconSVG: this.svgIcons.warning,
                color: '#ff9800',
                actionText: actionButtonText || 'Ok',
                cancelButton: 'none',
                actionHandler: () => this.handleActionWithCallback(callback)
            },
            image: {
                iconSVG: `<img src="${imageUrl}" style="width: 100%;" alt="popup image">`,
                color: '#fff',
                actionText: actionButtonText || 'Close',
                cancelButton: 'none',
                actionHandler: () => this.hidePopup()
            }
        };

        return statusOptions[status] || null;
    }

    /**
     * Apply the styles and content to the popup elements based on the provided configuration.
     * @param {string} status - The status to display in the popup (e.g., "confirm", "success", "failed", "warning", "error", 'image').
     * @param {string} message - The message to display in the popup.
     * @param {Object} config - The configuration object containing styles, icons, and button settings.
     */
    applyPopupStylesAndContent(status, message, config) {
        this.modal.style.display = 'flex';
        this.header.style.background = config.color;
        this.popupStatus.textContent = status === 'confirm' ? 'Are You Sure?' : status === 'image' ? ''  : status.toUpperCase();
        this.popupMsg.textContent = message;
        this.icon.innerHTML = config.iconSVG;
        this.popupStatus.style.color = config.color;
        this.cancelButton.style.display = config.cancelButton;
        this.actionButton.textContent = config.actionText;
        this.actionButton.onclick = config.actionHandler;
    }

    // Hide the popup with a fade-out effect
    hidePopup() {
        // Apply fade-out and scale-down effect
        this.modal.style.opacity = '0'; // Fade-out effect
        this.modalContent.style.transform = 'scale(0.7)'; // Scale-down effect

        // After transition ends, hide the popup completely
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
    };
}
const popup = new PopupHandler();

// Execution popup
const submitBtn = _eleById('submit_btn');

const handleCallbackFunction = () => {
    const responseMsg = 'Action completed successfully!';
    const responseStatus = 'SUCCESS';

    popup.showPopup({
            message: responseMsg,
            status: responseStatus,
        });
};

submitBtn.onclick = function (e) {
    e.preventDefault();

    const responseMsg = 'Do you want to confirm this action?';
    const responseStatus = 'confirm';
    // const responseStatus = 'warning';
    // const responseStatus = 'success';
    // const responseStatus = 'failed';

    popup.showPopup({
            message: responseMsg,
            status: responseStatus,
            callback: handleCallbackFunction,
            actionButtonText: 'Proceed',
        }
    );
};
