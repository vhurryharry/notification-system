import express from "express";
import categoriesService from "../services/categories.service";

class CategoriesController {
  async listCategories(req: express.Request, res: express.Response) {
    const categories = await categoriesService.list();
    res.status(200).send(categories);
  }

  async getCategoryById(req: express.Request, res: express.Response) {
    const category = await categoriesService.readById(req.body.id);
    res.status(200).send(category);
  }

  async createCategory(req: express.Request, res: express.Response) {
    const category = await categoriesService.create(req.body);
    res.status(201).send({ category });
  }

  async put(req: express.Request, res: express.Response) {
    await categoriesService.putById(req.body.id, req.body);
    res.status(204).send();
  }

  async removeCategory(req: express.Request, res: express.Response) {
    await categoriesService.deleteById(req.body.id);
    res.status(204).send();
  }
}

export default new CategoriesController();
