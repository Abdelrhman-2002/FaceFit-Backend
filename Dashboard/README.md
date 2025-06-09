# FaceFit Admin Dashboard

This is the administration dashboard for the FaceFit Backend application. It provides a web interface for administrators to manage products, orders, customers, and other aspects of the FaceFit platform.

## Features

- **Authentication**: Secure admin login
- **Dashboard Overview**: Display key metrics and statistics
- **Products Management**: CRUD operations for glasses products
- **Order Management**: View, update status, and manage customer orders
- **Customer Management**: View customer details and purchase history
- **Reviews Management**: Moderate product reviews

## Structure

The dashboard follows a simple single-page application structure:

```
Dashboard/
│
├── index.html           # Main HTML entry point
├── app.js               # Main application code and routing
│
├── components/          # Reusable UI components
│   ├── header.js        # Top navigation header
│   ├── sidebar.js       # Side navigation menu
│   └── stats.js         # Dashboard statistics widgets
│
├── pages/               # Page components
│   ├── login.js         # Admin login page
│   ├── dashboard.js     # Main dashboard overview
│   ├── glasses.js       # Glasses product management
│   ├── orders.js        # Order management
│   └── customers.js     # Customer management
│
├── styles/              # CSS stylesheets
│   └── main.css         # Main stylesheet
│
└── utils/               # Utility functions
    ├── api.js           # API communication helpers
    └── auth.js          # Authentication helpers
```

## Getting Started

1. Make sure your FaceFit Backend server is running
2. Open the dashboard in a web browser at `/Dashboard/index.html`
3. Log in with your admin credentials

## API Integration

The dashboard connects to the following backend API endpoints:

- Authentication: `/admin/login` and `/admin/signup`
- Products: `/glasses/*`
- Orders: `/orders/*`
- Customers: `/customers/*`
- Reviews: `/reviews/*`

## Dependencies

- Bootstrap 5.3.0 - UI framework
- Bootstrap Icons - Icon library
- Axios - HTTP client for API requests

## Browser Compatibility

The dashboard is designed to work with modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
