import React from "react";
import ProductListStaff from "../../pages/product/ProductListStaff";
import ProductCreate from "../../pages/product/ProductCreate";
import ProductUpdate from "../../pages/product/ProductUpdate";

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
];

export default product;
