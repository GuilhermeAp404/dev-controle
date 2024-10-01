import { Container } from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TicketItem } from './components/ticket'
import prismaClient from '@/lib/prisma'
import { ButtonRefresh } from './components/button'


export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if(!session || !session.user) redirect('/')

  const tickets = await prismaClient.ticket.findMany({
    where:{
      customer:{
        userId: session.user.id
      },
      status: "ABERTO"
    },
    include:{
      customer: true
    }
  })

  return (
    <Container>
      <div className='flex items-center justify-between mt-9 mb-2'>
        <h1 className='text-3xl font-bold'>Chamados</h1>
        <div className='flex items-center gap-4'>
          <ButtonRefresh/>
          <Link href="/dashboard/new" className='bg-blue-500 px-4 pý-1 rounded text-white'>
            Abrir Chamado
          </Link>
        </div>
      </div>

      <table className="min-w-full my-2">
        <thead>
          <tr>
            <th className='font-medium text-left pl-1'>CLIENTE</th>
            <th className='font-medium text-left hidden sm:block'>DATA CADASTRO</th>
            <th className='font-medium text-left'>STATUS</th>
            <th className='font-medium text-left'>#</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket)=>(
            <TicketItem key={ticket.id} ticket={ticket} customer={ticket.customer}/>
          ))}
        </tbody>
      </table>
      {tickets.length === 0 && (
        <h1 className='px-2 text-grey-600'> Nenhum ticket foi aberto recentemente...</h1>
      )}
    </Container>
  )
}