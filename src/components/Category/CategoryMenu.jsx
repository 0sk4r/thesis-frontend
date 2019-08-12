import React, { useEffect, useState } from "react";
import { Menu} from "antd";
import { Link } from "react-router-dom";
import { categoryService } from "_services/category_service";

const { SubMenu } = Menu;

function CategoryMenu(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.index().then(response => {
      setCategories(response.data);
    });
  }, []);

  return (
    <SubMenu title={<span>Category</span>} style={props.style} {...props}>
      {categories.map(category => (
        <Menu.Item key={category.name}>
          <Link to={`/categories/${category.id}`}>{category.name}</Link>
        </Menu.Item>
      ))}
    </SubMenu>
  );
}

export default CategoryMenu;
