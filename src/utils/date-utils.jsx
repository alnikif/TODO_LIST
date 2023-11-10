import { format, set } from "date-fns";

export const getFormattedDate = (date) => {
     return  format(new Date(date), "p, dd/MM/yyyy");
};
