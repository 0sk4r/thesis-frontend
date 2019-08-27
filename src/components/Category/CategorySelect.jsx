import React, {useEffect, useState} from "react";
import {Form, Select} from "antd";
import {categoryService} from "_services/category_service";

const {Option} = Select;

// Category list component. Display menu of all categories to select
function CategorySelect(props) {
  const [categories, setCategories] = useState([]);
  const {getFieldDecorator} = props.form;

  // Fetch data
  useEffect(() => {
    categoryService.index().then(response => {
      setCategories(response.data);
    });
  }, []);

  return (
    <Form.Item>
      {getFieldDecorator("category", {
        initialValue: props.defaultValue
      })(
        <Select
          showSearch
          name="category"
          style={{width: 200}}
          placeholder="Select a category"
          optionFilterProp="children"
          onChange={e => props.handleCategoryChange(e)}
          // User can search through menu by typing
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {categories.map(category => (
            <Option value={category.id} key={category.name}>{category.name}</Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
}

const WrappedCategorySelect = Form.create({name: "new"})(CategorySelect);
export default WrappedCategorySelect;
