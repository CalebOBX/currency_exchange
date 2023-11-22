import React from 'react';

const ConvertedList = (props) => {
  const { rates } = props;
  
  return(
    <>
      {
        rates.map(currency => {
          return(
            <li key={currency.name}>
              <span>{currency.name}</span>
              <span>{currency.rate}</span>
            </li>
          )
        })
      }
      
    </>
  )
}

export default ConvertedList;