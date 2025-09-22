import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { search, category } = req.query;
    const recipes = await prisma.recipe.findMany({
      where: {
        title: { contains: search?.toString() || "" },
        category: category ? category.toString() : undefined,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(recipes);
  }

  if (req.method === "POST") {
    const { title, category, description, ingredients, steps } = req.body;
    const recipe = await prisma.recipe.create({
      data: { title, category, description, ingredients, steps },
    });
    res.json(recipe);
  }
}
