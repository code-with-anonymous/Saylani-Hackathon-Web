// import React, { useEffect, useState } from 'react';
// import { Table, notification, Badge } from 'antd';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/config';
// import { getAuth } from 'firebase/auth';

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const auth = getAuth();
//   const currentUser = auth.currentUser;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!currentUser) {
//         notification.error({
//           message: 'Error',
//           description: 'You must be logged in to view your orders.',
//         });
//         return;
//       }

//       try {
//         const ordersRef = collection(db, 'orders');
//         const q = query(ordersRef, where('buyerId', '==', currentUser.uid));
//         const querySnapshot = await getDocs(q);
//         const ordersData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(ordersData);
//         console.log(orders)
//       } catch (error) {
//         notification.error({
//           message: 'Error',
//           description: `Error fetching orders: ${error.message}`, // Template literal syntax corrected
//         });
//       }
//     };

//     fetchOrders();
//   }, [currentUser]);

//   const columns = [
//     {
//       title: 'Product Name',
//       dataIndex: 'productName',
//       key: 'productName',
//     },
//     // {
//     //   title: 'Quantity',
//     //   dataIndex: 'quantity',
//     //   key: 'quantity',
//     // },
//     {
//       title: 'Price',
//       dataIndex: 'productPrice',
//       key: 'productPrice',
//       render: price => `$${Number(price || 0).toFixed(2)}`, // Template literal syntax corrected
//     },
//     {
//       title: 'Total',
//       key: 'total',
//       render: (_, record) => `$${(Number(record.productPrice || 0) * Number(record.quantity || 0)).toFixed(2)}`, // Template literal syntax corrected
//     },
//     {
//       title: 'Order Date',
//       dataIndex: 'timestamp',
//       key: 'timestamp',
//       render: timestamp => new Date(timestamp.seconds * 1000).toLocaleDateString(), // Convert Firestore timestamp to readable date
//     },
//     {
//       title: 'Status',
//       key: 'status',
//       render: () => (
//         <Badge status="processing" text="In Processing" />
//       ),
//     },
//   ];

//   return (
//     <main className="text-center m-5">
//       <h3>Your Orders</h3>
//       <Table
//         dataSource={orders}
//         columns={columns}
//         rowKey="id"
//         pagination={{ pageSize: 5 }}
//         style={{ marginTop: 20 }}
//       />
//     </main>
//   );
// };

// export default Order;

// import React, { useEffect, useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { getAuth } from "firebase/auth";

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const auth = getAuth();
//   const currentUser = auth.currentUser;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!currentUser) {
//         alert("You must be logged in to view your orders.");
//         return;
//       }

//       try {
//         const ordersRef = collection(db, "orders");
//         const q = query(ordersRef, where("buyerId", "==", currentUser.uid));
//         const querySnapshot = await getDocs(q);
//         const ordersData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(ordersData);
//       } catch (error) {
//         alert(`Error fetching orders: ${error.message}`);
//       }
//     };

//     fetchOrders();
//   }, [currentUser]);

//   return (
//     <div className="">
//   <h3 className="text-center">Your Orders</h3>
//   <div className="table-container mt-3">
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Product Name</th>
//           <th>Price</th>
//           <th>Total</th>
//           <th>Order Date</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {orders.map((order) => (
//           <tr key={order.id}>
//             <td>{order.productName}</td>
//             <td>${Number(order.productPrice || 0).toFixed(2)}</td>
//             <td>
//               $
//               {(
//                 Number(order.productPrice || 0) * Number(order.quantity || 0)
//               ).toFixed(2)}
//             </td>
//             <td>
//               {new Date(order.timestamp.seconds * 1000).toLocaleDateString()}
//             </td>
//             <td>In Processing</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

  
//   );
// };

// export default Order;

import React, { useEffect, useState } from 'react';
import { Table, notification, Badge } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { db } from '../../firebase/config';

const Order = () => {
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
        setSpin(false); // Stop spinner on error
        return;
      }

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('buyerId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: `Error fetching orders: ${error.message}`,
        });
      } finally {
        setSpin(false); // Stop spinner after fetching
      }
    };

    fetchOrders();
  }, [currentUser]);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'productPrice',
      key: 'productPrice',
      render: price => `$${Number(price || 0).toFixed(2)}`,
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => `$${(Number(record.productPrice || 0) * Number(record.quantity || 1)).toFixed(2)}`,
    },
    {
      title: 'Order Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: timestamp =>
        timestamp?.seconds
          ? new Date(timestamp.seconds * 1000).toLocaleDateString()
          : 'N/A',
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <Badge status="processing" text="In Processing" />,
    },
  ];

  return (
    <main className="text-center m-5">
      <h3>Your Orders</h3>
      <Table
        className="table-responsive"
        loading={isSpin}
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
    </main>
  );
};

export default Order;
