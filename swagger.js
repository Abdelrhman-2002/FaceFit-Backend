const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FaceFit API Documentation',
      version: '1.0.0',
      description: 'API documentation for the FaceFit backend services',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Customer: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the customer',
            },
            name: {
              type: 'string',
              description: 'Customer name',
            },
            email: {
              type: 'string',
              description: 'Customer email address',
            },
            password: {
              type: 'string',
              description: 'Customer password (will be hashed)',
            },
            profilePicture: {
              type: 'string',
              description: 'URL to the customer profile picture',
            },
            favorites: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of glasses IDs marked as favorites',
            },
          },
        },
        Admin: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the admin',
            },
            name: {
              type: 'string',
              description: 'Admin name',
            },
            email: {
              type: 'string',
              description: 'Admin email address',
            },
            password: {
              type: 'string',
              description: 'Admin password (will be hashed)',
            },
          },
        },
        Glasses: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the glasses',
            },
            name: {
              type: 'string',
              description: 'Glasses name',
            },
            brand: {
              type: 'string',
              description: 'Glasses brand',
            },
            price: {
              type: 'number',
              description: 'Glasses price',
            },
            description: {
              type: 'string',
              description: 'Glasses description',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'URLs to glasses images',
            },
            frameType: {
              type: 'string',
              description: 'Type of frame',
            },
            stock: {
              type: 'number',
              description: 'Number of items in stock',
            },
            color: {
              type: 'string',
              description: 'Color of the glasses',
            },
            material: {
              type: 'string',
              description: 'Material of the glasses',
            },
            gender: {
              type: 'string',
              enum: ['Male', 'Female', 'Unisex'],
              description: 'Gender the glasses are designed for',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date the glasses were added',
            },
          },
        },
        Cart: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the cart',
            },
            customer: {
              type: 'string',
              description: 'ID of the customer who owns the cart',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  glasses: {
                    type: 'string',
                    description: 'ID of the glasses item',
                  },
                  quantity: {
                    type: 'number',
                    description: 'Quantity of this item',
                  },
                  prescription: {
                    type: 'string',
                    description: 'ID of the prescription if applicable',
                  },
                },
              },
            },
          },
        },
        Prescription: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the prescription',
            },
            rightEye: {
              type: 'object',
              properties: {
                sphere: { type: 'number' },
                cylinder: { type: 'number' },
                axis: { type: 'number' },
              },
            },
            leftEye: {
              type: 'object',
              properties: {
                sphere: { type: 'number' },
                cylinder: { type: 'number' },
                axis: { type: 'number' },
              },
            },
            pdDistance: {
              type: 'number',
              description: 'Pupillary distance',
            },
            name: {
              type: 'string',
              description: 'Name of the prescription',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated ID of the order',
            },
            customer: {
              type: 'string',
              description: 'Customer ID reference',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Order creation date',
            },
            status: {
              type: 'string',
              enum: ['pending', 'shipped', 'delivered', 'canceled'],
              description: 'Current order status',
            },
            subtotal: {
              type: 'number',
              description: 'Order subtotal before tax and fees',
            },
            taxAmount: {
              type: 'number',
              description: '14% tax amount',
            },
            transportationFee: {
              type: 'number',
              description: 'Fixed transportation fee (50 pounds)',
            },
            total: {
              type: 'number',
              description: 'Total order amount including tax and transportation fee',
            },
            paymentMethod: {
              type: 'string',
              enum: ['cash'],
              description: 'Payment method used',
            },
            address: {
              type: 'string',
              description: 'Shipping address',
            },
            phone: {
              type: 'string',
              description: 'Customer phone number',
            },
            deliveryDate: {
              type: 'string',
              format: 'date-time',
              description: 'Expected delivery date',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  item: {
                    type: 'string',
                    description: 'Reference to glasses ID',
                  },
                  size: {
                    type: 'string',
                    description: 'Selected glasses size',
                  },
                  color: {
                    type: 'string',
                    description: 'Selected glasses color',
                  },
                  lenseType: {
                    type: 'string',
                    enum: ['No-Prescription', 'Prescription'],
                    description: 'Type of lenses',
                  },
                  prescription: {
                    type: 'string',
                    description: 'Reference to prescription ID if applicable',
                  },
                  lensSpecification: {
                    type: 'string',
                    enum: ['Standard Eyeglass Lenses', 'Blue Light Blocking', 'Driving Lenses'],
                    description: 'Lens specification if applicable',
                  },
                  lensPrice: {
                    type: 'number',
                    description: 'Additional price for special lenses',
                  },
                  quantity: {
                    type: 'number',
                    description: 'Quantity of this item',
                  },
                  price: {
                    type: 'number',
                    description: 'Price per item',
                  },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['error'],
            },
            data: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
              },
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['success'],
            },
            data: {
              type: 'object',
            },
          },
        },
      },
    },
  },
  apis: ['./swagger-docs/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};