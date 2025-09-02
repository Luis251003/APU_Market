import {z} from 'zod'

const userSchema = z.object({
    email: z
        .email({
            message:"Debes ingresar un correo valido"
        }),
    password: z
        .string()
        .min(6,{
            message:"Debes ingresar al menos 6 caracteres"
        }),
    remember: z
        .boolean()
})

export default userSchema;