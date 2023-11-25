import { format } from "date-fns";

export const getFormattedDate = (date: Date ) : string => {
     return  format(new Date(date), "p, dd/MM/yyyy");
};
