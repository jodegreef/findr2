import React from "react";
import IItem from "../../models/item";
import useForm from "../useForms";

export interface IEntryFormProps {
  item: IItem;
  onSave: (item: IItem) => void;
}

export default (props: IEntryFormProps) => {
  const { values, handleChange, handleSubmit } = useForm(props.item, () => {
    props.onSave(values);
    values.name = "";
    values.location = "";
    values.sublocation = "";
  });

  return (
    <form style={{ fontSize: "20px" }} onSubmit={handleSubmit}>
      <div>
        <span style={{ display: "inline-block", width: "120px" }}>name: </span>
        <input
          style={{ fontSize: "20px" }}
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <span style={{ display: "inline-block", width: "120px" }}>
          location:{" "}
        </span>
        <input
          style={{ fontSize: "20px" }}
          type="text"
          name="location"
          value={values.location}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <span style={{ display: "inline-block", width: "120px" }}>
          sublocation:{" "}
        </span>
        <input
          style={{ fontSize: "20px" }}
          type="text"
          name="sublocation"
          value={values.sublocation}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
