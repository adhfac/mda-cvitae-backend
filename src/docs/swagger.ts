import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Company Profile API Documentation',
    description: 'Dokumentasi untuk semua endpoint dari API Company Profile',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local Development Server',
    },
    {
      url: 'https://backend-cvps.vercel.app/api',
      description: 'Deployed Server',
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
      // =====================
      // Request Schemas
      // =====================
      RegisterRequest: {
        fullName: 'Josep Guardiola',
        username: 'mdaaa',
        email: 'mdha@yopmail.com',
        password: 'Aku12345',
        confirmPassword: 'Aku12345',
      },
      LoginRequest: {
        identifier: 'mdaaaa',
        password: 'Aku12345',
      },
      RemoveMediaRequest: {
        fileUrl: 'File URL',
      },

      // =====================
      // Response Schemas
      // =====================
      SuccessResponse: {
        meta: {
          status: 200,
          message: 'Success message',
        },
        data: {},
      },
      ErrorResponse: {
        meta: {
          status: 400,
          message: 'Error message',
        },
        data: {},
      },
      TokenResponse: {
        meta: {
          status: 200,
          message: 'Login Success',
        },
        data: {
          token: 'jwt_token_here',
        },
      },
      UserProfileResponse: {
        meta: {
          status: 200,
          message: 'Success Get Profile',
        },
        data: {
          _id: '6651a98fb82eaa9ff8c27c32',
          fullName: 'M Dhafa Alhaq',
          username: 'mdha',
          email: 'mdha@yopmail.com',
          role: 'member',
          profilePicture: 'user.jpg',
          isActive: true,
          createdAt: '2025-10-24T10:00:00.000Z',
        },
      },
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'Endpoint untuk autentikasi user (Register, Login, Profile)',
    },
  ],
};

const outputFile = './src/docs/swagger-output.json';
const endpointsFiles = ['./src/routes/api.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
