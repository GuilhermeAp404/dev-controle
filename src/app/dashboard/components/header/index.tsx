import { Container } from '@/components/container'
import Link from 'next/link'
import React from 'react'

export function DashboardHeader() {
    return (
        <Container>
            <header className='w-full bg-gray-900 my-4 p-3 rounded flex gap-4 text-white'>
                <Link href='/dashboard' className='hover:font-bold duration-300'>
                    Chamados
                </Link>
                <Link href='/dashboard/customer' className='hover:font-bold duration-300'>
                    Clientes
                </Link>
            </header>
        </Container>
    )
}
