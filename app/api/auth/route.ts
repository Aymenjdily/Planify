import { UserSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = UserSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status:401 })
    }

    const { email, name, password, image } = body

    const existsUser = await prisma.user.findUnique({
        where :{
            email: email
        }
    })

    if(existsUser) {
        return NextResponse.json({ error: "Account already exists" }, { status:401 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            ...body,
            password: hashedPassword
        }
    })

    return NextResponse.json(newUser, { status:201 })
}