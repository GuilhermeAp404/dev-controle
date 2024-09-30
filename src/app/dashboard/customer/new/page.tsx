import { Container } from '@/components/container'
import { NewCustomerForm } from '../components/form'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

export default async function page() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user) redirect('/')
    return (
        <Container>
            <main className="flex flex-col mt-9 mb2">
                <div className="flex items-center gap-3">
                    <Link href='/dashboard/customer' className='bg-gray-900 px-4 py-1 text-white rounded'>
                        Voltar
                    </Link>
                    <h1 className='text-3xl font-bold'>Novo Cliente</h1>
                </div>
                <NewCustomerForm userId={session.user.id} />
            </main>
        </Container>
    )
}
