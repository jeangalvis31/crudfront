export interface ContactResponse {
    id:    number;
    name:  string;
    phone: string;
    email: string;
    [key: string]: string | number;
}
