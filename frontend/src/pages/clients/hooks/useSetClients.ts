import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ClientData } from "@/interfaces";
import { useCreateClient, useUpdateClient } from "@/services/clients.service";
import { notifications } from "@/lib/notification";
import { AxiosError } from "axios";

const useSetClients = (
  defaultValues: ClientData,
  closeModalForm: () => void
) => {
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  const formSchema = z.object({
    id: z.number().nullable(),
    mode: z.string(),
    name: z.string().nonempty("Nome é campo obrigatório."),
    email: z.string().nonempty("E-mail é campo obrigatório.").email({
      message: "E-mail inválido",
    }),
    dataNascimento: z
      .string()
      .nonempty("Data de nascimento é campo obrigatório."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (data.mode === "create") {
        await createClient.mutateAsync(data);
        notifications({
          message: "Cliente criado com sucesso",
          statusCode: 201,
        });
      } else {
        await updateClient.mutateAsync(data);
        notifications({
          message: "Cliente atualizado com sucesso",
          statusCode: 200,
        });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        notifications(err.response?.data);
      }
    } finally {
      closeModalForm();
      form.reset();
    }
  };

  return { form, onSubmit };
};

export default useSetClients;
