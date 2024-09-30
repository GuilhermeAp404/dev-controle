import { Container } from '@/components/container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { CardCostumer } from './components/card'

import prismaClient from '@/lib/prisma'


export default async function Costumer() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user) redirect('/')
    
    const customers = await prismaClient.customer.findMany({where:{userId: session?.user.id}})
    return (
        <Container>
            <div className='flex items-center justify-between mt-9 mb-2'>
                <h1 className='text-3xl font-bold'>Meus Clientes</h1>
                <Link href="/dashboard/customer/new" className='bg-blue-500 px-4 pý-1 rounded text-white'>
                    Novo Cliente
                </Link>
            </div>
            <section className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2'>
                {customers.map(customer=>(
                    <CardCostumer customer={customer} key={customer.id}/>
                ))}
                {customers.length===0 &&(
                    <h3 className='text-gray-600'>Você ainda não possui nenhum cliente.</h3>
                )}
            </section>
        </Container>
    )
}
