// Stats component
class Stats {
    constructor() {
        this.template = `
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="bi bi-cart3"></i>
                </div>
                <div class="stat-value" id="total-orders">0</div>
                <div class="stat-label">Total Orders</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="bi bi-currency-dollar"></i>
                </div>
                <div class="stat-value" id="total-revenue">$0</div>
                <div class="stat-label">Total Revenue</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="bi bi-people"></i>
                </div>
                <div class="stat-value" id="total-customers">0</div>
                <div class="stat-label">Total Customers</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="bi bi-eyeglasses"></i>
                </div>
                <div class="stat-value" id="total-products">0</div>
                <div class="stat-label">Total Products</div>
            </div>
        `;
    }
    
    // Render the stats
    render() {
        return this.template;
    }
    
    // Load stats data
    async loadData() {
        try {
            const response = await api.stats.getDashboardStats();
            const stats = response.data.data;
            document.getElementById('total-orders').textContent = stats.totalOrders;
            document.getElementById('total-revenue').textContent = `$${stats.totalRevenue.toFixed(2)}`;
            document.getElementById('total-customers').textContent = stats.totalCustomers;
            document.getElementById('total-products').textContent = stats.totalProducts;
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }
}
