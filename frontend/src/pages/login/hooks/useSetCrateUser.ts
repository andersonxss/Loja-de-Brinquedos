import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { createUser } from "@/services/auth.service";
import { notifications } from "@/lib/notification";

const useSetCrateUser = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    nome: z.string().nonempty("Nome é campo obrigatório."),
    email: z.string().nonempty("E-mail é campo obrigatório.").email({
      message: "E-mail inválido",
    }),
    password: z.string().nonempty("Senha é campo obrigatório.").min(6, {
      message: "Senha deve ter no mínimo 6 caracteres",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createUser(data);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        notifications(err.response?.data);
      }
    }
  };

  return { form, onSubmit };
};

export default useSetCrateUser;
