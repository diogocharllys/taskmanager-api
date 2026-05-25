import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API for managing tasks, projects, and users",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Em desenvolvimento o código roda a partir de src/*.ts; em produção, de dist/*.js.
  // Incluímos ambos os globs para que o Swagger encontre as anotações nos dois cenários.
  apis: [
    "src/modules/**/*.ts",
    "dist/modules/**/*.js",
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
