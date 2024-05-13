import BottomText from './auth/components/BottomText';
import Logo from './auth/components/Logo';
import Video from './auth/components/video';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="m-auto h-screen 2xl:container">
        <Video />
        <div className="relative ml-auto flex h-full  lg:w-6/12 ">
          <div className="m-auto px-6 py-12 sm:p-20 xl:w-10/12">
            <Logo />
            {children}
            <BottomText />
          </div>
        </div>
      </div>
    </div>
  );
}
