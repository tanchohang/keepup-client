import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import { Activities } from './pages/activities';
import { Setting } from './pages/setting';
import { Profile } from './pages/profile';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Friends } from './pages/friends';
import { Account } from './pages/account';
import { Event } from './pages/events';
import RequireAuth from './components/require-auth';
import UnAuthorized from './components/unauthorised';
import { ChatContextProvider } from './context/chat.context';
import Chat from './pages/chat';
import PersistLogin from './components/persist-login';
import Requests from './pages/requests';
import { AuthLayout } from './components/auth-layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Navigate to={'/login'} replace />} />
        <Route element={<UnAuthorized />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
              path=":id"
              element={
                <ChatContextProvider>
                  <AuthLayout />
                </ChatContextProvider>
              }
            >
              <Route index element={<Navigate to={'chats'} replace />} />
              <Route path="friends" element={<Friends />} />
              <Route path="activities" element={<Activities />} />
              <Route path="account" element={<Account />} />
              <Route path="events" element={<Event />} />
              <Route path="profile" element={<Profile />} />
              <Route path="setting" element={<Setting />} />
              <Route path="chats" element={<Chat />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
