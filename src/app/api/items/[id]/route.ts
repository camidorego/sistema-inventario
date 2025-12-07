import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const data = await req.json();

    const updatedItem = await prisma.item.update({
      where: { id },
      data: {
        name: data.name,
        descripcion: data.description,
        quantity: data.quantity,
        img: data.imgUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error: any) {
    console.error("PUT /api/items/[id] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params; 
    const itemId = Number(id);

    await prisma.item.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
