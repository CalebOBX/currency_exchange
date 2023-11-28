import React, { Component } from 'react';
import { checkStatus, json } from '../utils/utils';
import currencies from '../utils/currencies'
import CurrencyList from '../components/CurrencyList';

class ConversionSwapper extends Component {
  constructor() {
    super();
    this.state = {
      baseAmount: 0,
      baseCurrency: 'USD',
      convertedAmount: 0,
      convertedCurrency: 'EUR',
      currencies: [],
      loading: true
    }
  }

  componentDidMount() {
    this.setCurrencies(this.state.currencies);
  }

  setCurrencies() {
    this.setState({ currencies, loading: false })
  }

  changeBaseCurrency = (event) => {

  }

  changeBaseAmount = (event) => {

  }

  changeConvertedCurrency = (event) => {

  }

  changeConvertedAmount = (event) => {

  }

  getRates() {

  }

  render() {
    const { baseAmount, baseCurrency, convertedAmount, convertedCurrency, currencies, loading } = this.state;
    return (
      <>
        <div id='baseSwapBox' className='box'>
          <h2>Base Currency &amp; Amount</h2>
          <form>
            <select value={baseCurrency} onChange={this.changeBaseCurrency} disabled={loading}>
              <CurrencyList currencies={currencies} currency={baseCurrency} />
            </select>
          </form>
          <input type='number' value={baseAmount} onChange={this.changeBaseAmount} min='0' disabled={loading} />
        </div>
        
        <div id='convertedSwapBox' className='box'>
          <h2>Converted Currency &amp; Amount</h2>
          <form>
            <select value={convertedCurrency} onChange={this.changeConvertedCurrency} disabled={loading}>
              <CurrencyList currencies={currencies} currency={baseCurrency} />
            </select>
          </form>
          <input type='number' value={convertedAmount} onChange={this.changeConvertedAmount} min='0' disabled={loading} />
        </div>     
      </>
    )
  }
}

export default ConversionSwapper;