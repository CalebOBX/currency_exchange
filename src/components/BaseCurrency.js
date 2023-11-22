import React from 'react';

const BaseCurrency = (props) => {
    const { currencies, currency } = props;
    return(
      <>
        <option key={currency} value={currency}>{currency}</option>
        {
          currencies.map(currencyAbrv => {
            return (
              <option key={currencyAbrv} value={currencyAbrv}>{currencyAbrv}</option>
            )
          })
        } 
      </>
    );
}

export default BaseCurrency;