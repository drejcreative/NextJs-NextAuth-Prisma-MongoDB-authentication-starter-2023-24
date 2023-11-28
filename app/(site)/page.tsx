import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="relative">
      <div
        className="-z-1 pointer-events-none absolute  left-1/2 -translate-x-1/2 transform"
        aria-hidden="true"
      >
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#0EA5E9" offset="77.402%" />
              <stop stopColor="#2DD2C0" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
            <circle cx="170" cy="20" r="148" />
          </g>
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl"
              data-aos="zoom-y-out"
            >
              How to do NextJS{' '}
              <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                AUTH
              </span>
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-xl text-gray-600" data-aos="zoom-y-out" data-aos-delay="150">
                This repository serves as a comprehensive boilerplate for building scalable, modern
                web applications using a powerful stack that includes Next.js 13, React, Tailwind
                CSS, Prisma, MongoDB, and NextAuth. This setup is designed to kickstart your project
                with robust authentication, elegant styling, and a well-structured database model.
              </p>
              <div
                className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div className="mr-8">
                  <Link href="/auth">
                    <Button>Go to Login</Button>
                  </Link>
                </div>
                <div>
                  <Link href="/dashboard">
                    <Button variant="outline">Go to Protected Page</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
