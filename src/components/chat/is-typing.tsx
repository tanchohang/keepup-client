import { useEffect, useState } from 'react';
import { socket } from '../../services/socket.service';
import useAuth from '../../context/auth.context';

interface Props {}
export const IsTyping = (props: Props) => {
  const { auth } = useAuth();
  const [isTyping, setIsTyping] = useState(false);
  const [username, setUsername] = useState<string>();
  useEffect(() => {
    socket.on('isTyping', (data: any) => {
      setIsTyping(true);
      setUsername(data.username);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket.off('isTyping');
    };
  }, []);

  return isTyping && username ? (
    <div className="text-zinc-400 italic animate-bounce">
      {username} is typing<span>...</span>
    </div>
  ) : (
    <></>
  );
};
