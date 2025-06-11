// Header component
class Header {
    constructor() {
        this.admin = getCurrentAdmin();
        
        this.template = `
            <div class="d-flex justify-content-between align-items-center w-100">
                <div>
                    <button class="btn btn-sm btn-outline-secondary toggle-sidebar">
                        <i class="bi bi-list"></i>
                    </button>
                    <span class="ms-2 d-none d-md-inline">Dashboard</span>
                </div>
                
                <div class="d-flex align-items-center">
                    <div class="dropdown">
                        <button class="btn dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="me-2 d-none d-md-inline">${this.admin ? `${this.admin.firstName} ${this.admin.lastName}` : 'Admin'}</span>
                            <div class="avatar">
                                <i class="bi bi-person-circle fs-4"></i>
                            </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item profile-btn" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item logout-btn" href="#"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render the header
    render() {
        return this.template;
    }
    
    // Add event listeners
    addEventListeners() {
        // Add profile button event listener
        const profileBtn = document.querySelector('.profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showProfile();
            });
        }
    }
    
    // Show admin profile
    showProfile() {
        const admin = this.admin;
        if (!admin) {
            if (typeof notifications !== 'undefined') {
                notifications.error('Unable to load profile information');
            }
            return;
        }
        
        // Create modal for profile display if it doesn't exist
        if (!document.getElementById('profileModal')) {
            const modalHTML = `
                <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="profileModalLabel">Admin Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="text-center mb-3">
                                    <div class="avatar-lg mx-auto mb-3">
                                        <i class="bi bi-person-circle fs-1"></i>
                                    </div>
                                    <h4>${admin.firstName} ${admin.lastName}</h4>
                                    <p class="text-muted">${admin.email}</p>
                                </div>
                                <div class="mt-4">
                                    <h6>Account Information</h6>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span>Email:</span>
                                            <span>${admin.email}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span>Role:</span>
                                            <span>Administrator</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <span>Account Created:</span>
                                            <span>${admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        // Show the profile modal
        const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
        profileModal.show();
    }
}
