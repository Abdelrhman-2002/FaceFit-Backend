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
                            <div class="data-table-actions">
                                <button class="btn btn-primary" id="export-customers-btn">
                                    <i class="bi bi-download"></i> Export Customers
                                </button>
                            </div>
                        </div>
                        
                        <div class="filters mb-3">
                            <div class="row">
                                <div class="col-md-6 offset-md-6">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="search-customers" placeholder="Search by name, email or phone...">
                                        <button class="btn btn-outline-secondary" type="button" id="search-customers-btn">
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
        
        // Export button
        document.getElementById('export-customers-btn').addEventListener('click', async () => {
            await this.exportCustomers();
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
                customersListContainer.innerHTML = customers.map(customer => `
                    <tr>
                        <td>
                            <img src="http://localhost:5007/uploads/usersPictures/${customer.profilePicture || 'default.jpg'}" alt="${customer.firstName}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
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
                            </div>
                        </td>
                    </tr>
                `).join('');
                this.addRowActionListeners();
            } else {
                customersListContainer.innerHTML = '<tr><td colspan="6" class="text-center">No customers found</td></tr>';
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
            // Get customer from the already loaded customers list
            const response = await api.customers.getAll();
            const customers = response.data || [];
            const customer = customers.find(c => c._id === customerId);
            
            if (!customer) {
                throw new Error('Customer not found');
            }
            
            customerDetailsContent.innerHTML = `
                <div class="row">
                    <div class="col-md-4 text-center mb-4">
                        <img src="http://localhost:5007/uploads/usersPictures/${customer.profilePicture || '/uploads/usersPictures/default.jpg'}" alt="${customer.firstName}" class="rounded-circle img-fluid mb-3" style="max-width: 150px;">
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
    
    // Export customers to CSV
    async exportCustomers() {
        try {
            // Get all customers from API
            const response = await api.customers.getAll();
            const customers = response.data || [];
            
            if (customers.length === 0) {
                alert('No customers to export.');
                return;
            }
            
            // Create CSV content
            const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Orders Count', 'Favorites Count'];
            const csvContent = [
                headers.join(','),
                ...customers.map(customer => [
                    customer._id,
                    customer.firstName,
                    customer.lastName,
                    customer.email,
                    customer.phoneNumber,
                    `"${customer.address || ''}"`,
                    customer.orders?.length || 0,
                    customer.favorites?.length || 0
                ].join(','))
            ].join('\n');
            
            // Create a Blob and download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            
            // Create download link and trigger click
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `customers_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            alert('Customers exported successfully!');
        } catch (error) {
            console.error('Error exporting customers:', error);
            alert('Error exporting customers. Please try again.');
        }
    }
}
