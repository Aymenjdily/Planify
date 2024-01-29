import z from 'zod'

export const UserSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Email is required"),
    password: z.string().min(3, "Password is required")
})

export const LoginSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(3, "Password is required")
})

export const TaskSchema = z.object({
    title: z.string().min(2, "Title is required").optional(),
    description: z.string().min(10, "Description is required").optional(),
})