// Notification utilities using Bootstrap toasts
class NotificationManager {
    constructor() {
        this.createToastContainer();
    }

    // Create the toast container if it doesn't exist
    createToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '1055';
            document.body.appendChild(container);
        }
    }

    // Show a toast notification
    showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toast-container');
        
        // Create toast element
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="${duration}">
                <div class="toast-header">
                    <i class="bi ${this.getIcon(type)} text-${this.getColor(type)} me-2"></i>
                    <strong class="me-auto">${this.getTitle(type)}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        // Add toast to container
        container.insertAdjacentHTML('beforeend', toastHTML);
        
        // Initialize and show toast
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    // Get icon for toast type
    getIcon(type) {
        switch (type) {
            case 'success':
                return 'bi-check-circle-fill';
            case 'error':
                return 'bi-exclamation-triangle-fill';
            case 'warning':
                return 'bi-exclamation-triangle-fill';
            case 'info':
            default:
                return 'bi-info-circle-fill';
        }
    }

    // Get color for toast type
    getColor(type) {
        switch (type) {
            case 'success':
                return 'success';
            case 'error':
                return 'danger';
            case 'warning':
                return 'warning';
            case 'info':
            default:
                return 'info';
        }
    }

    // Get title for toast type
    getTitle(type) {
        switch (type) {
            case 'success':
                return 'Success';
            case 'error':
                return 'Error';
            case 'warning':
                return 'Warning';
            case 'info':
            default:
                return 'Information';
        }
    }

    // Convenience methods
    success(message, duration = 5000) {
        this.showToast(message, 'success', duration);
    }

    error(message, duration = 7000) {
        this.showToast(message, 'error', duration);
    }

    warning(message, duration = 6000) {
        this.showToast(message, 'warning', duration);
    }

    info(message, duration = 5000) {
        this.showToast(message, 'info', duration);
    }
}

// Create global instance
const notifications = new NotificationManager();
