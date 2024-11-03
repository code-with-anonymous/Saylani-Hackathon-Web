import React, { useEffect, useState } from 'react';
import { Card, message, Row, Col, Button } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase/config'; 
import { useAuth } from '../../contexts/AuthContext';

const Earnings = () => {
  const { currentUser } = useAuth();
  const [earnings, setEarnings] = useState(0);
  const [gst, setGST] = useState(0);
  const [appTax, setAppTax] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [netEarnings, setNetEarnings] = useState(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("sellerUid", "==", currentUser.uid)
        );
        const orderSnapshot = await getDocs(q);
        const totalEarnings = orderSnapshot.docs.reduce((acc, doc) => acc + (doc.data().price || 0), 0);

        const calculatedGST = totalEarnings * 0.15;
        const calculatedAppTax = totalEarnings * 0.05;
        const calculatedTotalDeductions = calculatedGST + calculatedAppTax;
        const calculatedNetEarnings = totalEarnings - calculatedTotalDeductions;

        setEarnings(totalEarnings);
        setGST(calculatedGST);
        setAppTax(calculatedAppTax);
        setTotalDeductions(calculatedTotalDeductions);
        setNetEarnings(calculatedNetEarnings);
      } catch (error) {
        message.error(`Error fetching earnings: ${error.message}`);
      }
    };
    fetchEarnings();
  }, [currentUser]);

  const handlePrint = () => {
    window.print(); // Trigger the print dialog
  };

  return (
    <main style={{ padding: '20px' }}>
      <Card title="Earnings Overview" style={{ textAlign: "center", borderRadius: '10px' }}>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={12}>
            <div style={{ color: "rgba(0, 0, 0, 0.65)", fontSize: '1.2rem' }}>Total Earnings:</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${Number(earnings).toFixed(2)}</div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div>Total GST (15%):</div>
            <div style={{ color: "red", fontWeight: 'bold' }}>${Number(gst).toFixed(2)}</div>
          </Col>
          <Col span={12}>
            <div>Total App Tax (5%):</div>
            <div style={{ color: "orange", fontWeight: 'bold' }}>${Number(appTax).toFixed(2)}</div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div>Total Deductions:</div>
            <div style={{ color: "blue", fontWeight: 'bold' }}>${Number(totalDeductions).toFixed(2)}</div>
          </Col>
          <Col span={12}>
            <div style={{ fontWeight: "bold" }}>Net Earnings:</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${Number(netEarnings).toFixed(2)}</div>
          </Col>
        </Row>
        <div style={{ marginTop: "1rem", color: "red", fontSize: "0.85rem", fontStyle: 'italic' }}>
          <i>Notice: Earnings Only Based on Orders Accepted By You<br />Not Valid for court</i>
        </div>
        <Button type="primary" onClick={handlePrint} style={{ marginTop: '20px' }}>
          Print Receipt
        </Button>
      </Card>
    </main>
  );
};

export default Earnings;
