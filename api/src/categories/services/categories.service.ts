import { Category } from "@prisma/client";

import { CRUD } from "@app/common/interfaces/crud.interface";

import { GetCategoryDto } from "../dtos/get.category.dto";
import { PutCategoryDto } from "../dtos/put.category.dto";
import { CreateCategoryDto } from "../dtos/create.category.dto";
import categoriesDao from "../daos/categories.dao";

class CategoriesService implements Omit<CRUD, "list"> {
  async create(resource: CreateCategoryDto): Promise<Category> {
    return categoriesDao.addCategory(resource);
  }

  async deleteById(id: number): Promise<Category> {
    return categoriesDao.removeCategory(id);
  }

  async list(): Promise<Array<GetCategoryDto>> {
    return categoriesDao.getCategories();
  }

  async readById(id: number): Promise<GetCategoryDto | null> {
    return categoriesDao.getCategory(id);
  }

  async putById(id: number, resource: PutCategoryDto): Promise<Category> {
    return categoriesDao.updateCategory(id, resource);
  }
}

export default new CategoriesService();
