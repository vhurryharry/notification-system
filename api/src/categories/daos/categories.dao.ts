import { PrismaClient, Category } from "@prisma/client";
import { getPrisma } from "@app/database";

import { GetCategoryDto } from "../dtos/get.category.dto";
import { PutCategoryDto } from "../dtos/put.category.dto";
import { CreateCategoryDto } from "../dtos/create.category.dto";

class CategoriesDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async addCategory(category: CreateCategoryDto): Promise<Category> {
    const result = await this.prisma.category.create({
      data: {
        name: category.name,
      },
    });

    return result;
  }

  async getCategories(): Promise<Array<GetCategoryDto>> {
    const result = await this.prisma.category.findMany({});

    return result;
  }

  async getCategory(id: number): Promise<GetCategoryDto | null> {
    const result = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async removeCategory(id: number): Promise<Category> {
    const result = await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return result;
  }

  async updateCategory(
    id: number,
    category: PutCategoryDto
  ): Promise<Category> {
    const result = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: category.name,
      },
    });

    return result;
  }
}

export default new CategoriesDao();
