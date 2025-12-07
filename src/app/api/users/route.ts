import { NextResponse } from "next/server";
import prisma from '../../../lib/prisma';

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, username, email, role } = body;

    const newUser = await prisma.user.create({
      data: { name, username, email, role },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
