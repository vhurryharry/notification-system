import { CommonRoutesConfig } from "@app/common/common.routes.config";
import authMiddleware from "@app/common/middleware/auth.middleware";
import express from "express";
import categoriesController from "./controllers/categories.controller";
import categoriesMiddleware from "./middleware/categories.middleware";

export class CategoriesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "categoriesRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/categories`)
      .all(authMiddleware.auth)
      .get(categoriesController.listCategories)
      .post(
        categoriesMiddleware.validateRequiredCategoryBodyFields,
        categoriesController.createCategory
      );

    this.app.param(`categoryId`, categoriesMiddleware.extractCategoryId);
    this.app
      .route(`/categories/:categoryId`)
      .all(authMiddleware.auth, categoriesMiddleware.validateCategoryExists)
      .get(categoriesController.getCategoryById)
      .delete(categoriesController.removeCategory);

    return this.app;
  }
}
