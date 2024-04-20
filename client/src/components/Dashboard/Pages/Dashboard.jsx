import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { FaUsers, FaBook,FaShoppingCart } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa6';
import { BarChart } from '@mui/x-charts/BarChart'; 

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCoursesSold, setTotalCoursesSold] = useState(0);
  const [newUsersData, setNewUsersData] = useState([]);
  
  const courseRevenueData = [
    { course: 'Course A', revenue: 5000 },
    { course: 'Course B', revenue: 8000 },
    { course: 'Course C', revenue: 3000 },
    // Add more data as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated API data
        const simulatedNewUsersData = [
          { date: new Date(2022, 3, 1), value: 10 },
          { date: new Date(2022, 3, 2), value: 20 },
          { date: new Date(2022, 3, 3), value: 15 },
          { date: new Date(2022, 3, 4), value: 25 },
          { date: new Date(2022, 3, 5), value: 30 },
          { date: new Date(2022, 3, 6), value: 22 },
          { date: new Date(2022, 3, 7), value: 18 },
        ];

        setNewUsersData(simulatedNewUsersData);

        const usersResponse = await axios.get('/api/user_details');
        const coursesResponse = await axios.get('/api/course_details');
        const totalRevenue = await axios.get('/api/course_statistics');

        setTotalStudents(usersResponse.data.totalStudents);
        setTotalTeachers(usersResponse.data.totalTeachers);
        setTotalRevenue(totalRevenue.data.totalRevenue);
        setTotalCoursesSold(totalRevenue.data.totalPayments);
        setTotalCourses(coursesResponse.data.totalCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { id: 0, value: totalStudents, label: 'Students' },
    { id: 1, value: totalTeachers, label: 'Teachers' },
  ];

  const CustomAxis = () => {
    return (
      <div>
        <SparkLineChart
          data={newUsersData.map(item => item.value)}
          xAxis={{
            scaleType: 'time',
            data: newUsersData.map(item => item.date),
            valueFormatter: (value) => value.toISOString().slice(0, 10),
            label: 'Date', // Adding X-axis label
          }}
          yAxis={{
            label: 'New Users', // Adding Y-axis label
          }}
          height={200}
          showTooltip
          showHighlight
        />
      </div>
    );
  };
  

  return (
    <div>
      <div style={boxStyle}>
        <div style={boxItemStyle(totalStudents, 'blue')}>
          <FaUsers size={36} color="white"/>
          <h2 style={{ fontSize: '15px' }}>Total Users</h2>
          <p>{totalStudents + totalTeachers}{" "}(Stud: {totalStudents}<span style={{color:'Red'}}> || </span>Teach: {totalTeachers})</p>
        </div>
        <div style={boxItemStyle(totalCourses, 'green')}>
          <FaBook size={36} color="white" />
          <h2 style={{ fontSize: '15px' }}>Total Courses</h2>
          <p>{totalCourses}</p>
        </div>
        <div style={boxItemStyle(totalRevenue, '#C70039')}>
          <FaRupeeSign size={36} color="white" />
          <h2 style={{ fontSize: '18px' }}>Revenue Generated</h2>
          <p>Rs. {totalRevenue}</p>
        </div>
        <div style={boxItemStyle(totalCoursesSold, 'Indigo')}>
          <FaShoppingCart size={36} color="white" />
          <h2 style={{ fontSize: '15px' }}>Total Courses Sold</h2>
          <p>{totalCoursesSold}</p>
        </div>
      </div>
      <div>
    <div style={{ ...containerStyle, marginBottom: '20px' }}>
      <div style={{ ...chartBoxStyle, flex: '1' ,marginRight:'20px'}}>
        <h2>User Distribution</h2>
        <div style={chartContainerStyle}>
          <PieChart series={[{ data }]} width={440} height={220} />
        </div>
      </div>
      <div style={{ ...chartBoxStyle, flex: '1' }}>
        <h2>Course Revenue</h2>
        <div style={chartContainerStyle}>
          <BarChart
            width={500}
            dataset={courseRevenueData}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: 'course',
                tick: {
                  angle: -45,
                  textAnchor: 'end',
                },
              },
            ]}
            series={[{ dataKey: 'revenue', label: 'Revenue' }]}
            height={200}
          />
        </div>
      </div>
    </div>
    <div style={chartBoxStyle}>
      <h2>New Users Per Day</h2>
      <div style={chartContainerStyle}>
        <CustomAxis />
      </div>
    </div>
  </div>
  </div>
  );

};  

export default Dashboard;

const boxStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};
const boxItemStyle = (value,color) => ({
  flex: '1',
  margin: '10px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  background: color,
  textAlign: 'center',
  fontSize: '15px',
  color: 'white',
  boxShadow: value === 0 ? '0 0 8px rgba(255, 0, 0, 0.5)' : 'none',
});

const chartBoxStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  background: '#f9f9f9',
  margin: '30px  0 10px 0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const chartContainerStyle = {
  padding: '10px',
  border: '1px solid #ccc',

};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};