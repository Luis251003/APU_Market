import {z} from 'zod'

const empleadoSchema = z.object({
    nombre: z
        .string()
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
            error:"Debes ingresar un nombre válido"
        }),
    apellido: z
        .string()
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
            error:"Debes ingresar un apellido válido"
        }),
    dni: z
        .string()
        .regex(/^[0-9]{8}$/, {
            error:"Debes ingresar 8 dígitos"
        }),
    telefono: z
        .string()
        .regex(/^9\d{8}$/, {
            message: "Debes ingresar 9 dígitos",
        })
})
export default empleadoSchema;