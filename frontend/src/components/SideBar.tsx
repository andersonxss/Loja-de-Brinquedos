import React from "react";
import { Button } from "./ui/button";
import { Users, Home, BadgeDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC<{ open: boolean }> = ({ open }) => {
  const navigate = useNavigate();
  return (
    <aside
      className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
    >
      <div className="p-6">
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => navigate("/home")}
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => navigate("/clients")}
          >
            <Users className="h-4 w-4" />
            Clientes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => navigate("/sales")}
          >
            <BadgeDollarSign className="h-4 w-4" />
            Vendas
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
