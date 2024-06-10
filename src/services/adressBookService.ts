import axios from "axios";
import { Ref, ref } from "vue";

export interface Entry {
  id: number;
  nick: String;
  firstName: String;
  lastName: String;
  telephone: String;
  email: String;
  address: String;
  city: String;
  postalCode: String;
}

export interface Status {
  status: Number;
  message: String;
}

export function adressBookService(): any {
  async function getAdressBook() {
    return (await axios.get<Entry[]>("/api/adress-book/")).data;
  }

  async function getEntry(id: number): Promise<Entry> {
    return (await axios.get<Entry>(`/api/adress-book/${id}`)).data;
  }

  async function addEntry(entry: Entry): Promise<Status> {
    const status: Ref<Status> = ref({ status: 0, message: "" });
    await axios
      .post("/api/adress-book", entry)
      .then((response) => {
        status.value.message = response.statusText;
        status.value.status = response.status;
      })
      .catch((error) => {
        status.value.message = error.response.data;
        status.value.status = error.response.status;
      });
    return status.value;
  }

  async function deleteEntry(id: number): Promise<Status> {
    const status: Ref<Status> = ref({ status: 0, message: "" });
    await axios
      .delete(`/api/adress-book/${id}`)
      .then((response) => {
        status.value.message = response.statusText;
        status.value.status = response.status;
      })
      .catch((error) => {
        status.value.message = error.response.data;
        status.value.status = error.response.status;
      });
    return status.value;
  }

  async function editEntry(
    id: number,
    nick: string,
    firstName: string,
    lastName: string,
    telephone: string,
    address: string,
    city: string,
    email: string,
    postalCode: string
  ): Promise<Status> {
    const status: Ref<Status> = ref({ status: 0, message: "" });

    const newEntry: Entry = {
      id: id,
      nick: nick,
      firstName: firstName,
      lastName: lastName,
      telephone: telephone,
      address: address,
      city: city,
      email: email,
      postalCode: postalCode,
    };
    await axios
      .put("/api/adress-book", newEntry, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        status.value.message = response.statusText;
        status.value.status = response.status;
      })
      .catch((error) => {
        status.value.message = error.response.data;
        status.value.status = error.response.status;
      });
    return status.value;
  }

  return {
    getAdressBook,
    addEntry,
    deleteEntry,
    editEntry,
    getEntry,
  };
}
