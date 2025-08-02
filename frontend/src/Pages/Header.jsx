// import React from "react";
// import { useAuth } from "../contexts/AuthContext";
// // adjust path as needed
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const { user, logout, isLoading,login } = useAuth();
//   const navigate = useNavigate();

//   if (isLoading) return null; // optional loading fallback

//   return (
//     <header className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
//       <h1
//         className="text-xl font-bold cursor-pointer text-blue-600"
//         onClick={() => navigate("/")}
//       >
//         MyApp
//       </h1>

//       <div className="flex items-center gap-4">
//         {user ? (
//           <>
//             <span className="text-sm text-gray-700">
//               {user.name || user.email}
//             </span>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/");
//               }}
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="text-blue-600 font-medium"
//             >
//               Login
//             </button>
            
//           </>
//         )}
//       </div>
//     </header>
//   );
// }
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'tasks', label: 'Tasks' },
    { id: 'users', label: 'Users', adminOnly: true }
  ];

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Task Manager</h1>

          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              if (tab.adminOnly && user?.role !== 'admin') return null;

              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.name}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
