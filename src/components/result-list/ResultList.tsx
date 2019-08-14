import React, { useContext, useState } from "react";
import Firebase, { FirebaseContext } from "../firebase-context";
import IItem from "../../models/item";
import MaterialTable from "material-table";

export interface IResultListProps {
  collectionName: string;
  results: IItem[];
}

export default (props: IResultListProps) => {
  const firebase = useContext(FirebaseContext);

  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          editable={{
            isEditable: rowData => true, //rowData.name === "Name", // only name(a) rows would be editable
            isDeletable: rowData => true, //rowData.name === "b", // only name(a) rows would be deletable
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const itemsCollection = (firebase as Firebase).fireStore.collection(
                      props.collectionName
                    );
                    itemsCollection.add(newData);
                  }
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const itemsCollection = (firebase as Firebase).fireStore.collection(
                      props.collectionName
                    );
                    itemsCollection.doc(newData.id).set(newData);
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const itemsCollection = (firebase as Firebase).fireStore.collection(
                      props.collectionName
                    );
                    itemsCollection.doc(oldData.id).delete();
                  }
                  resolve();
                }, 1000);
              })
          }}
          columns={[
            { title: "Name", field: "name" },
            { title: "Location", field: "location" },
            { title: "Sublocation", field: "sublocation" }
          ]}
          data={props.results}
          title="Inventory"
          options={{ pageSize: 15 }}
        />
      </div>
    </>
  );
};
