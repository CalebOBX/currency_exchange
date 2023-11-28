import React from 'react';
import { Link } from 'react-router-dom';

const ConvertedTable = (props) => {
  const { rates, base } = props;
  return(
    <>
      <h3>Conversion</h3>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {
            rates.map(currency => {
              return(
                <tr key={currency.abr}>
                  <td>{currency.abr}</td>
                  <td><Link to={`/conversion-swapper?from=${currency.abr}&to=${base}`}>{currency.rate}</Link></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default ConvertedTable;