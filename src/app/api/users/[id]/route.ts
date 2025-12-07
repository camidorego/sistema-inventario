import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: body, // esperar que body tenga: name, username, email, role
    });
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
