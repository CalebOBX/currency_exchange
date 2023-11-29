import React, { Component } from 'react';
import { checkStatus, json } from '../utils/utils';
import currencies from '../utils/currencies'
import CurrencyList from '../components/CurrencyList';
import ConvertedTable from '../components/ConvertedTable';

class ConversionList extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      currency: 'USD',
      amount: 1,
      rates: [],
      loading: true
    }
  }

  componentDidMount() {
    this.setCurrencies(this.state.currencies);
    this.getRates(this.state.currency, this.state.amount);
  }

  setCurrencies() {
    this.setState({ currencies, loading: false })
  }

  changeCurrency = (event) => {
    this.setState({ currency: event.target.value });
    this.getRates(event.target.value, this.state.amount)
  }

  changeAmount = (event) => {
    if (event.target.value > 0 && isNaN(event.target.value) === false) {
      this.setState({ amount: event.target.value })
      this.getRates(this.state.currency, event.target.value)
    }
    else {
      this.setState({ amount: 1 })
      this.getRates(this.state.currency, 1)
      document.getElementById('baseAmountInput').value = this.amount;
    }
  }

  clearForm = (event) => {
    document.getElementById('baseAmountInput').value = '';
  }

  getRates = (currency, amount) => {
    this.setState({ loading: true });
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        const keys = [];
        for (let key in data.rates) {
          if (data.rates.hasOwnProperty(key)) keys.push(key);
        }

        const currencyRates = Object.keys(data.rates)
          .filter(abrv => abrv !== currency)
          .map((ratesEntry, i) => ({
            rate: data.rates[ratesEntry],
            abr: keys[i],
          }))
          
        this.setState({ rates: currencyRates, loading: false })
      })
      .catch((error) => {
        this.setState({ error: error.message })
      })
  }

  render() {
    const { currencies, currency, amount, rates, loading } = this.state;
    return (
      <>
        <div id='baseCurrency' className='box'>
          <h2>Base Currency</h2>
          <form>
            <select value={currency} onChange={this.changeCurrency} disabled={loading}>
              <CurrencyList currencies={currencies} currency={currency} />
            </select>
          </form>
        </div>

        <div id='baseAmount' className='box'>
          <h2>Base Amount</h2>
          <input id='baseAmountInput' type='number' value={amount} onClick={this.clearForm} onChange={this.changeAmount} min='0' disabled={loading} />
        </div>
        
        <div id='convertedTable' className='box'>
          <ConvertedTable rates={rates} base={currency} />
        </div>
      </>
    );
  }
}

export default ConversionList;
