import React, { useState, useEffect } from 'react';

const OrderTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // Fetch data
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/bubles');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();

            setTimeout(() => {
                setData(result);
                setLoading(false);
            }, 2000)
            
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    // Use Effect to when data is being assembled
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Users Table</h1>
            {/** Button to refresh the list of names */}
            <button onClick={fetchData}>Refresh Data</button>

            {/*When you fetch data the loading state will be called*/}
            {loading && <p>Loading Data!</p>}

            {/*Show the error if API call fail*/}
            {error && <p style={{color: 'red', fontWeight: 'bold'}}>Error: {error}</p>}

            {/** If received data, display in a table */}
            {!loading && !error && (
                <table border="1" style={{marginTop: '12px'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default OrderTable;