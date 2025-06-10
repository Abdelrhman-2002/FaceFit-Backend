// Orders management page
class OrdersPage {
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
                            <h3>Customer Orders</h3>
                        </div>
                        
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="orders-list">
                                    <tr>
                                        <td colspan="7" class="text-center">Loading orders...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Order Details Modal -->
            <div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="orderDetailsModalLabel">Order Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="order-details-content">
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
            
            <!-- Update Order Status Modal -->
            <div class="modal fade" id="updateStatusModal" tabindex="-1" aria-labelledby="updateStatusModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateStatusModalLabel">Update Order Status</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="update-status-form">
                                <input type="hidden" id="update-order-id">
                                <div class="mb-3">
                                    <label for="order-status" class="form-label">Status</label>
                                    <select class="form-select" id="order-status" required>
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="save-status-btn">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initialize the orders page
    async init() {
        const appElement = document.getElementById('app');
        appElement.innerHTML = this.template;
        
        // Load components
        this.loadSidebar();
        this.loadHeader();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load orders data
        this.loadOrdersData();
    }
    
    // Load sidebar component
    loadSidebar() {
        const sidebar = new Sidebar('orders');
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
        // Save status button
        const saveStatusBtn = document.getElementById('save-status-btn');
        saveStatusBtn.addEventListener('click', () => this.handleUpdateStatus());
    }
    
    // Load orders data from API
    async loadOrdersData() {
        const ordersListContainer = document.getElementById('orders-list');
        ordersListContainer.innerHTML = '<tr><td colspan="7" class="text-center">Loading orders...</td></tr>';
        
        try {
            const response = await api.orders.getAll();
            const orders = response.data.data || [];
            
            if (orders.length > 0) {
                ordersListContainer.innerHTML = orders.map(order => `
                    <tr>
                        <td>${order._id}</td>
                        <td>${order.customer.firstName} ${order.customer.lastName}</td>
                        <td>${new Date(order.date).toLocaleDateString()}</td>
                        <td>$${order.total.toFixed(2)}</td>
                        <td>${order.paymentMethod}</td>
                        <td>
                            <span class="badge bg-${this.getStatusColor(order.status)}">${order.status}</span>
                        </td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary view-order-btn" data-id="${order._id}">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-secondary update-status-btn" data-id="${order._id}" data-status="${order.status}">
                                    <i class="bi bi-arrow-repeat"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
                
                // Add event listeners to buttons
                this.addRowActionListeners();
            } else {
                ordersListContainer.innerHTML = '<tr><td colspan="7" class="text-center">No orders found</td></tr>';
            }
        } catch (error) {
            console.error('Error loading orders:', error);
            ordersListContainer.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error loading orders</td></tr>';
        }
    }
    
    // Add event listeners to row action buttons
    addRowActionListeners() {
        // View order button listeners
        const viewButtons = document.querySelectorAll('.view-order-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const orderId = button.getAttribute('data-id');
                this.viewOrderDetails(orderId);
            });
        });
        
        // Update status button listeners
        const updateButtons = document.querySelectorAll('.update-status-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const orderId = button.getAttribute('data-id');
                const status = button.getAttribute('data-status');
                this.showUpdateStatusModal(orderId, status);
            });
        });
    }
    
    // View order details
    async viewOrderDetails(orderId) {
        const orderDetailsContent = document.getElementById('order-details-content');
        orderDetailsContent.innerHTML = `
            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        // Show the modal
        const orderDetailsModal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
        orderDetailsModal.show();
        
        try {
            const response = await api.orders.getById(orderId);
            const order = response.data.data;
            
            // Update the order details content
            orderDetailsContent.innerHTML = `
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6>Order Information</h6>
                        <p><strong>Order ID:</strong> ${order._id}</p>
                        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span class="badge bg-${this.getStatusColor(order.status)}">${order.status}</span></p>
                        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Customer Information</h6>
                        <p><strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>
                        <p><strong>Email:</strong> ${order.customer.email}</p>
                        <p><strong>Phone:</strong> ${order.phone}</p>
                        <p><strong>Shipping Address:</strong> ${order.address}</p>
                    </div>
                </div>
                
                <h6>Order Items</h6>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Lense Type</th>
                                <th>Lens Specification</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="http://localhost:5007/${item.item.images[0]}" alt="${item.item.name}" class="me-2" style="width: 40px; height: 40px; object-fit: cover;">
                                            ${item.item.name}
                                        </div>
                                    </td>
                                    <td>${item.size}</td>
                                    <td>${item.color}</td>
                                    <td>${item.lenseType}</td>
                                    <td>${item.lenseType === 'Prescription' && item.lensSpecification ? 
                                        `<span class="badge bg-info">${item.lensSpecification}</span>
                                         ${item.lensPrice ? `<span class="badge bg-secondary">+EGP ${item.lensPrice}</span>` : ''}` : 
                                        'N/A'}</td>
                                    <td>${item.counter || item.quantity}</td>
                                    <td>$${item.price.toFixed(2)}</td>
                                    <td>$${((item.price + (item.lensPrice || 0)) * (item.counter || item.quantity)).toFixed(2)}</td>
                                </tr>
                                ${item.lenseType === 'Prescription' ? `
                                    <tr>
                                        <td colspan="8">
                                            <div class="prescription-details p-2 bg-light">
                                                ${item.lensSpecification ? `
                                                <div class="lens-specification mb-3">
                                                    <h6 class="mb-2 text-primary">Lens Specification</h6>
                                                    <div class="d-flex align-items-center mb-2">
                                                        <span class="badge bg-info me-2 p-2">${item.lensSpecification}</span>
                                                        ${item.lensPrice ? `<span class="badge bg-secondary p-2">Additional Cost: EGP ${item.lensPrice}</span>` : ''}
                                                    </div>
                                                </div>
                                                ` : ''}
                                                
                                                ${item.prescription ? `
                                                <h6 class="mb-2">Prescription Details</h6>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p class="mb-1"><strong>Left Eye (OS):</strong> SPH: ${item.prescription.OS.SPH}, CYL: ${item.prescription.OS.CYL}, AXIS: ${item.prescription.OS.AXIS}</p>
                                                        <p class="mb-1"><strong>Right Eye (OD):</strong> SPH: ${item.prescription.OD.SPH}, CYL: ${item.prescription.OD.CYL}, AXIS: ${item.prescription.OD.AXIS}</p>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p class="mb-1"><strong>PD:</strong> ${item.prescription.PD.singlePD ? `Single: ${item.prescription.PD.singlePD}` : `Dual: Left: ${item.prescription.PD.dualPD.left}, Right: ${item.prescription.PD.dualPD.right}`}</p>
                                                        <p class="mb-1"><strong>ADD:</strong> ${item.prescription.ADD}</p>
                                                    </div>
                                                </div>
                                                ` : ''}
                                            </div>
                                        </td>
                                    </tr>
                                ` : ''}
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="7" class="text-end"><strong>Total:</strong></td>
                                <td><strong>$${order.total.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `;
            
        } catch (error) {
            console.error('Error loading order details:', error);
            orderDetailsContent.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error loading order details. Please try again.
                </div>
            `;
        }
    }
    
    // Show update status modal
    showUpdateStatusModal(orderId, currentStatus) {
        document.getElementById('update-order-id').value = orderId;
        document.getElementById('order-status').value = currentStatus;
        
        // Show the modal
        const updateStatusModal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
        updateStatusModal.show();
    }
    
    // Handle update status
    async handleUpdateStatus() {
        try {
            const orderId = document.getElementById('update-order-id').value;
            const status = document.getElementById('order-status').value;
            
            await api.orders.updateStatus(orderId, status);
            
            // Close modal
            const updateStatusModal = bootstrap.Modal.getInstance(document.getElementById('updateStatusModal'));
            updateStatusModal.hide();
            
            // Show success message
            alert('Order status updated successfully!');
            
            // Reload orders data
            this.loadOrdersData();
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Error updating order status. Please try again.');
        }
    }
    
    // Helper function to get status color
    getStatusColor(status) {
        switch (status) {
            case 'pending': return 'warning';
            case 'shipped': return 'info';
            case 'delivered': return 'success';
            default: return 'secondary';
        }
    }
}
