import React from "react";
import ProductListStaff from "../../pages/staff/product/ProductListStaff";
import ProductCreate from "../../pages/staff/product/ProductCreate";
import ProductUpdate from "../../pages/staff/product/ProductUpdate";
import ProductDetailStaff from "../../pages/staff/product/ProductDetailStaff";
import CategoryBrandManage from "../../pages/staff/category-brand/CategoryBrandManage";

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
    path: "products/:id",
    Component: ProductDetailStaff,
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
