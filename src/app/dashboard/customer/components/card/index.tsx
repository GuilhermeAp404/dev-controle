'use client'
import { CustomerProps } from '@/utils/customer.type'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export function CardCostumer({customer}: {customer: CustomerProps}) {
    const router = useRouter()
    async function handleDeleteCustomer(){
        try {
            const response = await api.delete('/api/customer', {
                params:{
                    id: customer.id
                }
            })
            if(response.status===200)router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <article className='flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300'>
            <h2>
                <span className='font-bold'>Nome: </span> 
                {customer.name}
            </h2>
            <p>
                <span className='font-bold'>E-mail: </span>
                {customer.email}
            </p>
            <p>
                <span className='font-bold'>Telefone: </span>
                {customer.phone}
            </p>
            <button className=' bg-red-500 px-4 rounded text-white self-start' 
            onClick={handleDeleteCustomer}>
                Deletar
            </button>
        </article>
    )
}
