// Customers management page
class CustomersPage {
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
                            <h3>Customers</h3>
                        </div>
                        
                        <div class="filters mb-3">
                            <div class="row">
                                <div class="col-md-6 offset-md-6">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="search-customers" placeholder="Search by name, email or phone...">
                                        <button class="btn btn-outline-primary" type="button" id="search-customers-btn">
                                            <i class="bi bi-search"></i> Search
                                        </button>
                                        <button class="btn btn-outline-secondary" type="button" id="clear-search-btn">
                                            <i class="bi bi-x-circle"></i> Clear
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
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Orders</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="customers-list">
                                    <tr>
                                        <td colspan="6" class="text-center">Loading customers...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <nav aria-label="Customers pagination">
                            <ul class="pagination justify-content-center" id="customers-pagination">
                                <!-- Pagination will be generated dynamically -->
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            
            <!-- Customer Details Modal -->
            <div class="modal fade" id="customerDetailsModal" tabindex="-1" aria-labelledby="customerDetailsModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="customerDetailsModalLabel">Customer Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="customer-details-content">
                                <div class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary edit-customer-modal-btn" data-id="">Edit Customer</button>
                            <button type="button" class="btn btn-danger delete-customer-modal-btn" data-id="">Delete Customer</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Edit Customer Modal -->
            <div class="modal fade" id="editCustomerModal" tabindex="-1" aria-labelledby="editCustomerModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editCustomerModalLabel">Edit Customer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="edit-customer-form">
                                <input type="hidden" id="edit-customer-id">
                                <div class="mb-3">
                                    <label for="edit-firstName" class="form-label">First Name</label>
                                    <input type="text" class="form-control" id="edit-firstName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="edit-lastName" class="form-label">Last Name</label>
                                    <input type="text" class="form-control" id="edit-lastName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="edit-email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="edit-email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="edit-phoneNumber" class="form-label">Phone</label>
                                    <input type="tel" class="form-control" id="edit-phoneNumber" required>
                                </div>
                                <div class="mb-3">
                                    <label for="edit-address" class="form-label">Address</label>
                                    <textarea class="form-control" id="edit-address" rows="3"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="save-customer-btn">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Delete Confirmation Modal -->
            <div class="modal fade" id="deleteCustomerModal" tabindex="-1" aria-labelledby="deleteCustomerModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteCustomerModalLabel">Confirm Delete</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete this customer? This action cannot be undone.</p>
                            <div id="delete-customer-details"></div>
                            <input type="hidden" id="delete-customer-id">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" id="confirm-delete-customer-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initialize the customers page
    async init() {
        const appElement = document.getElementById('app');
        appElement.innerHTML = this.template;
        
        // Load components
        this.loadSidebar();
        this.loadHeader();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load customers data
        this.loadCustomersData();
    }
    
    // Load sidebar component
    loadSidebar() {
        const sidebar = new Sidebar('customers');
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
        // Search listener
        document.getElementById('search-customers-btn').addEventListener('click', () => this.loadCustomersData());
        document.getElementById('search-customers').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.loadCustomersData();
            }
        });
        
        // Clear search button
        document.getElementById('clear-search-btn').addEventListener('click', () => {
            document.getElementById('search-customers').value = '';
            this.loadCustomersData();
        });
        
        // Save customer button
        document.getElementById('save-customer-btn').addEventListener('click', () => {
            this.saveCustomer();
        });
        
        // Confirm delete button
        document.getElementById('confirm-delete-customer-btn').addEventListener('click', () => {
            const customerId = document.getElementById('delete-customer-id').value;
            this.deleteCustomer(customerId);
        });
    }
    
    // Load customers data from API
    async loadCustomersData() {
        const customersListContainer = document.getElementById('customers-list');
        customersListContainer.innerHTML = '<tr><td colspan="6" class="text-center">Loading customers...</td></tr>';
        
        try {
            const searchQuery = document.getElementById('search-customers').value;
            let queryParams = new URLSearchParams();
            if (searchQuery) queryParams.append('search', searchQuery);
            
            const response = await api.customers.getAll(Object.fromEntries(queryParams.entries()));
            
            // Handle different response structures
            let customers = [];
            if (response.data) {
                if (Array.isArray(response.data)) {
                    // Direct array response
                    customers = response.data;
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    // JSend format response
                    customers = response.data.data;
                } else if (response.data.status === 'success' && response.data.data) {
                    // Explicit JSend success response
                    customers = response.data.data;
                }
            }
            
            if (customers.length > 0) {
                // Show search filter info if a search was performed
                let searchInfo = '';
                if (searchQuery) {
                    searchInfo = `
                    <tr>
                        <td colspan="6" class="bg-light text-muted p-2">
                            <small><i class="bi bi-info-circle"></i> Showing results for: "${searchQuery}" (${customers.length} ${customers.length === 1 ? 'customer' : 'customers'} found)</small>
                        </td>
                    </tr>
                    `;
                }
                
                customersListContainer.innerHTML = searchInfo + customers.map(customer => `
                    <tr>
                        <td>
                            <img src="https://facefit.onrender.com/uploads/usersPictures/${customer.profilePicture || 'default.jpg'}" alt="${customer.firstName}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                        </td>
                        <td>${customer.firstName} ${customer.lastName}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phoneNumber}</td>
                        <td>${customer.orders.length}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary view-customer-btn" data-id="${customer._id}">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-secondary customer-orders-btn" data-id="${customer._id}">
                                    <i class="bi bi-bag"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-success edit-customer-btn" data-id="${customer._id}">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger delete-customer-btn" data-id="${customer._id}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
                this.addRowActionListeners();
            } else {
                if (searchQuery) {
                    customersListContainer.innerHTML = `
                        <tr>
                            <td colspan="6" class="text-center">
                                <div class="alert alert-info m-3">
                                    <i class="bi bi-search"></i> No customers found matching "${searchQuery}"
                                    <button class="btn btn-sm btn-outline-secondary ms-2" id="reset-search-btn">Reset Search</button>
                                </div>
                            </td>
                        </tr>
                    `;
                    document.getElementById('reset-search-btn').addEventListener('click', () => {
                        document.getElementById('search-customers').value = '';
                        this.loadCustomersData();
                    });
                } else {
                    customersListContainer.innerHTML = '<tr><td colspan="6" class="text-center">No customers found</td></tr>';
                }
            }
        } catch (error) {
            console.error('Error loading customers:', error);
            if (error.response && error.response.status === 401) {
                customersListContainer.innerHTML = '<tr><td colspan="6" class="text-center text-warning">Authentication required. Please log in.</td></tr>';
            } else {
                customersListContainer.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading customers</td></tr>';
            }
        }
    }
    
    // Add event listeners to row action buttons
    addRowActionListeners() {
        // View customer button listeners
        const viewButtons = document.querySelectorAll('.view-customer-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const customerId = button.getAttribute('data-id');
                this.viewCustomerDetails(customerId);
            });
        });
        
        // Customer orders button listeners
        const ordersButtons = document.querySelectorAll('.customer-orders-btn');
        ordersButtons.forEach(button => {
            button.addEventListener('click', () => {
                const customerId = button.getAttribute('data-id');
                this.viewCustomerOrders(customerId);
            });
        });
        
        // Edit customer button listeners
        const editButtons = document.querySelectorAll('.edit-customer-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const customerId = button.getAttribute('data-id');
                this.editCustomer(customerId);
            });
        });
        
        // Delete customer button listeners
        const deleteButtons = document.querySelectorAll('.delete-customer-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const customerId = button.getAttribute('data-id');
                this.showDeleteConfirmation(customerId);
            });
        });
    }
    
    // View customer details
    async viewCustomerDetails(customerId) {
        const customerDetailsContent = document.getElementById('customer-details-content');
        customerDetailsContent.innerHTML = `
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        const customerDetailsModal = new bootstrap.Modal(document.getElementById('customerDetailsModal'));
        customerDetailsModal.show();
        try {
            // Get customer details directly from the API
            const response = await api.customers.getById(customerId);
            const customer = response.data && response.data.data ? response.data.data : null;
            
            if (!customer) {
                throw new Error('Customer not found');
            }
            
            customerDetailsContent.innerHTML = `
                <div class="row">
                    <div class="col-md-4 text-center mb-4">
                        <img src="https://facefit.onrender.com/uploads/usersPictures/${customer.profilePicture || '/uploads/usersPictures/default.jpg'}" alt="${customer.firstName}" class="rounded-circle img-fluid mb-3" style="max-width: 150px;">
                        <h5>${customer.firstName} ${customer.lastName}</h5>
                        <p class="text-muted">Customer ID: ${customer._id}</p>
                    </div>
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-header">
                                <h6 class="mb-0">Contact Information</h6>
                            </div>
                            <div class="card-body">
                                <p><strong>Email:</strong> ${customer.email}</p>
                                <p><strong>Phone:</strong> ${customer.phoneNumber}</p>
                                <p><strong>Address:</strong> ${customer.address || 'Not provided'}</p>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <h6 class="mb-0">Customer Activity</h6>
                            </div>
                            <div class="card-body">
                                <p><strong>Orders:</strong> ${customer.orders.length}</p>
                                <p><strong>Favorite Items:</strong> ${customer.favorites.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Set the customer ID for the edit and delete buttons
            document.querySelector('.edit-customer-modal-btn').setAttribute('data-id', customer._id);
            document.querySelector('.delete-customer-modal-btn').setAttribute('data-id', customer._id);
            
            // Add event listeners to the modal buttons
            document.querySelector('.edit-customer-modal-btn').addEventListener('click', () => {
                // Close the details modal
                const detailsModal = bootstrap.Modal.getInstance(document.getElementById('customerDetailsModal'));
                detailsModal.hide();
                
                // Open the edit modal
                this.editCustomer(customer._id);
            });
            
            document.querySelector('.delete-customer-modal-btn').addEventListener('click', () => {
                // Close the details modal
                const detailsModal = bootstrap.Modal.getInstance(document.getElementById('customerDetailsModal'));
                detailsModal.hide();
                
                // Open the delete confirmation modal
                this.showDeleteConfirmation(customer._id);
            });
        } catch (error) {
            console.error('Error loading customer details:', error);
            customerDetailsContent.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error loading customer details. Please try again.
                </div>
            `;
        }
    }
    
    // View customer orders
    viewCustomerOrders(customerId) {
        // This would typically navigate to the orders page with a filter for this customer
        // For simplicity, we'll just show the customer details modal with focus on orders
        this.viewCustomerDetails(customerId);
    }
    
    // Show delete confirmation modal
    async showDeleteConfirmation(customerId) {
        try {
            // Get customer details
            const response = await api.customers.getById(customerId);
            const customer = response.data.data;
            
            if (!customer) {
                throw new Error('Customer not found');
            }
            
            // Set customer details in the confirmation modal
            document.getElementById('delete-customer-details').innerHTML = `
                <div class="alert alert-warning">
                    <p><strong>Name:</strong> ${customer.firstName} ${customer.lastName}</p>
                    <p><strong>Email:</strong> ${customer.email}</p>
                </div>
            `;
            
            // Set the customer ID in the hidden input
            document.getElementById('delete-customer-id').value = customerId;
            
            // Show the delete confirmation modal
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteCustomerModal'));
            deleteModal.show();
        } catch (error) {
            console.error('Error loading customer details for deletion:', error);
            notifications.error('Error loading customer details. Please try again.');
        }
    }
    
    // Delete customer
    async deleteCustomer(customerId) {
        try {
            const response = await api.customers.delete(customerId);
            
            // Close the delete confirmation modal
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteCustomerModal'));
            deleteModal.hide();
            
            // Show success notification
            notifications.success('Customer deleted successfully');
            
            // Reload customers data
            this.loadCustomersData();
        } catch (error) {
            console.error('Error deleting customer:', error);
            notifications.error('Error deleting customer. Please try again.');
        }
    }
    
    // Edit customer
    async editCustomer(customerId) {
        try {
            // Get customer details
            const response = await api.customers.getById(customerId);
            const customer = response.data.data;
            
            if (!customer) {
                throw new Error('Customer not found');
            }
            
            // Populate the edit form
            document.getElementById('edit-customer-id').value = customer._id;
            document.getElementById('edit-firstName').value = customer.firstName;
            document.getElementById('edit-lastName').value = customer.lastName;
            document.getElementById('edit-email').value = customer.email;
            document.getElementById('edit-phoneNumber').value = customer.phoneNumber;
            document.getElementById('edit-address').value = customer.address || '';
            
            // Show the edit modal
            const editModal = new bootstrap.Modal(document.getElementById('editCustomerModal'));
            editModal.show();
        } catch (error) {
            console.error('Error loading customer for editing:', error);
            notifications.error('Error loading customer details. Please try again.');
        }
    }
    
    // Save edited customer
    async saveCustomer() {
        try {
            const customerId = document.getElementById('edit-customer-id').value;
            
            // Get values from form
            const updateData = {
                firstName: document.getElementById('edit-firstName').value,
                lastName: document.getElementById('edit-lastName').value,
                email: document.getElementById('edit-email').value,
                phoneNumber: document.getElementById('edit-phoneNumber').value,
                address: document.getElementById('edit-address').value,
            };
            
            // Update the customer
            const response = await api.customers.update(customerId, updateData);
            
            // Close the edit modal
            const editModal = bootstrap.Modal.getInstance(document.getElementById('editCustomerModal'));
            editModal.hide();
            
            // Show success notification
            notifications.success('Customer updated successfully');
            
            // Reload customers data
            this.loadCustomersData();
        } catch (error) {
            console.error('Error updating customer:', error);
            
            if (error.response && error.response.data && error.response.data.errors) {
                // Display validation errors
                const errorMessages = error.response.data.errors.map(err => err.msg).join('<br>');
                notifications.error(`Error updating customer:<br>${errorMessages}`);
            } else {
                notifications.error('Error updating customer. Please try again.');
            }
        }
    }
}
