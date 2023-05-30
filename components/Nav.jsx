'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signOut, signIn, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);

    useEffect(() => {
        const putProviers = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        putProviers();
    }, []);

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src='/assets/images/logo.svg' width={30} height={30} alt='Promptopia Logo' className='object-contain' />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/*Desktop Nav*/}

            <div className='sm:flex hidden'>
                {isUserLoggedIn ? <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>
                        Create Post
                    </Link>

                    <button className='outline_btn' onClick={signOut} type='button'>Sign Out</button>

                    <Link href={'/profile'}>
                        <Image src='/assets/images/logo.svg' width={37} height={37} alt='Profile Picture' />
                    </Link>
                </div> : <>
                    {providers && Object.values(providers).map((provider) => (<button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign in</button>))}
                </>}
            </div>


            {/*Mobile Nav*/}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className='flex'>
                        <Image
                            src='/assets/images/logo.svg'
                            width={37}
                            height={37}
                            alt='Profile Picture'
                            className='rounded-full'
                            onClick={() => { settoggleDropdown(prev => !prev) }}
                        />

                        {toggleDropdown &&
                            <div className='dropdown'>
                                <Link href='/profile' className='dropdown_link' onClick={() => settoggleDropdown(false)}>My Profile</Link>
                                <Link href='/create-prompt' className='dropdown_link' onClick={() => settoggleDropdown(false)}>Create Post</Link>
                                <button
                                    type='button'
                                    className='black_btn mt-5 w-full'
                                    onClick={() => {
                                        settoggleDropdown(false);
                                        signOut()

                                    }}>Sign Out</button>
                            </div>}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                    Sign in
                                </button>
                            )
                            )}
                    </>
                )}
            </div>
        </nav>

    )
}

export default Nav