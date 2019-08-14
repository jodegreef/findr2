import React, { useContext, useState } from "react";
import Firebase, { FirebaseContext } from "../firebase-context";
import IItem from "../../models/item";
import EntryForm from "../entry-form/EntryForm";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Sublocation</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map(x =>
            itemToEdit && itemToEdit.id === x.id ? (
              <TableRow key={x.id}>
                <TableCell>
                  <EntryForm item={x} onSave={saveEditItem}></EntryForm>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={x.id}>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.location}</TableCell>
                <TableCell>{x.sublocation}</TableCell>
                <TableCell>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => startEditItem(x)}
                  >
                    EDIT
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItem(x.id)}
                  >
                    DELETE
                  </span>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </>
  );
};
