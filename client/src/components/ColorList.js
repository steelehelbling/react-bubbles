import React, { useState } from "react";
//import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";
const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({props, colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [paint, setPaint] = useState();

  const editColor = (colors) => {
    setEditing(true);
    setColorToEdit(colors);
    setPaint(colors);
    
  };

  const saveEdit = (e) => {
    
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit);
    updateColors([...colors]);
  };

  const deleteColor = (color) => {
    updateColors(
      colors.filter((item) => {
        return item.color !== color.color && item.code.hex !== color.code.hex;
      })
    );
    axiosWithAuth().delete(`api/colors/${color.id}`);
  };
  const addnew = (e) => {
  
    axiosWithAuth().post("api/colors", colorToEdit);
    updateColors([...colors]);
  };
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <button onClick={() => addnew()} className='add'>add new</button>
    </div>
  );
};

export default ColorList;
