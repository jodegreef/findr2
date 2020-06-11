import React, { useContext } from "react";
import ResultList from "../result-list/ResultList";
import Firebase, { FirebaseContext } from "../firebase-context";
import { useCollection } from "react-firebase-hooks/firestore";

export default (props: { name: string; title: string }) => {
  const firebase = useContext(FirebaseContext);

  const [value, loading, error] = useCollection(
    (firebase as Firebase).fireStore.collection(props.name).orderBy("name"),
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
            location: doc.data().location && doc.data().location.toUpperCase(),
            sublocation: doc.data().sublocation
          };
        });

  return (
    <>
      <ResultList
        title={props.title}
        collectionName={props.name}
        results={resultList}
      ></ResultList>
    </>
  );
};
