import { TaskSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = TaskSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status:401 })
    }

    const { title, description, isImportant, isCompleted, userId } = body

    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            isImportant,
            isCompleted,
            userId
        }
    })

    return NextResponse.json(newTask, { status:201 })
}