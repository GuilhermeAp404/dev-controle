'use client'
import { Input } from "@/components/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { api } from "@/lib/api"
import { CustomerDataInfo } from '../../page'

const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório"),
    description: z.string().min(1, "Descreva um pouco sobre seu problema...")
})

type FormData = z.infer<typeof schema>

interface FormTicketProps{
    customer: CustomerDataInfo
}

export function FormTicket({customer}:FormTicketProps) {
    const {register, handleSubmit, setValue, formState:{errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(data:FormData) {
        const response = await api.post('/api/ticket',{
            name: data.name,
            description: data.description,
            customerId: customer.id  
        })

        setValue('name', "")
        setValue('description', "")

    }

    return (
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded border-2" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input
                name="name"
                type="text"
                placeholder="Digite o nome do chamado"
                error={errors.name?.message}
                register={register}
            />

            <label className="mb-1 font-medium text-lg">Descreva o chamado</label>
            <textarea
                className="w-full border-2 rounded-md h-24 resize-none px-2"
                id="description"
                placeholder="Descreva seu problema"
                {...register('description')}
            ></textarea>
            {errors.description?.message &&(
                <p className="text-red-500 mt-1 mb-4">
                    {errors.description.message}
                </p>
            )}

            <button
                type="submit"
                className="bg-blue-500 rounded-md w-full px-2 h-11 text-white"
            >
                Criar novo chamado
            </button>
        </form>
    )
}
