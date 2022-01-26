import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

interface AuthLayoutProps {
  title: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => (
  <div className="h-full relative grid lg:grid-cols-2">
    <Head>
      <title>{title}</title>
    </Head>

    {/* Picture */}
    <div className="hidden lg:block">
      <Image src="/image/tree-planting.jpeg" layout="fill" alt="faces-patter" className="object-cover z-0" />
    </div>

    <div className="lg:col-start-2 flex flex-col bg-gradient-to-br from-white/70 to-gray-100/50 backdrop-blur-sm">
      {/* Header */}
      <header className="flex m-5 mb-8 absolute top-4 left-4">
        <Link href="/">
          <a>
            <Image
              src={{
                src: '/icon/logo.svg',
                height: 30,
                width: 80,
              }}
              alt="brand-logo"
              className="absolute"
            />
          </a>
        </Link>
      </header>

      {/* Content */}
      <div className="m-5 mt-0 flex-1">{children}</div>
    </div>
  </div>
);

export default AuthLayout;
