// src/components/AddCategoryForm.js
import React, { useState } from "react";

const AddCategoryForm = ({ addCategory }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      const newCategory = {
        id: Date.now(), // Use timestamp as a unique ID
        name: categoryName,
        widgets: []
      };
      addCategory(newCategory);
      setCategoryName(""); // Clear input after submission
    }
  };

  return (
    <form className="add-category-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="New Category Name"
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
