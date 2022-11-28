import express from "express";
import categoriesService from "../services/categories.service";

class CategoriesMiddleware {
  async validateRequiredCategoryBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields - name`,
      });
    }
  }

  async validateCategoryExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const category = await categoriesService.readById(
      parseInt(req.params.categoryId)
    );
    if (category) {
      next();
    } else {
      res.status(404).send({
        error: `Category ${req.params.categoryId} not found`,
      });
    }
  }

  async extractCategoryId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body = {
      ...req.body,
      id: parseInt(req.params.categoryId),
    };

    next();
  }
}

export default new CategoriesMiddleware();
