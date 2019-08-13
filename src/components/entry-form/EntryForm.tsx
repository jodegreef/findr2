import React from "react";
import IItem from "../../models/item";
import useForm from "../useForms";

export interface IEntryFormProps {
  item: IItem;
  onSave: (item: IItem) => void;
}

export default (props: IEntryFormProps) => {
  const { values, handleChange, handleSubmit } = useForm(props.item, () =>
    props.onSave(values)
  );

  // function login() {
  //   console.log(values);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span>name: </span>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
