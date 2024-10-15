const eleById = document.getElementById.bind(document);

class PopupHandler {
    constructor() {
        // Create the basic structure of both popups
        this.createPopupStructure();
    }

    svgIcons = {
        confirm: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fbbe04" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
            </svg>`,
        success: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#07a545" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
            </svg>`,
        failed: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#d40404" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
            </svg>`,
        warning: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#ff9800" viewBox="0 0 24 24">
                <path d="M12 2 L21 21 H3 Z" style="fill:#ff9800; stroke:#ff9800; stroke-width:4; stroke-linejoin:round;" />
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
            font-size: 19px;
            margin-bottom: 8px;
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
                    <div id="popup--header" style="padding: 2px;"></div>
                    <div id="popup--content" style="${popupContentStyle}">
                        <div id="popup--icon">
                        </div>
                        <div id="text--container" style="${textContainerStyle}">
                            <h3 id="popup--status" style="${popupStatusStyle}"></h3>
                            <span id="popup--msg" style="color: #6c757d;"></span>
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
        this.modal = eleById('custom--popup');
        this.modalContent = eleById('modal--content');
        this.icon = eleById('popup--icon');
        this.iconText = eleById('iconText');
        this.header = eleById('popup--header');
        this.popupStatus = eleById('popup--status');
        this.popupMsg = eleById('popup--msg');
        this.cancelButton = eleById('cancel--button');
        this.actionButton = eleById('action--button');

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
     * @param {string} popupConfig.status - The type or status of the popup (e.g., "confirm", "success", "failed", "warning").
     * @param {function} [popupConfig.callback] - Optional callback function executed when the confirm button is clicked.
     * @param {string} [popupConfig.actionButtonText] - Optional text for the action/confirm button.
     */
    showPopup(popupConfig) {
        const { message, status, callback, actionButtonText } = popupConfig;

        // Ensure status is lowercase for consistency
        const lowerStatus = status.toLowerCase();

        // Configurations based on status type
        const statusConfig = this.getStatusConfig(lowerStatus, actionButtonText, callback);

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
     */
    getStatusConfig(status, actionButtonText, callback) {
        const statusOptions = {
            confirm: {
                iconSVG: this.svgIcons.confirm,
                color: '#fbbe04',
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
            warning: {
                iconSVG: this.svgIcons.warning,
                color: '#ff9800',
                actionText: actionButtonText || 'Ok',
                cancelButton: 'none',
                actionHandler: () => this.handleActionWithCallback(callback)
            }
        };

        return statusOptions[status] || null;
    }

    /**
     * Apply the styles and content to the popup elements based on the provided configuration.
     * @param {string} status - The status to display in the popup (e.g., "confirm", "success", "failed", "warning").
     * @param {string} message - The message to display in the popup.
     * @param {Object} config - The configuration object containing styles, icons, and button settings.
     */
    applyPopupStylesAndContent(status, message, config) {
        this.modal.style.display = 'flex';
        this.header.style.background = config.color;
        this.popupStatus.textContent = status === 'confirm' ? 'Are You Sure?' : status.toUpperCase();
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


// Show a Popup
const submitBtn = document.getElementById('submit_btn');

const handleCallbackFunction = () => {
    const responseMsg = 'Action completed successfully!';
    const responseStatus = 'SUCCESS';

    popup.showPopup(
        popupConfig = {
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

    popup.showPopup(
        popupConfig = {
            message: responseMsg,
            status: responseStatus,
            callback: handleCallbackFunction,
            // actionButtonText: 'Proceed',
        }
    );
};
