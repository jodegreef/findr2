import React, { useContext, useState } from "react";
import Firebase, { FirebaseContext } from "../firebase-context";
import IItem from "../../models/item";
import EntryForm from "../entry-form/EntryForm";

export interface IResultListProps {
  results: IItem[];
}

export default (props: IResultListProps) => {
  const firebase = useContext(FirebaseContext);

  let [itemToEdit, setItemToEdit] = useState<IItem | undefined>(undefined);

  function deleteItem(id: any) {
    const itemsCollection = (firebase as Firebase).fireStore.collection(
      "items"
    );
    itemsCollection.doc(id).delete();
  }

  function startEditItem(item: IItem) {
    setItemToEdit(item);
  }

  function saveEditItem(item: IItem) {
    const itemsCollection = (firebase as Firebase).fireStore.collection(
      "items"
    );
    itemsCollection.doc(item.id).set(item);
    setItemToEdit(undefined);
  }

  return (
    <>
      <ul>
        {props.results.map(x =>
          itemToEdit && itemToEdit.id === x.id ? (
            <li>
              <EntryForm item={x} onSave={saveEditItem}></EntryForm>
            </li>
          ) : (
            <li>
              {x.name} - <span onClick={() => startEditItem(x)}>EDIT</span> -{" "}
              <span onClick={() => deleteItem(x.id)}>DELETE</span>
            </li>
          )
        )}
      </ul>
    </>
  );
};
