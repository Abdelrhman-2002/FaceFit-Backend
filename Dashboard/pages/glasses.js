// Glasses management page
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
                                <button class="btn btn-primary" id="add-glasses-btn">
                                    <i class="bi bi-plus"></i> Add New Glasses
                                </button>
                            </div>
                        </div>
                        
                        <div class="filters mb-3">
                            <div class="row">
                                <div class="col-md-3">
                                    <select class="form-select" id="filter-type">
                                        <option value="">All Types</option>
                                        <option value="sunglasses">Sunglasses</option>
                                        <option value="eyeglasses">Eyeglasses</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-select" id="filter-gender">
                                        <option value="">All Genders</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="search-glasses" placeholder="Search by name...">
                                        <button class="btn btn-outline-secondary" type="button" id="search-glasses-btn">
                                            <i class="bi bi-search"></i>
                                        </button>
                                    </div>
                                </div>
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
        
        // Load glasses data
        this.loadGlassesData();
    }
    
    // Load sidebar component
    loadSidebar() {
        const sidebar = new Sidebar();
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
            document.getElementById('glasses-form').reset();
            document.getElementById('glasses-id').value = '';
            document.getElementById('glassesModalLabel').textContent = 'Add New Glasses';
            document.getElementById('image-preview').innerHTML = '';
            
            const glassesModal = new bootstrap.Modal(document.getElementById('glassesModal'));
            glassesModal.show();
        });
        
        // Save glasses button
        const saveGlassesBtn = document.getElementById('save-glasses-btn');
        saveGlassesBtn.addEventListener('click', () => this.handleSaveGlasses());
        
        // Filter and search listeners
        document.getElementById('filter-type').addEventListener('change', () => this.loadGlassesData());
        document.getElementById('filter-gender').addEventListener('change', () => this.loadGlassesData());
        document.getElementById('search-glasses-btn').addEventListener('click', () => this.loadGlassesData());
        document.getElementById('search-glasses').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.loadGlassesData();
            }
        });
        
        // Image preview
        const imagesInput = document.getElementById('glasses-images');
        imagesInput.addEventListener('change', (e) => {
            const imagePreview = document.getElementById('image-preview');
            imagePreview.innerHTML = '';
            
            if (e.target.files.length > 0) {
                for (const file of e.target.files) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.classList.add('img-thumbnail');
                        img.style.width = '100px';
                        img.style.height = '100px';
                        img.style.objectFit = 'cover';
                        imagePreview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }
    
    // Load glasses data from API
    async loadGlassesData() {
        const glassesListContainer = document.getElementById('glasses-list');
        glassesListContainer.innerHTML = '<tr><td colspan="7" class="text-center">Loading glasses...</td></tr>';
        
        try {
            // Get filter values
            const typeFilter = document.getElementById('filter-type').value;
            const genderFilter = document.getElementById('filter-gender').value;
            const searchQuery = document.getElementById('search-glasses').value;
            
            // Construct query params
            let queryParams = new URLSearchParams();
            if (typeFilter) queryParams.append('type', typeFilter);
            if (genderFilter) queryParams.append('gender', genderFilter);
            if (searchQuery) queryParams.append('search', searchQuery);
            
            const response = await api.glasses.getAll(Object.fromEntries(queryParams.entries()));
            const glasses = response.data || [];
            
            if (glasses.length > 0) {
                glassesListContainer.innerHTML = glasses.map(glasses => `
                    <tr>
                        <td>
                            <img src="https://facefit.onrender.com/${glasses.images[0]}" alt="${glasses.name}" style="width: 50px; height: 50px; object-fit: cover;">
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
            glassesListContainer.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error loading glasses</td></tr>';
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
            // In a real app, you'd fetch the glasses by ID:
            // const response = await api.glasses.getById(glassesId);
            // const glasses = response.data.data;
            
            // Simulated data for now
            const glasses = {
                _id: glassesId,
                name: 'Ray-Ban Aviator',
                price: 149.99,
                stock: 25,
                type: 'sunglasses',
                gender: 'Men',
                shape: 'Aviator',
                weight: 32,
                size: 'Medium',
                material: 'Metal',
                colors: ['Black', 'Gold', 'Silver'],
                tryOn: true,
                images: ['/uploads/glasses/img1.jpg', '/uploads/glasses/img2.jpg']
            };
            
            // Populate the form
            document.getElementById('glasses-id').value = glasses._id;
            document.getElementById('glasses-name').value = glasses.name;
            document.getElementById('glasses-price').value = glasses.price;
            document.getElementById('glasses-stock').value = glasses.stock;
            document.getElementById('glasses-type').value = glasses.type;
            document.getElementById('glasses-gender').value = glasses.gender;
            document.getElementById('glasses-shape').value = glasses.shape;
            document.getElementById('glasses-weight').value = glasses.weight;
            document.getElementById('glasses-size').value = glasses.size;
            document.getElementById('glasses-material').value = glasses.material;
            document.getElementById('glasses-colors').value = glasses.colors.join(', ');
            document.getElementById('glasses-try-on').value = glasses.tryOn.toString();
            
            // Show image previews
            const imagePreview = document.getElementById('image-preview');
            imagePreview.innerHTML = '';
            
            if (glasses.images && glasses.images.length > 0) {
                glasses.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.classList.add('img-thumbnail');
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    imagePreview.appendChild(img);
                });
            }
            
            // Update modal title
            document.getElementById('glassesModalLabel').textContent = 'Edit Glasses';
            
            // Show the modal
            const glassesModal = new bootstrap.Modal(document.getElementById('glassesModal'));
            glassesModal.show();
        } catch (error) {
            console.error('Error loading glasses for edit:', error);
            alert('Error loading glasses data. Please try again.');
        }
    }
    
    // Show delete confirmation modal
    showDeleteConfirmation(glassesId) {
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
    
    // Handle save glasses
    async handleSaveGlasses() {
        try {
            const form = document.getElementById('glasses-form');
            
            // Basic form validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Get form data
            const glassesId = document.getElementById('glasses-id').value;
            const formData = new FormData();
            
            // Add basic fields
            formData.append('name', document.getElementById('glasses-name').value);
            formData.append('price', document.getElementById('glasses-price').value);
            formData.append('stock', document.getElementById('glasses-stock').value);
            formData.append('type', document.getElementById('glasses-type').value);
            formData.append('gender', document.getElementById('glasses-gender').value);
            formData.append('shape', document.getElementById('glasses-shape').value);
            formData.append('weight', document.getElementById('glasses-weight').value);
            formData.append('size', document.getElementById('glasses-size').value);
            formData.append('material', document.getElementById('glasses-material').value);
            formData.append('tryOn', document.getElementById('glasses-try-on').value);
            
            // Process colors
            const colorsStr = document.getElementById('glasses-colors').value;
            const colors = colorsStr.split(',').map(color => color.trim()).filter(color => color);
            formData.append('colors', JSON.stringify(colors));
            
            // Process images
            const imagesInput = document.getElementById('glasses-images');
            if (imagesInput.files.length > 0) {
                for (let i = 0; i < imagesInput.files.length; i++) {
                    formData.append('images', imagesInput.files[i]);
                }
            }
            
            // Process AR model files
            const arModelFields = [
                'model-arms-obj',
                'model-arms-mtl',
                'model-lenses-obj',
                'model-lenses-mtl',
                'model-frame-obj',
                'model-frame-mtl'
            ];
            
            arModelFields.forEach(fieldId => {
                const fileInput = document.getElementById(fieldId);
                if (fileInput.files.length > 0) {
                    formData.append(fieldId, fileInput.files[0]);
                }
            });
            
            // Process material images
            const armsMaterialInput = document.getElementById('model-arms-material');
            if (armsMaterialInput.files.length > 0) {
                for (let i = 0; i < armsMaterialInput.files.length; i++) {
                    formData.append('modelArmsMaterial', armsMaterialInput.files[i]);
                }
            }
            
            const frameMaterialInput = document.getElementById('model-frame-material');
            if (frameMaterialInput.files.length > 0) {
                for (let i = 0; i < frameMaterialInput.files.length; i++) {
                    formData.append('modelFrameMaterial', frameMaterialInput.files[i]);
                }
            }
            
            // Send to API
            let response;
            if (glassesId) {
                // Update existing glasses
                response = await api.glasses.update(glassesId, formData);
            } else {
                // Create new glasses
                response = await api.glasses.create(formData);
            }
            
            // Close modal and refresh data
            const glassesModal = bootstrap.Modal.getInstance(document.getElementById('glassesModal'));
            glassesModal.hide();
            
            // Show success message
            alert(glassesId ? 'Glasses updated successfully!' : 'Glasses created successfully!');
            
            // Reload glasses data
            this.loadGlassesData();
        } catch (error) {
            console.error('Error saving glasses:', error);
            alert('Error saving glasses. Please try again.');
        }
    }
    
    // Handle delete glasses
    async handleDeleteGlasses(glassesId) {
        try {
            await api.glasses.delete(glassesId);
            
            // Close modal
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            deleteModal.hide();
            
            // Show success message
            alert('Glasses deleted successfully!');
            
            // Reload glasses data
            this.loadGlassesData();
        } catch (error) {
            console.error('Error deleting glasses:', error);
            alert('Error deleting glasses. Please try again.');
        }
    }
}
