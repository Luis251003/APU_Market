import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleApiError(error: unknown) {
    if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
    } else {
        toast.error("Error de servidor");
    }
}