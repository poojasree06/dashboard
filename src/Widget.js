import React from "react";

const Widget = ({ widget, categoryId, removeWidget }) => {
  return (
    <div className="widget">
      <button
        className="remove-widget"
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        &times;
      </button>
      <h4>{widget.name}</h4>
      <p>{widget.content}</p>
    </div>
  );
};

export default Widget;
