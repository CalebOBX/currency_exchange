import React from 'react';

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
                  <td>{currency.rate}</td>
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