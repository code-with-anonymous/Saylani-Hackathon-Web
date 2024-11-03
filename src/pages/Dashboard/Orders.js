import React, { useEffect, useState } from 'react';
import { Table, notification, Badge } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { db } from '../../firebase/config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isSpin, setSpin] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      setSpin(true);
      if (!currentUser) {
        notification.error({
          message: 'Error',
          description: 'You must be logged in to view your orders.',
        });
        setSpin(false);
        return;
      }
      
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('buyerId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || 'Processing', // Default status to "Processing"
        }));
        setOrders(ordersData);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: `Error fetching orders: ${error.message}`,
        });
      } finally {
        setSpin(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <main className="text-center m-5">
      <h3>Your Orders</h3>
      <Table
        className='table-responsive'
        loading={isSpin}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      >
        <Table.Column title="Product Name" dataIndex="productName" key="productName" />
        <Table.Column title="Buyer Email" dataIndex="buyerEmail" key="buyerEmail" />
        
        <Table.Column 
          title="Price" 
          dataIndex="productPrice" 
          key="productPrice" 
          render={price => `$${Number(price || 0).toFixed(2)}`} 
        />
        <Table.Column 
          title="Total" 
          key="total" 
          render={(_, record) => {
            const total = Number(record.productPrice || 0) * (Number(record.quantity) || 1); // Default quantity to 1
            return `$${total.toFixed(2)}`;
          }} 
        />
        <Table.Column 
          title="Order Date" 
          dataIndex="timestamp" 
          key="timestamp" 
          render={timestamp => new Date(timestamp?.seconds * 1000).toLocaleDateString()} 
        />
        <Table.Column 
          title="Status" 
          key="status" 
          render={(_, record) => (
            <Badge 
              status={record.status === 'Processing' ? 'processing' : 'default'} 
              text={record.status} // Display the actual status text
            />
          )}
        />
      </Table>
    </main>
  );
};

export default Orders;
