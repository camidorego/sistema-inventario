import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

type QueryParams = {
  page?: number;
  limit?: number;
  q?: string;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const page = Math.max(1, Number(params.get('page') ?? 1));
    const limit = Math.min(100, Math.max(1, Number(params.get('limit') ?? 50))); // tope 100
    const q = params.get('q') ?? undefined;

    const skip = (page - 1) * limit;

    // construir filtro opcional
    const where = q
      ? {
         OR: [
            { descripcion: { contains: q, mode: 'insensitive' as const } },
            { name: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : undefined;

    const [items, total] = await prisma.$transaction([
      prisma.item.findMany({
        where,
        orderBy: { id: 'desc' },
        skip,
        take: limit,
      }),
      prisma.item.count({ where }),
    ]);
    return NextResponse.json(
      {
        success: true,
        data: items,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('GET /api/items error:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, descripcion, quantity, img } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'nombre del item es obligatorio' },
        { status: 400 }
      );
    }

    const newItem = await prisma.item.create({
      data: {
        name,
        descripcion,
        quantity: quantity ?? 0,
        img: img ?? null,
      },
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/items error:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}
