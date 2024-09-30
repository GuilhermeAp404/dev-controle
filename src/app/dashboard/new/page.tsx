import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import prismaClient from '@/lib/prisma'

export default async function NewTicket(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user) redirect('/')
    
    const customers = await prismaClient.customer.findMany({where:{userId: session.user.id}})

    async function handleRegisterTicket(formData:FormData){
        'use server'
        const name = formData.get('name')
        const description = formData.get('description')
        const customerId = formData.get('customer')

        if(!name || !description || !customerId) return
        await prismaClient.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status:'ABERTO',
                userId:session?.user.id as string
            }
        })
        redirect('/dashboard')
    }

    return(
        <Container>
            <main className="flex flex-col mt-9 mb2">
                <div className="flex items-center gap-3">
                    <Link href='/dashboard' className='bg-gray-900 px-4 py-1 text-white rounded'>
                        Voltar
                    </Link>
                    <h1 className='text-3xl font-bold'>Abrir Ticket</h1>
                </div>
                <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input 
                        name="name"
                        className="w-full border-2 rounded-sm px-2 mb-2 h-11"
                        type="text"
                        placeholder="Digite o nome do chamado"
                        required
                    />
                    <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                    <textarea
                        name="description"
                        className="w-full border-2 rounded-sm px-2 mb-2 h-24 resize-none"
                        placeholder="Digite o nome do chamado"
                        required
                    ></textarea>
                    {customers.length>0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                            <select
                                name="customer"
                                className="w-full border-2 rounded-sm px-2 mb-2 h-11 resize-none"
                            >
                                {customers.map(customer=>(
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </>
                        
                    )}

                    {customers.length===0 &&(
                        <Link href='/dashboard/customer/new'>
                            Você ainda não tem nenhum cliente, <span className="text-blue-500 font-medium underline">Cadastrar cliente</span>
                        </Link>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:opacity-45 disabled:cursor-not-allowed"
                        disabled = {customers.length === 0? true : false}
                    >
                        Criar ticket
                    </button>
                </form>
            </main>
        </Container>
    )
}