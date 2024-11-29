import React, { useState, useEffect } from "react";
import { Table, Button, message, Spin, Modal, Form, Input } from "antd";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSpin, setSpin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productCollection = await getDocs(collection(db, "products"));
        const productList = productCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        message.error(`Error fetching products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    setSpin(true);
    try {
      await deleteDoc(doc(db, "products", id));
      message.success("Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      message.error(`Error deleting product: ${error.message}`);
    } finally {
      setSpin(false);
    }
  };

  const showEditModal = (product) => {
    setCurrentProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const updatedProduct = form.getFieldsValue();
      await updateDoc(doc(db, "products", currentProduct.id), updatedProduct);
      message.success("Product updated successfully!");
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      setIsModalVisible(false);
    } catch (error) {
      message.error(`Error updating product: ${error.message}`);
    }
  };

  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 200px)",
  };

  const renderImage = (url) => (
    <img
      src={url}
      alt="Product"
      style={{ width: 100, height: 100, objectFit: "cover" }}
    />
  );

  return (
    <main className="mt-5 container">
      {loading ? (
        <div style={loadingContainerStyle}>
          <Spin size="large" />
        </div>
      ) : (
        <>
        <div className="table-responsive">
          <Table
            dataSource={products}
            rowKey="id"
            className="table-responsive"
            pagination={{ pageSize: 5 }} >
            <Table.Column
              title="Images"
              dataIndex="image"
              render={renderImage}
            />
            <Table.Column title="Product Name" dataIndex="name" />
            <Table.Column title="Category" dataIndex="category" />
            <Table.Column
              title="Description"
              dataIndex="description"
              render={(text) =>
                text && text.length > 20 ? `${text.substring(0, 30)}...` : text
              }
            />
            <Table.Column
              title="Price"
              dataIndex="price"
              render={(price) => {
                const numericPrice = Number(price);
                return isNaN(numericPrice)
                  ? "$0.00"
                  : `$${numericPrice.toFixed(2)}`;
              }}
            />
            <Table.Column
              title="Actions"
              render={(_, record) => (
                <div className="d-flex align-items-center">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => showEditModal(record)}
                    style={{ color: "green" }}
                    className="mr-2"
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteProduct(record.id)}
                    loading={isSpin}
                    style={{ color: "red" }}
                    className="ms-2"
                  />
                </div>
              )}
            />
          </Table>
          </div>

          <Modal
            title="Edit Product"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={() => setIsModalVisible(false)}
            destroyOnClose
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  { required: true, message: "Please enter product name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price!" }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please enter category!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter description!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true, message: "Please enter image URL!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </main>
  );
};

export default ManageProducts;
