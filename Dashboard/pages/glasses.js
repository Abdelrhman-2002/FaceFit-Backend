// Glasses management page with image management functionality
// This file contains logic for adding, editing, and removing glasses products
// including functionality to remove existing images from products


class GlassesPage {
    constructor() {
        this.template = `
            <div class="dashboard-container">
                <div id="sidebar" class="sidebar">
                    <!-- Sidebar content will be loaded here -->
                </div>
                
                <div class="main-content">
                    <div id="header" class="dashboard-header">
                        <!-- Header content will be loaded here -->
                    </div>
                    
                    <div class="data-table-container">
                        <div class="data-table-header">
                            <h3>Glasses Products</h3>
                            <div class="data-table-actions">
                                <button class="btn btn-outline-secondary btn-sm me-2" id="refresh-session-btn" title="Refresh session if you're having authentication issues">
                                    <i class="bi bi-arrow-clockwise"></i> Refresh Session
                                </button>
                                <button class="btn btn-primary" id="add-glasses-btn">
                                    <i class="bi bi-plus"></i> Add New Glasses
                                </button>
                            </div>
                        </div>
                        
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Type</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="glasses-list">
                                    <tr>
                                        <td colspan="7" class="text-center">Loading glasses...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <nav aria-label="Glasses pagination">
                            <ul class="pagination justify-content-center" id="glasses-pagination">
                                <!-- Pagination will be generated dynamically -->
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            
            <!-- Add/Edit Glasses Modal -->
            <div class="modal fade" id="glassesModal" tabindex="-1" aria-labelledby="glassesModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="glassesModalLabel">Add New Glasses</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="glasses-form">
                                <input type="hidden" id="glasses-id">
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="glasses-name" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="glasses-name" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="glasses-price" class="form-label">Price</label>
                                        <div class="input-group">
                                            <span class="input-group-text">$</span>
                                            <input type="number" class="form-control" id="glasses-price" step="0.01" min="0" required>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="glasses-stock" class="form-label">Stock</label>
                                        <input type="number" class="form-control" id="glasses-stock" min="0" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="glasses-type" class="form-label">Type</label>
                                        <select class="form-select" id="glasses-type" required>
                                            <option value="sunglasses">Sunglasses</option>
                                            <option value="eyeglasses">Eyeglasses</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="glasses-gender" class="form-label">Gender</label>
                                        <select class="form-select" id="glasses-gender" required>
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="glasses-shape" class="form-label">Shape</label>
                                        <input type="text" class="form-control" id="glasses-shape" required>
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="glasses-weight" class="form-label">Weight (g)</label>
                                        <input type="number" class="form-control" id="glasses-weight" step="0.1" min="0" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="glasses-material" class="form-label">Material</label>
                                        <input type="text" class="form-control" id="glasses-material" required>
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="glasses-size" class="form-label">Size</label>
                                        <input type="text" class="form-control" id="glasses-size" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="glasses-try-on" class="form-label">Try On Available</label>
                                        <select class="form-select" id="glasses-try-on">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="glasses-colors" class="form-label">Colors (comma separated)</label>
                                    <input type="text" class="form-control" id="glasses-colors" placeholder="e.g. Black, Blue, Red" required>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="glasses-images" class="form-label">Images</label>
                                    <input type="file" class="form-control" id="glasses-images" multiple accept="image/*">
                                    <div id="image-preview" class="mt-2 d-flex flex-wrap gap-2">
                                        <!-- Image previews will be shown here -->
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label class="form-label">AR Models (optional)</label>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <label for="model-arms-obj" class="form-label">Arms OBJ</label>
                                                    <input type="file" class="form-control" id="model-arms-obj" accept=".obj">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="model-arms-mtl" class="form-label">Arms MTL</label>
                                                    <input type="file" class="form-control" id="model-arms-mtl" accept=".mtl">
                                                </div>
                                            </div>
                                            
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <label for="model-lenses-obj" class="form-label">Lenses OBJ</label>
                                                    <input type="file" class="form-control" id="model-lenses-obj" accept=".obj">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="model-lenses-mtl" class="form-label">Lenses MTL</label>
                                                    <input type="file" class="form-control" id="model-lenses-mtl" accept=".mtl">
                                                </div>
                                            </div>
                                            
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <label for="model-frame-obj" class="form-label">Frame OBJ</label>
                                                    <input type="file" class="form-control" id="model-frame-obj" accept=".obj">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="model-frame-mtl" class="form-label">Frame MTL</label>
                                                    <input type="file" class="form-control" id="model-frame-mtl" accept=".mtl">
                                                </div>
                                            </div>
                                            
                                            <div class="mb-3">
                                                <label for="model-arms-material" class="form-label">Arms Material Images</label>
                                                <input type="file" class="form-control" id="model-arms-material" multiple accept="image/*">
                                            </div>
                                            
                                            <div class="mb-3">
                                                <label for="model-frame-material" class="form-label">Frame Material Images</label>
                                                <input type="file" class="form-control" id="model-frame-material" multiple accept="image/*">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="save-glasses-btn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Delete Confirmation Modal -->
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" id="confirm-delete-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initialize the glasses page
    async init() {
        const appElement = document.getElementById('app');
        appElement.innerHTML = this.template;
        
        // Load components
        this.loadSidebar();
        this.loadHeader();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Debug API connection
        if (window.location.search.includes('debug=true')) {
            await this.debugApiConnection();
        }
        
        // Enhanced authentication check
        if (!isAuthenticated()) {
            console.warn('User not authenticated, redirecting to login');
            notifications.warning('Please log in to access glasses management');
            setTimeout(() => {
                window.navigateTo('login');
            }, 2000);
            return;
        }
        
        // Check if token is still valid
        try {
            const isValid = await isAuthenticatedAndValid();
            if (!isValid) {
                console.warn('Token is invalid, redirecting to login');
                notifications.warning('Your session has expired. Please log in again.');
                setTimeout(() => {
                    window.navigateTo('login');
                }, 2000);
                return;
            }
        } catch (error) {
            console.warn('Could not verify authentication, proceeding anyway');
        }

        // Load glasses data
        this.loadGlassesData();
    }
    
    // Load sidebar component
    loadSidebar() {
        const sidebar = new Sidebar('glasses');
        document.getElementById('sidebar').innerHTML = sidebar.render();
        sidebar.addEventListeners();
    }
    
    // Load header component
    loadHeader() {
        const header = new Header();
        document.getElementById('header').innerHTML = header.render();
        header.addEventListeners();
    }
    
    // Set up event listeners
    setupEventListeners() {
        // Add new glasses button
        const addGlassesBtn = document.getElementById('add-glasses-btn');
        addGlassesBtn.addEventListener('click', () => {
            // Reset form and show modal
            this.resetGlassesForm();
            document.getElementById('glassesModalLabel').textContent = 'Add New Glasses';
            
            const glassesModal = new bootstrap.Modal(document.getElementById('glassesModal'));
            glassesModal.show();
        });
        
        // Refresh session button
        const refreshSessionBtn = document.getElementById('refresh-session-btn');
        refreshSessionBtn.addEventListener('click', async () => {
            try {
                refreshSessionBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Refreshing...';
                refreshSessionBtn.disabled = true;
                
                // Check if current session is valid
                const isValid = await isAuthenticatedAndValid();
                if (isValid) {
                    notifications.success('Session is valid and active!');
                    // Reload data to confirm everything is working
                    this.loadGlassesData();
                } else {
                    notifications.warning('Session expired. Please log in again.');
                    setTimeout(() => {
                        window.navigateTo('login');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                notifications.error('Could not verify session. Please try logging in again.');
            } finally {
                refreshSessionBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Refresh Session';
                refreshSessionBtn.disabled = false;
            }
        });
        
        // Save glasses button
        const saveGlassesBtn = document.getElementById('save-glasses-btn');
        saveGlassesBtn.addEventListener('click', () => this.handleSaveGlasses());
        
        // Image preview
        const imagesInput = document.getElementById('glasses-images');
        imagesInput.addEventListener('change', (e) => {
            const imagePreview = document.getElementById('image-preview');
            
            // Clear preview of new images only (keep existing images)
            const newPreviews = imagePreview.querySelectorAll('.new-image-preview');
            newPreviews.forEach(el => el.remove());
            
            if (e.target.files.length > 0) {
                for (const file of e.target.files) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imgContainer = document.createElement('div');
                        imgContainer.className = 'position-relative d-inline-block me-2 mb-2 new-image-preview';
                        
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.classList.add('img-thumbnail');
                        img.style.width = '100px';
                        img.style.height = '100px';
                        img.style.objectFit = 'cover';
                        
                        // Add a badge to show this is a new image
                        const badge = document.createElement('span');
                        badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success';
                        badge.style.fontSize = '0.6rem';
                        badge.textContent = 'New';
                        
                        imgContainer.appendChild(img);
                        imgContainer.appendChild(badge);
                        imagePreview.appendChild(imgContainer);
                    };
                    reader.readAsDataURL(file);
                }
            }
            
            // Validate images after new selection
            this.validateRemainingImages();
        });
    }
    
    // Load glasses data from API
    async loadGlassesData() {
        const glassesListContainer = document.getElementById('glasses-list');
        glassesListContainer.innerHTML = '<tr><td colspan="7" class="text-center">Loading glasses...</td></tr>';
        
        try {
            // Debug: Check authentication status
            console.log('Auth status:', isAuthenticated());
            console.log('Auth token:', getAuthToken());
            console.log('Current admin:', getCurrentAdmin());
            
            console.log('API request: Loading all glasses');
            
            const response = await api.glasses.getAll();
            console.log('Glasses API response:', response);
            
            // Handle different response structures
            let glasses = [];
            if (response.data && response.data.data) {
                glasses = response.data.data;
            } else if (response.data && Array.isArray(response.data)) {
                glasses = response.data;
            } else if (Array.isArray(response.data)) {
                glasses = response.data;
            }
            
            console.log('Processed glasses data:', glasses);
            
            if (glasses.length > 0) {
                glassesListContainer.innerHTML = glasses.map(glasses => `
                    <tr>
                        <td>
                            <img src="${glasses.images && glasses.images.length > 0 ? 
                                (glasses.images[0].includes('http') ? 
                                    glasses.images[0] : 
                                    `http://localhost:5007/${glasses.images[0]}`) : 
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+'}" 
                                alt="${glasses.name}" 
                                style="width: 50px; height: 50px; object-fit: cover;"
                                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+'; this.title='Image not found'; console.error('Failed to load image: ' + this.src);">
                        </td>
                        <td>${glasses.name}</td>
                        <td>$${glasses.price.toFixed(2)}</td>
                        <td>${glasses.stock}</td>
                        <td>${glasses.type}</td>
                        <td>${glasses.gender}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary edit-glasses-btn" data-id="${glasses._id}">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger delete-glasses-btn" data-id="${glasses._id}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
                
                // Add event listeners to edit and delete buttons
                this.addRowActionListeners();
            } else {
                glassesListContainer.innerHTML = '<tr><td colspan="7" class="text-center">No glasses found</td></tr>';
            }
            
            // Add pagination (simplified)
            document.getElementById('glasses-pagination').innerHTML = `
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            `;
        } catch (error) {
            console.error('Error loading glasses:', error);
            
            // Provide detailed error information
            let errorMessage = 'Error loading glasses. ';
            
            if (error.response) {
                console.error('Server error response:', error.response);
                if (error.response.status === 401) {
                    errorMessage += 'Authentication failed. Please log in again.';
                    // Redirect to login
                    setTimeout(() => {
                        window.navigateTo('login');
                    }, 2000);
                } else if (error.response.status === 403) {
                    errorMessage += 'Access denied. You do not have permission to view glasses.';
                } else if (error.response.status === 500) {
                    errorMessage += 'Server error. Please try again later.';
                } else if (error.response.data && error.response.data.message) {
                    errorMessage += error.response.data.message;
                } else {
                    errorMessage += `Server returned status ${error.response.status}.`;
                }
            } else if (error.request) {
                console.error('Network error:', error.request);
                errorMessage += 'Network error. Please check your connection.';
            } else {
                console.error('Error details:', error.message);
                errorMessage += error.message || 'Please try again.';
            }
            
            glassesListContainer.innerHTML = `<tr><td colspan="7" class="text-center text-danger">${errorMessage}</td></tr>`;
            notifications.error(errorMessage);
        }
    }
    
    // Add event listeners to row action buttons
    addRowActionListeners() {
        // Edit button listeners
        const editButtons = document.querySelectorAll('.edit-glasses-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const glassesId = button.getAttribute('data-id');
                this.loadGlassesForEdit(glassesId);
            });
        });
        
        // Delete button listeners
        const deleteButtons = document.querySelectorAll('.delete-glasses-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const glassesId = button.getAttribute('data-id');
                this.showDeleteConfirmation(glassesId);
            });
        });
    }
    
    // Load glasses data for editing
    async loadGlassesForEdit(glassesId) {
        try {
            // Show loading state
            const editModal = new bootstrap.Modal(document.getElementById('glassesModal'));
            editModal.show();
            
            // Reset form and show loading
            this.resetGlassesForm();
            document.getElementById('glasses-id').value = glassesId;
            document.getElementById('glassesModalLabel').textContent = 'Loading glasses data...';
            
            // Fetch the glasses data by ID
            console.log('Fetching glasses data for ID:', glassesId);
            const response = await api.glasses.getById(glassesId);
            console.log('API Response:', response);
            
            // Handle different response structures
            let glasses;
            if (response.data && response.data.data) {
                glasses = response.data.data;
            } else if (response.data) {
                glasses = response.data;
            } else {
                throw new Error('Invalid response structure');
            }
            
            console.log('Glasses data:', glasses);
            
            // Populate the form
            document.getElementById('glasses-id').value = glasses._id;
            document.getElementById('glasses-name').value = glasses.name;
            document.getElementById('glasses-price').value = glasses.price;
            document.getElementById('glasses-stock').value = glasses.stock;
            document.getElementById('glasses-type').value = glasses.type;
            document.getElementById('glasses-gender').value = glasses.gender;
            document.getElementById('glasses-shape').value = glasses.shape || '';
            document.getElementById('glasses-weight').value = glasses.weight || '';
            document.getElementById('glasses-size').value = glasses.size || '';
            document.getElementById('glasses-material').value = glasses.material || '';
            document.getElementById('glasses-colors').value = Array.isArray(glasses.colors) ? glasses.colors.join(', ') : glasses.colors || '';
            document.getElementById('glasses-try-on').value = glasses.tryOn ? 'true' : 'false';
            
            // Show image previews
            const imagePreview = document.getElementById('image-preview');
            imagePreview.innerHTML = '';
            
            if (glasses.images && glasses.images.length > 0) {
                glasses.images.forEach((imgSrc, index) => {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'position-relative d-inline-block me-2 mb-2';
                    imgContainer.dataset.imagePath = imgSrc;
                    
                    const img = document.createElement('img');
                    // Handle both relative and absolute image paths
                    if (imgSrc.startsWith('http')) {
                        img.src = imgSrc;
                    } else {
                        img.src = `http://localhost:5007/${imgSrc}`;
                    }
                    
                    img.classList.add('img-thumbnail');
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    
                    // Add error handling for image loading
                    img.onerror = function() {
                        console.error(`Failed to load image: ${this.src}`);
                        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                        this.title = 'Image not found';
                    };
                    
                    // Add a delete button for existing images
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'btn btn-sm btn-danger position-absolute top-0 end-0';
                    deleteBtn.innerHTML = '<i class="bi bi-x"></i>';
                    deleteBtn.style.padding = '0.1rem 0.3rem';
                    deleteBtn.style.fontSize = '0.7rem';
                    deleteBtn.title = 'Remove image';
                    
                    // Add click event to mark image for deletion
                    deleteBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.toggleImageDeletion(imgContainer, imgSrc);
                    });
                    
                    // Add a badge to show this is an existing image
                    const badge = document.createElement('span');
                    badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info';
                    badge.style.fontSize = '0.6rem';
                    badge.textContent = 'Current';
                    
                    imgContainer.appendChild(img);
                    imgContainer.appendChild(deleteBtn);
                    imgContainer.appendChild(badge);
                    imagePreview.appendChild(imgContainer);
                });
            } else {
                // Show placeholder when no images
                const placeholder = document.createElement('div');
                placeholder.className = 'text-muted text-center p-3 border rounded';
                placeholder.innerHTML = '<i class="bi bi-image"></i><br>No images available';
                imagePreview.appendChild(placeholder);
            }
            
            // Update modal title
            document.getElementById('glassesModalLabel').textContent = 'Edit Glasses';
            
        } catch (error) {
            console.error('Error loading glasses for edit:', error);
            
            // Provide more specific error information
            let errorMessage = 'Error loading glasses data. ';
            
            if (error.response) {
                // Server responded with error status
                console.error('Server error response:', error.response);
                if (error.response.status === 401) {
                    errorMessage += 'Authentication failed. Please log in again.';
                } else if (error.response.status === 404) {
                    errorMessage += 'Glasses not found.';
                } else if (error.response.status === 500) {
                    errorMessage += 'Server error. Please try again later.';
                } else if (error.response.data && error.response.data.message) {
                    errorMessage += error.response.data.message;
                } else {
                    errorMessage += `Server returned status ${error.response.status}.`;
                }
            } else if (error.request) {
                // Network error
                console.error('Network error:', error.request);
                errorMessage += 'Network error. Please check your connection and try again.';
            } else {
                // Other error
                console.error('Error details:', error.message);
                errorMessage += error.message || 'Please try again.';
            }
            
            notifications.error(errorMessage);
            
            // Close modal on error
            const modal = bootstrap.Modal.getInstance(document.getElementById('glassesModal'));
            if (modal) {
                modal.hide();
            }
        }
    }
    
    // Show delete confirmation modal
    showDeleteConfirmation(glassesId) {
        // Find the glasses name from the table row
        const deleteButton = document.querySelector(`[data-id="${glassesId}"].delete-glasses-btn`);
        const tableRow = deleteButton.closest('tr');
        const glassesName = tableRow.querySelector('td:nth-child(2)').textContent;
        
        // Update modal content with glasses name
        const modalBody = document.querySelector('#deleteModal .modal-body');
        modalBody.innerHTML = `Are you sure you want to delete <strong>"${glassesName}"</strong>? This action cannot be undone.`;
        
        // Set up the delete button click handler
        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
        
        // Remove any existing event listeners
        const newConfirmDeleteBtn = confirmDeleteBtn.cloneNode(true);
        confirmDeleteBtn.parentNode.replaceChild(newConfirmDeleteBtn, confirmDeleteBtn);
        
        // Add new event listener
        newConfirmDeleteBtn.addEventListener('click', () => this.handleDeleteGlasses(glassesId));
        
        // Show the modal
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
    }
    
    // Toggle image for deletion
    toggleImageDeletion(imgContainer, imagePath) {
        // Get or create the hidden input field to track deleted images
        let deletedImagesInput = document.getElementById('deleted-images');
        if (!deletedImagesInput) {
            deletedImagesInput = document.createElement('input');
            deletedImagesInput.type = 'hidden';
            deletedImagesInput.id = 'deleted-images';
            deletedImagesInput.name = 'deletedImages';
            deletedImagesInput.value = '';
            document.getElementById('glasses-form').appendChild(deletedImagesInput);
        }
        
        // Toggle the marked-for-deletion state
        if (imgContainer.classList.contains('marked-for-deletion')) {
            // Unmark for deletion
            imgContainer.classList.remove('marked-for-deletion');
            
            // Remove overlay
            const overlay = imgContainer.querySelector('.deletion-overlay');
            if (overlay) {
                imgContainer.removeChild(overlay);
            }
            
            // Update the hidden input field with the list of images to delete
            let imagesToDelete = deletedImagesInput.value.split(',').filter(img => img.trim() !== '');
            imagesToDelete = imagesToDelete.filter(img => img !== imagePath);
            deletedImagesInput.value = imagesToDelete.join(',');
        } else {
            // Mark for deletion
            imgContainer.classList.add('marked-for-deletion');
            
            // Create and add an overlay to visually indicate deletion
            const overlay = document.createElement('div');
            overlay.className = 'deletion-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(220, 53, 69, 0.5)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.innerHTML = '<i class="bi bi-trash text-white" style="font-size: 1.5rem;"></i>';
            imgContainer.appendChild(overlay);
            
            // Update the hidden input field with the list of images to delete
            let imagesToDelete = deletedImagesInput.value.split(',').filter(img => img.trim() !== '');
            if (!imagesToDelete.includes(imagePath)) {
                imagesToDelete.push(imagePath);
            }
            deletedImagesInput.value = imagesToDelete.join(',');
        }
        
        // Check if we still have at least one image
        this.validateRemainingImages();
    }
    
    // Validate that at least one image remains
    validateRemainingImages() {
        const imageContainers = document.querySelectorAll('#image-preview > div');
        const markedForDeletion = document.querySelectorAll('#image-preview > div.marked-for-deletion');
        const newImageFiles = document.getElementById('glasses-images').files;
        
        // If all existing images are marked for deletion and no new images are selected
        if (imageContainers.length > 0 && markedForDeletion.length === imageContainers.length && newImageFiles.length === 0) {
            // Show warning
            const warningEl = document.getElementById('image-warning') || document.createElement('div');
            warningEl.id = 'image-warning';
            warningEl.className = 'alert alert-warning mt-2';
            warningEl.innerHTML = '<i class="bi bi-exclamation-triangle"></i> Warning: At least one image must remain. Please upload a new image or keep an existing one.';
            
            if (!document.getElementById('image-warning')) {
                document.getElementById('image-preview').parentNode.appendChild(warningEl);
            }
            
            // Disable the save button
            document.getElementById('save-glasses-btn').disabled = true;
        } else {
            // Remove warning if it exists
            const warningEl = document.getElementById('image-warning');
            if (warningEl) {
                warningEl.remove();
            }
            
            // Enable the save button
            document.getElementById('save-glasses-btn').disabled = false;
        }
    }
    
    // Reset the form properly
    resetGlassesForm() {
        document.getElementById('glasses-form').reset();
        document.getElementById('glasses-id').value = '';
        document.getElementById('image-preview').innerHTML = '';
        
        // Remove deleted images input if it exists
        const deletedImagesInput = document.getElementById('deleted-images');
        if (deletedImagesInput) {
            deletedImagesInput.remove();
        }
        
        // Remove any warnings
        const warningEl = document.getElementById('image-warning');
        if (warningEl) {
            warningEl.remove();
        }
        
        // Enable the save button
        document.getElementById('save-glasses-btn').disabled = false;
    }
    
    // Handle save glasses
    async handleSaveGlasses() {
        const saveBtn = document.getElementById('save-glasses-btn');
        const originalText = saveBtn.innerHTML;
        
        try {
            // Show loading state
            saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';
            saveBtn.disabled = true;
            
            const form = document.getElementById('glasses-form');
            
            // Enhanced form validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Additional custom validation
            const name = document.getElementById('glasses-name').value.trim();
            const price = parseFloat(document.getElementById('glasses-price').value);
            const stock = parseInt(document.getElementById('glasses-stock').value);
            const colorsInput = document.getElementById('glasses-colors').value.trim();
            
            if (!name) {
                notifications.warning('Please enter a glasses name');
                return;
            }
            
            if (price <= 0) {
                notifications.warning('Price must be greater than 0');
                return;
            }
            
            if (stock < 0) {
                notifications.warning('Stock cannot be negative');
                return;
            }
            
            if (!colorsInput) {
                notifications.warning('Please enter at least one color');
                return;
            }
            
            // Get form data
            const glassesId = document.getElementById('glasses-id').value;
            
            // Check if any files are being uploaded
            const imagesInput = document.getElementById('glasses-images');
            const arModelInputs = [
                'model-arms-obj', 'model-arms-mtl', 'model-lenses-obj',
                'model-lenses-mtl', 'model-frame-obj', 'model-frame-mtl'
            ];
            const materialInputs = ['model-arms-material', 'model-frame-material'];
            
            let hasFiles = imagesInput.files.length > 0;
            hasFiles = hasFiles || arModelInputs.some(id => document.getElementById(id).files.length > 0);
            hasFiles = hasFiles || materialInputs.some(id => document.getElementById(id).files.length > 0);
            
            // Check if we have images marked for deletion
            const deletedImagesInput = document.getElementById('deleted-images');
            const hasDeletedImages = deletedImagesInput && deletedImagesInput.value.trim() !== '';
            
            let requestData;
            
            // Always use FormData when we have files or image deletions
            if (hasFiles || hasDeletedImages) {
                // Use FormData for file uploads
                requestData = new FormData();
                
                // Add basic fields
                requestData.append('name', document.getElementById('glasses-name').value);
                requestData.append('price', document.getElementById('glasses-price').value);
                requestData.append('stock', document.getElementById('glasses-stock').value);
                requestData.append('type', document.getElementById('glasses-type').value);
                requestData.append('gender', document.getElementById('glasses-gender').value);
                requestData.append('shape', document.getElementById('glasses-shape').value);
                requestData.append('weight', document.getElementById('glasses-weight').value);
                requestData.append('size', document.getElementById('glasses-size').value);
                requestData.append('material', document.getElementById('glasses-material').value);
                requestData.append('tryOn', document.getElementById('glasses-try-on').value);
                
                // Process colors
                const colorsStr = document.getElementById('glasses-colors').value;
                const colors = colorsStr.split(',').map(color => color.trim()).filter(color => color);
                requestData.append('colors', JSON.stringify(colors));
                
                // Process images
                if (imagesInput.files.length > 0) {
                    for (let i = 0; i < imagesInput.files.length; i++) {
                        requestData.append('images', imagesInput.files[i]);
                    }
                }
                
                // Process AR model files
                arModelInputs.forEach(fieldId => {
                    const fileInput = document.getElementById(fieldId);
                    if (fileInput.files.length > 0) {
                        // Map the field IDs to the correct backend field names
                        let fieldName;
                        switch(fieldId) {
                            case 'model-arms-obj':
                                fieldName = 'modelArmsOBJ';
                                break;
                            case 'model-arms-mtl':
                                fieldName = 'modelArmsMTL';
                                break;
                            case 'model-lenses-obj':
                                fieldName = 'modelLensesOBJ';
                                break;
                            case 'model-lenses-mtl':
                                fieldName = 'modelLensesMTL';
                                break;
                            case 'model-frame-obj':
                                fieldName = 'modelFrameOBJ';
                                break;
                            case 'model-frame-mtl':
                                fieldName = 'modelFrameMTL';
                                break;
                            default:
                                fieldName = fieldId;
                        }
                        requestData.append(fieldName, fileInput.files[0]);
                    }
                });
                
                // Process material images
                const armsMaterialInput = document.getElementById('model-arms-material');
                if (armsMaterialInput.files.length > 0) {
                    for (let i = 0; i < armsMaterialInput.files.length; i++) {
                        requestData.append('modelArmsMaterial', armsMaterialInput.files[i]);
                    }
                }
                
                const frameMaterialInput = document.getElementById('model-frame-material');
                if (frameMaterialInput.files.length > 0) {
                    for (let i = 0; i < frameMaterialInput.files.length; i++) {
                        requestData.append('modelFrameMaterial', frameMaterialInput.files[i]);
                    }
                }
            } else {
                // Use JSON for text-only updates
                const colorsStr = document.getElementById('glasses-colors').value;
                const colors = colorsStr.split(',').map(color => color.trim()).filter(color => color);
                
                requestData = {
                    name: document.getElementById('glasses-name').value,
                    price: parseFloat(document.getElementById('glasses-price').value),
                    stock: parseInt(document.getElementById('glasses-stock').value),
                    type: document.getElementById('glasses-type').value,
                    gender: document.getElementById('glasses-gender').value,
                    shape: document.getElementById('glasses-shape').value,
                    weight: parseFloat(document.getElementById('glasses-weight').value),
                    size: document.getElementById('glasses-size').value,
                    material: document.getElementById('glasses-material').value,
                    tryOn: document.getElementById('glasses-try-on').value === 'true',
                    colors: colors
                };
            }
            
            // Send to API
            let response;
            if (glassesId) {
                // Update existing glasses
                response = await api.glasses.update(glassesId, requestData);
            } else {
                // Create new glasses
                response = await api.glasses.create(requestData);
            }
            
            // Close modal and refresh data
            const glassesModal = bootstrap.Modal.getInstance(document.getElementById('glassesModal'));
            glassesModal.hide();
            
            // Show success message with more details
            const action = glassesId ? 'updated' : 'created';
            const glassesName = document.getElementById('glasses-name').value;
            notifications.success(`Glasses "${glassesName}" ${action} successfully!`);
            
            // Reload glasses data
            this.loadGlassesData();
            
        } catch (error) {
            console.error('Error saving glasses:', error);
            
            // Enhanced error handling with specific authentication feedback
            let errorMessage = 'Error saving glasses. ';
            
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Your session has expired. Please log in again to save changes.';
                    // Redirect to login after a short delay
                    setTimeout(() => {
                        window.navigateTo('login');
                    }, 3000);
                } else if (error.response.status === 403) {
                    errorMessage = 'You do not have permission to save glasses. Please contact an administrator.';
                } else if (error.response.status === 422 || error.response.status === 400) {
                    // Validation errors
                    if (error.response.data && error.response.data.message) {
                        errorMessage += error.response.data.message;
                    } else if (error.response.data && error.response.data.errors) {
                        // Handle validation errors array
                        const validationErrors = error.response.data.errors.map(err => err.msg).join(', ');
                        errorMessage += `Validation errors: ${validationErrors}`;
                    } else {
                        errorMessage += 'Please check your input data and try again.';
                    }
                } else if (error.response.data && error.response.data.message) {
                    errorMessage += error.response.data.message;
                } else {
                    errorMessage += `Server error (${error.response.status}). Please try again.`;
                }
            } else if (error.request) {
                errorMessage = 'Network error. Please check your connection and try again.';
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Please try again.';
            }
            
            notifications.error(errorMessage);
        } finally {
            // Reset button state
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }
    }
    
    // Handle delete glasses
    async handleDeleteGlasses(glassesId) {
        const deleteBtn = document.getElementById('confirm-delete-btn');
        const originalText = deleteBtn.innerHTML;
        
        try {
            // Show loading state
            deleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...';
            deleteBtn.disabled = true;
            
            await api.glasses.delete(glassesId);
            
            // Close modal
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            deleteModal.hide();
            
            // Show success message
            notifications.success('Glasses deleted successfully!');
            
            // Reload glasses data
            this.loadGlassesData();
            
        } catch (error) {
            console.error('Error deleting glasses:', error);
            
            // Show descriptive error message
            let errorMessage = 'Error deleting glasses. ';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage += error.response.data.message;
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Please try again.';
            }
            
            notifications.error(errorMessage);
        } finally {
            // Reset button state
            deleteBtn.innerHTML = originalText;
            deleteBtn.disabled = false;
        }
    }
    
    // Debug method to test API connectivity
    async debugApiConnection() {
        console.log('=== DEBUG: Testing API Connection ===');
        console.log('Base URL:', axios.defaults.baseURL);
        console.log('Auth Token:', getAuthToken());
        console.log('Is Authenticated:', isAuthenticated());
        
        try {
            // Test basic connectivity
            console.log('Testing basic API connectivity...');
            const healthCheck = await axios.get('/health');
            console.log('Health check response:', healthCheck);
        } catch (error) {
            console.error('Health check failed:', error);
        }
        
        try {
            // Test authentication
            console.log('Testing authentication...');
            const authTest = await axios.get('/admin/profile');
            console.log('Auth test response:', authTest);
        } catch (error) {
            console.error('Auth test failed:', error);
        }
        
        try {
            // Test glasses endpoint
            console.log('Testing glasses endpoint...');
            const glassesTest = await api.glasses.getAll();
            console.log('Glasses test response:', glassesTest);
        } catch (error) {
            console.error('Glasses test failed:', error);
        }
        console.log('=== END DEBUG ===');
    }
}

// Debug function for testing API connectivity - can be called from browser console
window.testGlassesAPI = async function() {
    console.log('Testing Glasses API...');
    try {
        // Test basic connectivity
        console.log('1. Testing basic endpoint...');
        const allGlasses = await api.glasses.getAll();
        console.log('✓ Get all glasses successful:', allGlasses.data?.length || 'No data property');
        
        // Test getById
        if (allGlasses.data && allGlasses.data.length > 0) {
            const firstId = allGlasses.data[0]._id;
            console.log('2. Testing getById with ID:', firstId);
            const singleGlasses = await api.glasses.getById(firstId);
            console.log('✓ Get glasses by ID successful:', singleGlasses.data);
        }
        
        // Test authentication
        console.log('3. Testing authentication...');
        const token = getAuthToken();
        console.log('Auth token present:', !!token);
        
        return { success: true, message: 'All tests passed!' };
    } catch (error) {
        console.error('❌ API test failed:', error);
        return { success: false, error: error.message };
    }
};
