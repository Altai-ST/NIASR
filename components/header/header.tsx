'use client'

import { GraduationCap } from 'lucide-react'
import React from 'react'
import { Button } from '../registry/new-york-v4/ui/button'
import LanguageSwitcher from '../languageSwitcher'
import Link from 'next/link'
import { useAppSelector } from '@/app/hooks'
import { selectTranslations } from '@/store/language/languageSlice'

type Props = {}

const Header = (props: Props) => {

  const t = useAppSelector(selectTranslations)

  return (
    <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap size={32} />
            <h1 className="text-xl font-bold hidden md:block ">НИАРС</h1>
          </Link>
          <div className='flex items-center space-x-4'>
            <LanguageSwitcher/>
            <Button>
              <a href="/login">
                {t.loginName}
              </a>
            </Button>
          </div>
          
        </div>
      </header>
  )
}

export default Header