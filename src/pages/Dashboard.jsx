import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Skeleton } from 'antd';
import { UserOutlined, TeamOutlined, IdcardOutlined } from '@ant-design/icons';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Notes from './Notes';

const DashboardContent = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalLecturers, setTotalLecturers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const studentsQuery = query(usersRef, where('role', '==', 'mahasiswa'));
        const studentsSnapshot = await getDocs(studentsQuery);
        const lecturersQuery = query(usersRef, where('role', '==', 'dosen'));
        const lecturersSnapshot = await getDocs(lecturersQuery);
        setTotalUsers(usersSnapshot.size);
        setTotalStudents(studentsSnapshot.size);
        setTotalLecturers(lecturersSnapshot.size);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={24}>
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="bg-blue-200">
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold">
                  <UserOutlined style={{ marginRight: '8px' }} />
                  {totalUsers}
                </p>
              </>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="bg-green-200">
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                <p className="text-3xl font-bold">
                  <TeamOutlined style={{ marginRight: '8px' }} />
                  {totalStudents}
                </p>
              </>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="bg-yellow-200">
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">Total Lecturers</h3>
                <p className="text-3xl font-bold">
                  <IdcardOutlined style={{ marginRight: '8px' }} />
                  {totalLecturers}
                </p>
              </>
            )}
          </Card>
        </Col>
      </Row>
      <section className="w-full">
        <Notes />
      </section>
    </div>
  );
};

export default DashboardContent;
