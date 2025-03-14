import { cn } from '@/lib/utils';
import React from 'react'

type ContainerProps = {
    className: string;
    children: React.ReactNode;
}

const Container = ({className, children}: ContainerProps) => {
  return (
    <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>
  )
}

export default Container