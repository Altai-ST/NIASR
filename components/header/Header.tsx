import { cn } from '@/lib/utils';
import React from 'react'
import Container from '../container';
import Image from 'next/image';

type HeaderProps = {
    className?: string;
}

const Header = (className: HeaderProps) => {
  return (
    <header className={cn('border border-b',className)}>
        <div>
            <Container className='flex items-center justify-between py-8'>
                <div className='flex items-center gap-4'>
                    <Image src="/logo.png" alt='Logo' width={35} height={35}/>
                    <div>
                        <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                    </div>
                </div>
            </Container>
        </div>
    </header>
  )
}

export default Header