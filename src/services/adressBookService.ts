import axios from "axios";

export interface Entry {
  nick: String;
  firstName: String;
  lastName: String;
  telephone: String;
  email: String;
  address: String;
  city: String;
  postalCode: String;
}

export function adressBookService(): any {
  async function getAdressBook() {
    return (await axios.get<Entry[]>("/api/adress-book/")).data;
  }

  async function addEntry(entry: Entry) {
    await axios.post("/api/adress-book", entry);
  }

  return {
    getAdressBook,
    addEntry,
  };
}
