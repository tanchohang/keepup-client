import { ChatDetail } from '../components/chat/chat-detail';
import { ChatList } from '../components/chat/chat-list';

interface Props {}
const Chat = (props: Props) => {
  return (
    <div className="flex min-h-screen ">
      {/* <div className="border-r-[1px] border-zinc-200 min-h-screen w-full md:max-w-xs lg:max-w-md  px-5">
        <ChatList />
      </div>
      <div className="w-[100%] hidden md:block">
        <ChatDetail />
      </div> */}
    </div>
  );
};
export { Chat };
