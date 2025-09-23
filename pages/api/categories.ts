// pages/api/categories.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const distinct = await prisma.recipe.groupBy({
        by: ['category'],
        _count: { category: true },
    });

    res.json(
        distinct.map((d) => ({
            name: d.category,
            count: d._count.category,
        }))
    );
}
