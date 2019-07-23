import React, { useEffect, useState } from "react";
import {Form, Select } from "antd";
import { categoryService } from "../../_services/category_service";
import { authenticationHelper } from "../../_helpers/auth_helpers";

const { Option } = Select;

function CategorySelect(props) {
  const [categories, setCategories] = useState([]);
  const { getFieldDecorator } = props.form;
  useEffect(() => {
    categoryService.index().then(response => {
      authenticationHelper.handleTokenChange(response);
      console.log(response.data);
      setCategories(response.data);
    });
  }, []);

  return (
    <Form.Item label="Category:">
      {getFieldDecorator("category", {
        initialValue: props.defaultValue
      })(
        <Select
          showSearch
          name="category"
          style={{ width: 200 }}
          placeholder="Select a category"
          optionFilterProp="children"
          onChange={e => props.handleCategoryChange(e)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {categories.map(category => (
            <Option value={category.id}>{category.name}</Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
}

const WrappedCategorySelect = Form.create({ name: "new" })(CategorySelect);
export default WrappedCategorySelect;

