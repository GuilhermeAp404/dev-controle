'use client'
import { CustomerProps } from '@/utils/customer.type'
import { TicketProps } from '@/utils/ticket.type'
import React, {useContext} from 'react'
import { FiCheckCircle, FiFile } from 'react-icons/fi'
import { api } from '@/lib/api'
import { useRouter } from "next/navigation"

import { ModalContext } from '@/providers/modal'


interface TicketItemProps{
    ticket:TicketProps,
    customer:CustomerProps|null
}

export function TicketItem({ticket, customer}:TicketItemProps) {
    const router = useRouter()
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)


    const handleChangeStatus = async ()=>{
        try {
            const response = await api.patch('/api/ticket',{
                id:ticket.id
            })
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenModal = ()=>{
        handleModalVisible()
        setDetailTicket({
            customer:customer,
            ticket:ticket
        })
    }
    

    return (
        <>
            <tr className='border-b-2 border-b-slate-200 h-16 last-b-0 even:bg-slate-100 hover:bg-gray-200 duration-300'>
                <td className='text-left pl-2'>
                    {customer?.name}
                </td>
                <td className='text-left hidden sm:table-cell'>
                    {ticket.created_at?.toLocaleDateString('pt-br')}
                </td>
                <td className='text-left'>
                    <span className='bg-green-500 px-2 py-1 rounded'>{ticket.status}</span>
                </td>
                <td className='text-left'>
                    <button className='mr-2' onClick={handleChangeStatus}>
                        <FiCheckCircle size={24} color='#03C04A'/>
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color='#3b82f6'/>
                    </button>
                </td>
            </tr>
        </>
    )
}
