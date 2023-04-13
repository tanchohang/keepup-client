import { ChatDetail } from '../components/chat/chat-detail';
import { ChatList } from '../components/chat/chat-list';

interface Props {}
const Chat = (props: Props) => {
  return (
    <div className="flex min-h-screen ">
      <div className="border-r-[1px] w-[25%] px-5">
        <ChatList />
      </div>
      <div className="w-[75%]">
        <ChatDetail />
      </div>
    </div>
  );
};
export { Chat };
