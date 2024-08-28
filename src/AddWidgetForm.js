import React, { useState } from "react";

const AddWidgetForm = ({ addWidget, categoryId }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetContent, setWidgetContent] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWidget = {
      id: Math.random(), // Generate a unique ID
      name: widgetName,
      content: widgetContent,
    };

    addWidget(categoryId, newWidget);

    setWidgetName("");
    setWidgetContent("");
    setFormVisible(false); // Hide the form after submission
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    setFormVisible(!formVisible);
  };

  return (
    <div className={`add-widget-box ${formVisible ? "active" : ""}`} onClick={handleClick}>
      {!formVisible ? (
        <div className="add-icon-div">
        <span className="add-icon">+</span>
        <span className="add-icon-widget">Add Widget</span>
        </div>
      ) : (
        <form
          className="add-widget-form"
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()} // Prevent click event from affecting the form
        >
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            placeholder="Widget Name"
            required
          />
          <textarea
            value={widgetContent}
            onChange={(e) => setWidgetContent(e.target.value)}
            placeholder="Widget Content"
            required
          />
          <button type="submit">Add Widget</button>
        </form>
      )}
    </div>
  );
};

export default AddWidgetForm;
