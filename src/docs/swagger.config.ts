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
  apis: [
    "src/modules/auth/*.ts",
    "src/modules/team/*.ts",
    "src/modules/project/*.ts",
    "src/modules/board/*.ts",
    "src/modules/list/*.ts",
    "src/modules/card/*.ts",
    "src/modules/comment/*.ts",
    "src/modules/history/*.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
