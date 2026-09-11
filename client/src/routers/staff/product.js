import React from "react";
import ProductListStaff from "../../pages/product/ProductListStaff";
import ProductCreate from "../../pages/product/ProductCreate";
import ProductUpdate from "../../pages/product/ProductUpdate";
import CategoryBrandManage from "../../pages/category-brand/CategoryBrandManage";

const product = [
  {
    path: "products",
    Component: ProductListStaff,
  },
  {
    path: "products/create",
    Component: ProductCreate,
  },
  {
    path: "products/:id/edit",
    Component: ProductUpdate,
  },
  {
    path: "products/edit/:id",
    Component: ProductUpdate,
  },
  {
    path: "categories-brands",
    Component: CategoryBrandManage,
  },
];

export default product;
