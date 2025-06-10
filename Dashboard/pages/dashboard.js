// Dashboard main page component
class DashboardPage {
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
                    
                    <div id="stats" class="stats-container">
                        <!-- Stats content will be loaded here -->
                    </div>
                    
                    <div class="data-table-container">
                        <div class="data-table-header">
                            <h3>Recent Orders</h3>
                        </div>
                        
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="recent-orders">
                                    <tr>
                                        <td colspan="6" class="text-center">Loading orders...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="data-table-container">
                        <div class="data-table-header">
                            <h3>Popular Products</h3>
                        </div>
                        
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Sales</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody id="popular-products">
                                    <tr>
                                        <td colspan="4" class="text-center">Loading products...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initialize the dashboard
    async init() {
        const appElement = document.getElementById('app');
        appElement.innerHTML = this.template;
        
        // Load components
        this.loadSidebar();
        this.loadHeader();
        this.loadStats();
        
        // Load data
        this.loadRecentOrders();
        this.loadPopularProducts();
    }
    
    // Load sidebar component
    loadSidebar() {
        const sidebar = new Sidebar('dashboard');
        document.getElementById('sidebar').innerHTML = sidebar.render();
        sidebar.addEventListeners();
    }
    
    // Load header component
    loadHeader() {
        const header = new Header();
        document.getElementById('header').innerHTML = header.render();
        header.addEventListeners();
    }
    
    // Load stats component
    loadStats() {
        const stats = new Stats();
        document.getElementById('stats').innerHTML = stats.render();
        stats.loadData();
    }
    
    // Load recent orders data
    async loadRecentOrders() {
        try {
            const response = await api.orders.getAll({ limit: 5, sort: '-createdAt' });
            const recentOrders = response.data.data || [];
            const recentOrdersContainer = document.getElementById('recent-orders');
            
            if (recentOrders.length > 0) {
                recentOrdersContainer.innerHTML = recentOrders.slice(0, 5).map(order => `
                    <tr>
                        <td>#${order._id.substring(0, 8)}</td>
                        <td>${order.customer?.name || 'Unknown'}</td>
                        <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>$${order.total?.toFixed(2) || '0.00'}</td>
                        <td><span class="badge bg-${this.getStatusColor(order.status)}">${order.status}</span></td>
                    </tr>
                `).join('');
            } else {
                recentOrdersContainer.innerHTML = '<tr><td colspan="6" class="text-center">No recent orders found</td></tr>';
            }
        } catch (error) {
            console.error('Error loading recent orders:', error);
            const recentOrdersContainer = document.getElementById('recent-orders');
            recentOrdersContainer.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Error loading orders</td></tr>';
        }
    }

    // Load popular products data
    async loadPopularProducts() {
        try {
            const response = await api.glasses.getAll({ limit: 5, sort: '-numberOfSells' });
            const popularProducts = response.data || [];
            const popularProductsContainer = document.getElementById('popular-products');
            
            if (popularProducts.length > 0) {
                popularProductsContainer.innerHTML = popularProducts.slice(0, 5).map(product => `
                    <tr>
                        <td>
                            <img src="https://facefit.onrender.com/${product.images[0]}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover;">
                        </td>
                        <td>${product.name}</td>
                        <td>${product.numberOfSells || 0}</td>
                        <td>$${product.price.toFixed(2)}</td>
                        <td>${product.stock}</td>
                    </tr>
                `).join('');
            } else {
                popularProductsContainer.innerHTML = '<tr><td colspan="5" class="text-center">No products found</td></tr>';
            }
        } catch (error) {
            console.error('Error loading popular products:', error);
            const popularProductsContainer = document.getElementById('popular-products');
            popularProductsContainer.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error loading products</td></tr>';
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
