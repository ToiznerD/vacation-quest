"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return (
        <>
            <Image
                onClick={() => router.push('/')}
                alt="Logo"
                className="hidden md:block cursor-pointer"
                height="150"
                width="300"
                src="/vacation-quest-logo.png"
            />
            <Image
                onClick={() => router.push('/')}
                alt="Logo"
                className="block md:hidden cursor-pointer"
                height="80"
                width="80"
                src="/logo.png"
            />
        </>
    )
}

export default Logo;