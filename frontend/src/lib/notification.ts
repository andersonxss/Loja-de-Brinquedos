import { toast } from "sonner";
export const notifications = (response: {
  message: string;
  statusCode: number;
}) => {
  const { message, statusCode } = response;
  let messageError: string = message;
  if (!message) {
    messageError = "Error interno do servidor";
  }
  if (statusCode === 401) {
    toast.error(messageError);
    return;
  }

  if (statusCode === 200) {
    toast.success(messageError);
    return;
  }

  toast(messageError);
};
