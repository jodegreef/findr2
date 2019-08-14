import React, { useState, useContext } from "react";
import SearchBox from "../search-box/SearchBox";
import ResultList from "../result-list/ResultList";
import Firebase, { FirebaseContext } from "../firebase-context";
import { useCollection } from "react-firebase-hooks/firestore";
import EntryForm from "../entry-form/EntryForm";
import IItem from "../../models/item";

export default (props: any) => {
  const defaultNewItem = { name: "", location: "", labels: "" };

  const [filterValue, setFilterValue] = useState("");

  const firebase = useContext(FirebaseContext);

  const onSearch = (filterValue: any) => {
    setFilterValue(filterValue.toLowerCase());
  };

  const [value, loading, error] = useCollection(
    (firebase as Firebase).fireStore
      .collection("items")
      .orderBy("name")
      .limit(10),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  function saveNewItem(item: IItem) {
    const itemsCollection = (firebase as Firebase).fireStore.collection(
      "items"
    );
    itemsCollection.add(item);
  }

  const resultList =
    !value || loading || error
      ? []
      : value.docs.map(doc => {
          return {
            id: doc.id,
            name: doc.data().name,
            labels: doc.data().labels,
            location: doc.data().location.toUpperCase(),
            sublocation: doc.data().sublocation
          };
        });
  return (
    <>
      <h3>Search</h3>
      <SearchBox onSearch={onSearch}></SearchBox>
      <div>
        <h3>Results</h3>

        <ResultList
          results={resultList.filter(
            x => !x.name || x.name.toLowerCase().includes(filterValue)
          )}
        ></ResultList>
      </div>
      <div>
        <h3>New item</h3>
        <EntryForm item={defaultNewItem} onSave={saveNewItem}></EntryForm>
      </div>
    </>
  );
};
