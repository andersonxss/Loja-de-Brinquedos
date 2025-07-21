import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSale } from "@/services/sales.service";
import { notifications } from "@/lib/notification";
import { AxiosError } from "axios";

const useSetSales = (closeModalForm: () => void) => {
  const createSales = useCreateSale();

  const formSchema = z.object({
    clientId: z.string().nonempty("Cliente é campo obrigatório."),
    value: z
      .number({
        error: "Valor é campo obrigatório.",
      })
      .nullable(),
    saleDate: z.string().nonempty("Data é campo obrigatório."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      value: null,
      saleDate: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { clientId, value, saleDate } = data;
      await createSales.mutateAsync({
        clientId: Number(clientId),
        value: Number(value),
        saleDate,
      });
      notifications({
        message: "Venda criada com sucesso",
        statusCode: 201,
      });
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

export default useSetSales;
