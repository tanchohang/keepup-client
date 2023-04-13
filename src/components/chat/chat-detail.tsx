import { Phone, PhoneCall, Send, Video, VideoIcon, VideoOffIcon } from 'lucide-react';

interface Props {}
const ChatDetail = (props: Props) => {
  return (
    <div className="flex flex-col h-[100vh]">
      <header className="flex justify-between items-center shadow-md h-[7%] px-5 bg-cyan-500">
        <div>
          <img src="http://unsplash.it/200?gravity=north" className="rounded-full" width={40} />
        </div>
        <div className="flex justify-center items-center gap-8">
          <button>
            <Phone size={30} className="fill-white stroke-none" />
          </button>

          <button>
            <VideoIcon size={30} className="fill-white stroke-white" />
          </button>
        </div>
      </header>
      <section className="flex flex-col h-[93%]">
        <main className=" overflow-auto p-5 h-[100%]">
          <p>
            Ut magna et eu et voluptate laborum officia veniam proident consequat pariatur ea ut cillum. Velit non occaecat dolor minim voluptate
            labore et nisi Lorem nulla anim id non. Officia cupidatat in voluptate laboris ullamco incididunt officia quis. Nulla nulla aliquip et ad
            ullamco sint exercitation ea.
          </p>
        </main>
        <footer className="flex items-center shadow-inner h-[10%] px-5">
          <button>emoji</button>
          <input type="text" placeholder="enter message" className="w-[100%]" />
          <button>
            <Send size={30} className=" fill-cyan-500 text-cyan-500" />
          </button>
        </footer>
      </section>
    </div>
  );
};
export { ChatDetail };
