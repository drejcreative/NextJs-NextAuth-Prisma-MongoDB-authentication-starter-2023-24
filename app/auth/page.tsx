import Auth from './Auth';
import BottomText from './components/BottomText';
import Logo from './components/Logo';
import Overlay from './components/overlay';
import Video from './components/video';

const Authentification = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="m-auto h-screen 2xl:container">
        <Video />
        <Overlay />
        <div className="relative ml-auto flex h-full  lg:w-5/12 ">
          <div className="m-auto px-6 py-12 sm:p-20 xl:w-10/12">
            <Logo />
            <Auth />
            <BottomText />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentification;
