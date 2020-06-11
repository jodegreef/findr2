import React, { useContext, useState } from "react";
import Firebase, { FirebaseContext } from "../firebase-context";
import IItem from "../../models/item";
import MaterialTable, { Column } from "material-table";

export interface IResultListProps {
  title: string;
  collectionName: string;
  results: IItem[];
}

export default (props: IResultListProps) => {
  const firebase = useContext(FirebaseContext);

  const [searchValue, setSearchValue] = useState("");

  const customSearch = (
    filter: string,
    rowData: IItem,
    columnDef: Column<IItem>
  ) => {
    if (searchValue !== filter) setSearchValue(filter);
    const rowValue = rowData.name.toLocaleLowerCase();
    // must contain all words, somewhere, not consecutive necessarily
    return filter
      .toLocaleLowerCase()
      .split(" ")
      .every(val => rowValue.includes(val));
  };

  function displayMatches(value: string, filter: string) {
    if (filter && filter.length > 1) {
      var regex = new RegExp(filter.split(" ").join("|"), "gi");
      var response = value.replace(regex, function(str) {
        return "<span style='background-color: yellow;'>" + str + "</span>";
      });
      return response;
    } else return value;
  }

  return (
    <>
      <div style={{ maxWidth: "900px" }}>
        <MaterialTable
          editable={{
            isEditable: rowData => true,
            isDeletable: rowData => true,
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
            {
              title: "Name",
              field: "name",
              customFilterAndSearch: customSearch,
              render: rowdata => {
                const renderValue = displayMatches(rowdata.name, searchValue);
                return (
                  <div dangerouslySetInnerHTML={{ __html: renderValue }} />
                );
              }
            },
            { title: "Location", field: "location" },
            { title: "Sublocation", field: "sublocation" }
          ]}
          data={props.results}
          title={props.title}
          options={{ pageSize: 10, grouping: true, addRowPosition: "first" }}
        />
      </div>
    </>
  );
};
