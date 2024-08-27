import React from "react";
import Widget from "./Widget";
import AddWidgetForm from "./AddWidgetForm";

const Category = ({ category, addWidget, removeWidget }) => {
  return (
    <div className="category">
      <h3>{category.name}</h3>
      <div className="widgets">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            removeWidget={removeWidget}
          />
        ))}
        {/* Form to add widgets directly below the widgets */}
        <AddWidgetForm addWidget={addWidget} categoryId={category.id} />
      </div>
    </div>
  );
};

export default Category;
