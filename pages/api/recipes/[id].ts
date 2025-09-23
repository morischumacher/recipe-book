// pages/api/recipes/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const idNum = Number(req.query.id);
    if (Number.isNaN(idNum)) {
        return res.status(400).json({ error: 'Invalid id' });
    }

    if (req.method === 'GET') {
        const recipe = await prisma.recipe.findUnique({ where: { id: idNum } });
        if (!recipe) return res.status(404).json({ error: 'Not found' });
        return res.json(recipe);
    }

    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
}
