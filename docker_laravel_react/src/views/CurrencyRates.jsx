import { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import axiosClient from '../axiosClient';

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/currency-rates')
      .then(({ data }) => {
        setLoading(false);
        setRates(data); // Pastikan respons data sesuai dengan struktur yang diharapkan
      })
      .catch(error => {
        console.error("There was an error fetching the currency rates!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Currency Code</th>
          <th>Rate</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate, index) => (
          <tr key={index}>
            <td>{rate.currency_code}</td>
            <td>{rate.rate}</td>
            <td>{rate.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CurrencyRates;
