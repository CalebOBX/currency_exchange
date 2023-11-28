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
      altAmount: 0,
      altCurrency: 'EUR',
      currencies: [],
      rate: 0,
      loading: false
    }
  }

  componentDidMount() {
    const { baseCurrency, altCurrency } = this.state;
    this.setCurrencies(this.state.currencies);
    this.getRates(baseCurrency, altCurrency)
  }

  setCurrencies() {
    this.setState({ currencies, loading: false });
  }

  getRates(base, alt) {
    this.setState({ loading: true });
    fetch(`http://api.frankfurter.app/latest?from=${base}&to=${alt}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const rate = data.rates[alt];
        this.setState({
          rate,
          baseAmount: 1,
          altAmount: Number((1 * rate).toFixed(6)),
          loading: false
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      })
  }

  toBase(amount, rate) {
    return amount * (1 / rate);
  }

  toAlt(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(6);
  }

  changeBaseCurrency = (event) => {
    const baseCurrency = event.target.value;
    if (baseCurrency !== this.state.altCurrency) {
      this.setState({ baseCurrency });
      this.getRates(baseCurrency, this.state.altCurrency);
    }
  }

  changeBaseAmount = (event) => {
    const altAmount = this.convert(event.target.value, this.state.rate, this.toAlt)
    this.setState({
      baseAmount: event.target.value,
      altAmount
    })
  }

  changeAltCurrency = (event) => {
    const altCurrency = event.target.value;
    if (altCurrency !== this.state.baseCurrency) {
      this.setState({ altCurrency });
      this.getRates(this.state.baseCurrency, altCurrency);
    }
  }

  changeAltAmount = (event) => {
    const baseAmount = this.convert(event.target.value, this.state.rate, this.toBase)
    this.setState({ 
      altAmount: event.target.value,
      baseAmount
     });
  }

  render() {
    const { baseAmount, baseCurrency, altAmount, altCurrency, currencies, loading } = this.state;
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
            <select value={altCurrency} onChange={this.changeAltCurrency} disabled={loading}>
              <CurrencyList currencies={currencies} currency={altCurrency} />
            </select>
          </form>
          <input type='number' value={altAmount} onChange={this.changeAltAmount} min='0' disabled={loading} />
        </div>     
      </>
    )
  }
}

export default ConversionSwapper;