import { ContactResponse } from "../interfaces/contact.interface";
import { CreateContact } from "../interfaces/create-contact.interface";

export class ContactMapper {
    static mapRestContactGetToContactGet(contactResponse: ContactResponse): ContactResponse {
        return {
            id: contactResponse.id,
            name: contactResponse.name,
            phone: contactResponse.phone,
            email: contactResponse.email
        }
    }

    static mapRestContactGetArrayToContactGetArray(contactResponse: ContactResponse[]): ContactResponse[] {
        return contactResponse.map(this.mapRestContactGetToContactGet);
    }

    static mapCreateContactGetToContactGet(createContat: CreateContact): CreateContact {
        return {
            name: createContat.name,
            phone: createContat.phone,
            email: createContat.email
        }
    }
}