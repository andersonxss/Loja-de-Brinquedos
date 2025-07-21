import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSetCrateUser from "./hooks/useSetCrateUser";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { form, onSubmit } = useSetCrateUser();
  const { isSubmitting } = form?.formState || {};
  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-background">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card text-card-foreground p-8 rounded-lg shadow-lg min-w-[320px] w-full max-w-[360px] flex flex-col gap-4"
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>
          Cadastro de Usuário
        </h2>

        <Input
          label="Nome"
          id="login-name"
          type="text"
          placeholder="Digite seu nome"
          {...form.register("nome")}
          validate={!!form.formState.errors.nome}
          message={form.formState.errors.nome?.message}
        />

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
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
        <Link
          to="/"
          className="text-primary text-sm text-center mt-2 hover:underline"
        >
          Voltar para login
        </Link>
      </form>
    </div>
  );
};

export default Login;
