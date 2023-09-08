'use client';
import { PageLayout } from 'shared.ui/components/page/exports';
import { Logo } from 'shared.ui/components/graphics/exports';

export default function Index() {
  return (
    <PageLayout
      navbar={false}
      mainContainerClass='flex justify-start items-center flex-col text-center '>
      <header className='mb-[30px] mt-[100px] w-full'>
        <p className='text-neutral'>Managing your tasks just became easier with</p>
        <Logo className='text-[4rem]' />
      </header>
      <div className='w-full h-[200px]'></div>
      <div className='flex flex-col w-full max-w-[300px] gap-[20px]'>
        <a
          className='btn btn-primary'
          href='/'>
          Sign Up
        </a>
        <a
          className='btn btn-seconday'
          href='/account/craig-chick/dashboard'>
          Login
        </a>
      </div>
    </PageLayout>
  );
}
