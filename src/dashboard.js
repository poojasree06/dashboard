import React, { useState, useEffect } from "react";
import Category from "./Category";
import AddCategoryForm from "./AddCategoryForm";
import "./App.css";

const Dashboard = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: 1, name: "Cloud Accounts", content: "Widget Content 1" },
        { id: 2, name: "Cloud Account Risk Assessment", content: "Widget Content 2" }
      ]
    },
    {
      id: 2,
      name: "CWPP Dashboard",
      widgets: [
        { id: 3, name: "Top 5 Namespace Specific Alerts", content: "Widget Content 3" },
        { id: 4, name: "Workload Alerts", content: "Widget Content 4" }
      ]
    },
    {
      id: 3,
      name: "Registry Scan",
      widgets: [
        { id: 5, name: "Image Risk Assessment", content: "Widget Content 5" },
        { id: 6, name: "Image Security Issues", content: "Widget Content 6" }
      ]
    }
  ]);

  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || null);
  const [showSlidingPanel, setShowSlidingPanel] = useState(false);

  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setShowSlidingPanel(false); // Hide the sliding panel after adding a category
  };

  const addWidget = (categoryId, widget) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, widgets: [...category.widgets, widget] }
        : category
    ));
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) }
        : category
    ));
  };

  const handleCheckboxChange = (categoryId, widgetId) => {
    setSelectedWidgets(prev => ({
      ...prev,
      [categoryId]: prev[categoryId]
        ? (prev[categoryId].includes(widgetId)
          ? prev[categoryId].filter(id => id !== widgetId)
          : [...prev[categoryId], widgetId])
        : [widgetId]
    }));
  };

  const handleConfirm = () => {
    const updatedCategories = categories.map(category => ({
      ...category,
      widgets: category.widgets.filter(widget => !selectedWidgets[category.id]?.includes(widget.id))
    }));
    setCategories(updatedCategories);
    setSelectedWidgets({});
    setShowSlidingPanel(false); // Hide the sliding panel after confirming
  };

  const handleCancel = () => {
    setSelectedWidgets({});
    setShowSlidingPanel(false); // Hide the sliding panel
  };

  const handleAddCategoryClick = () => {
    setShowSlidingPanel(true);
    setActiveCategoryId(null); // Optionally reset activeCategoryId if needed
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          {!showSlidingPanel && (
            <button
              className="add-category-button"
              onClick={handleAddCategoryClick}
            >
              + Add Category
            </button>
          )}
        </div>

        <div className="categories-list">
          {categories.map(category => (
            <Category
              key={category.id}
              category={category}
              addWidget={addWidget}
              removeWidget={removeWidget}
            />
          ))}
        </div>
      </div>

      {showSlidingPanel && (
        <div className="sliding-panel">
          <div className="sliding-panel-header">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category Name"
            />
            <button onClick={() => addCategory({ id: Date.now(), name: newCategoryName, widgets: [] })}>
              Add Category
            </button>
          </div>

          <div className="categories-tabs">
            {categories.map(category => (
              <div
                key={category.id}
                className={`category-tab ${activeCategoryId === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategoryId(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>

          <div className="category-content">
            {categories
              .filter(category => category.id === activeCategoryId)
              .map(category => (
                <div key={category.id} className="widgets-list">
                  {category.widgets.map(widget => (
                    <div key={widget.id} className="widget-item">
                      <input
                        type="checkbox"
                        checked={selectedWidgets[category.id]?.includes(widget.id) || false}
                        onChange={() => handleCheckboxChange(category.id, widget.id)}
                      />
                      <label>
                        <h4>{widget.name}</h4>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <div className="sliding-panel-footer">
            <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
