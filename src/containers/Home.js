import React, { Component } from 'react';
import { checkStatus, json } from '../utils/utils';
import currencies from '../utils/currencies'
import BaseCurrency from '../components/BaseCurrency';
import ConvertedTable from '../components/ConvertedTable';

class Home extends Component {
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
    this.setState({ amount: event.target.value })
    this.getRates(this.state.currency, event.target.value)
  }

  getRates = (currency, amount) => {
    this.setState({ loading: true });
    fetch(`http://api.frankfurter.app/latest?amount=${amount}&from=${currency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const currencyRates = Object.keys(data.rates)
          .map((ratesEntry, i) => ({
            rate: data.rates[ratesEntry],
            name: currencies[i]
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
        <div id='baseCurrency'>
          <h2>Base Currency</h2>
          <form>
            <select className='base-currency-form' value={currency} onChange={this.changeCurrency} disabled={loading}>
              <BaseCurrency currencies={currencies} currency={currency} />
            </select>
          </form>
        </div>

        <div id='baseAmount'>
          <h2>Base Amount</h2>
          <input type='number' value={amount} onChange={this.changeAmount} min='0' disabled={loading} />
        </div>
        
        <div id='convertedTable'>
          <ConvertedTable rates={rates} />
        </div>
      </>
    );
  }
}

export default Home;
