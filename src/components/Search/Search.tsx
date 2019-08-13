import React, { useState, useContext } from "react";
import SearchBox from "../search-box/SearchBox";
import ResultList from "../result-list/ResultList";
import Firebase, { FirebaseContext } from "../firebase-context";
import { useCollection } from "react-firebase-hooks/firestore";
import EntryForm from "../entry-form/EntryForm";
import IItem from "../../models/item";

export default (props: any) => {
  const [filterValue, setFilterValue] = useState("");

  const firebase = useContext(FirebaseContext);

  const onSearch = (filterValue: any) => {
    console.log(filterValue);
    setFilterValue(filterValue.toLowerCase());
  };

  const [value, loading, error] = useCollection(
    (firebase as Firebase).fireStore.collection("items"),
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

  const resultList = !value
    ? []
    : value.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().name
        };
      });
  return (
    <>
      <SearchBox onSearch={onSearch}></SearchBox>
      <div>
        <ResultList
          results={resultList.filter(
            x => !x.name || x.name.toLowerCase().includes(filterValue)
          )}
        ></ResultList>
      </div>
      <div>
        <EntryForm item={{ name: "" }} onSave={saveNewItem}></EntryForm>
      </div>
    </>
  );
};
