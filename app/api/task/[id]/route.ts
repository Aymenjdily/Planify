import { TaskSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params } : { params:{ id:string } }){
    const body = await request.json()
    const validation = TaskSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status:401 })
    }

    const existsTask = await prisma.task.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsTask){
        return NextResponse.json({ error: "Task not found" }, { status:401 })
    }

    const { title, description, isCompleted, isImportant } = body

    const updatedTask = await prisma.task.update({
        where: {
            id: existsTask.id
        },
        data: {
            title,
            description,
            isCompleted,
            isImportant
        }
    })

    return NextResponse.json(updatedTask, { status:201 })
}

export async function DELETE(request: NextRequest, { params } : { params:{ id:string } }){
    const existsTask = await prisma.task.findUnique({
        where: {
            id: params.id
        }
    })

    if(!existsTask){
        return NextResponse.json({ error: "Task not found" }, { status:401 })
    }

    const deletedTask = await prisma.task.delete({
        where: {
            id: existsTask.id
        }
    })

    return NextResponse.json(deletedTask, { status:201 })
}