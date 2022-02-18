import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
let defaultData;
function App() {
  const [data, setData] = useState([]);
  const [filterSearchValue, setFilterSearchValue] = useState('');
  useEffect(() => {
    axios.get('/api').then((res) => {
      defaultData = res.data.apiResponse;
      if (defaultData.length > 0) {
        defaultData = defaultData.map((x) => {
          return {
            id: x.id,
            name: x.name,
            phone: x.phone,
            username: x.username,
            website: x.website,
            email: x.email,
            company: x.company.name,
            address: `${x.address.suite} ${x.address.street} ${x.address.city} ${x.address.zipcode}`,
          };
        });
      }
      setData(defaultData);
    });
  }, []);

  const checkTextValue = (e) => {
    if (e) {
      const { value } = e.target;
      if (value) {
        setFilterSearchValue(value);
        let modifiedData = data.slice();
        modifiedData = modifiedData.filter((x) => {
          return Object.values(x)
            .join(' ')
            .toLowerCase()
            .includes(filterSearchValue.toLowerCase());
        });
        setData(modifiedData);
      } else {
        setFilterSearchValue('');
        setData(defaultData);
      }
    } else {
      setFilterSearchValue('');
      setData(defaultData);
    }
  };
  function tableData() {
    if (data.length > 0) {
      return data.map((x) => {
        return (
          <tr key={x.id}>
            <td>{x.id}</td>
            <td>{x.name}</td>
            <td>{x.phone}</td>
            <td>{x.username}</td>
            <td>{x.website}</td>
            <td>{x.email}</td>
            <td>{x.company}</td>
            <td>{x.address}</td>
          </tr>
        );
      });
    }
  }
  return (
    <>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <input
          aria-label="Search"
          type="text"
          value={filterSearchValue}
          onChange={(e) => checkTextValue(e)}
        />
      </div>
      {data.length ? (
        <div style={{ marginTop: '10px' }}>
          <table style={{ width: '100%', textAlign: 'center' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Website</th>
                <th>Email</th>
                <th>Company Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>{tableData()}</tbody>
          </table>
        </div>
      ) : (
        `.... is Loading ...`
      )}
    </>
  );
}
export default App;
