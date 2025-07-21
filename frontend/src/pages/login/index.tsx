import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSetLogin from "./hooks/useSetLogin";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { form, onSubmit } = useSetLogin();
  const { isSubmitting } = form?.formState || {};
  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-background">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card text-card-foreground p-8 rounded-lg shadow-lg min-w-[320px] w-full max-w-[360px] flex flex-col gap-4"
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
        <Input
          label="Login"
          id="login-email"
          type="email"
          placeholder="Digite seu e-mail"
          {...form.register("email")}
          validate={!!form.formState.errors.email}
          message={form.formState.errors.email?.message}
        />

        <Input
          label="Senha"
          id="login-password"
          type="password"
          placeholder="Digite sua senha"
          {...form.register("password")}
          validate={!!form.formState.errors.password}
          message={form.formState.errors.password?.message}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
        <Link
          to="/create-user"
          className="text-primary text-sm text-center mt-2 hover:underline"
        >
          Criar nova conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
