import { format, set } from "date-fns";

export const getFormattedDate = () => {
     return  format(new Date(), "p, dd/MM/yyyy");
};
