import React, { useState, useContext } from "react";
import ResultList from "../result-list/ResultList";
import Firebase, { FirebaseContext } from "../firebase-context";
import { useCollection } from "react-firebase-hooks/firestore";

export default (props: any) => {
  const defaultNewItem = { name: "", location: "", labels: "" };

  const [filterValue, setFilterValue] = useState("");

  const firebase = useContext(FirebaseContext);

  const onSearch = (filterValue: any) => {
    setFilterValue(filterValue.toLowerCase());
  };

  const [value, loading, error] = useCollection(
    (firebase as Firebase).fireStore.collection("items").orderBy("name"),
    //.limit(10),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

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
      <ResultList
        collectionName="items"
        results={resultList.filter(
          x => !x.name || x.name.toLowerCase().includes(filterValue)
        )}
      ></ResultList>
    </>
  );
};
