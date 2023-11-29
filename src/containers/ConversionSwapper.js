import React, { Component } from 'react';
import Chart from 'chart.js/auto';
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

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { baseCurrency, altCurrency } = this.state;
    this.setCurrencies(this.state.currencies);
    this.getRates(baseCurrency, altCurrency)
    this.getHistoricalRates(baseCurrency, altCurrency);
  }

  setCurrencies() {
    this.setState({ currencies, loading: false });
  }

  getRates(base, alt) {
    this.setState({ loading: true });
    fetch(`https://api.frankfurter.app/latest?from=${base}&to=${alt}`)
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

  getHistoricalRates = (base, alt) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${alt}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[alt]);
        const chartLabel = `${base}/${alt}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }
  
  buildChart = (labels, data, label) => {

    const chartRef = this.chartRef.current.getContext("2d");

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
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
      this.getHistoricalRates(baseCurrency, this.state.altCurrency);
    }
  }

  changeBaseAmount = (event) => {
    if (event.target.value > 0 && isNaN(event.target.value) === false) {  
      const altAmount = this.convert(event.target.value, this.state.rate, this.toAlt)    
      this.setState({
        baseAmount: event.target.value,
        altAmount
      })
    }
    else {
      this.setState({
        baseAmount: 0,
        altAmount: 0
      })
    }
  }

  changeAltCurrency = (event) => {
    const altCurrency = event.target.value;
    if (altCurrency !== this.state.baseCurrency) {
      this.setState({ altCurrency });
      this.getRates(this.state.baseCurrency, altCurrency);
      this.getHistoricalRates(this.state.baseCurrency, altCurrency);
    }
  }

  changeAltAmount = (event) => {
    if (event.target.value > 0 && isNaN(event.target.value) === false) {  
      const baseAmount = this.convert(event.target.value, this.state.rate, this.toBase)
      this.setState({ 
        altAmount: event.target.value,
        baseAmount
      });
    }
    else {
      this.setState({
        baseAmount: 0,
        altAmount: 0
      })
    }
  }

  clearForm = (event) => {
    document.getElementById('baseInput').value = ''
    document.getElementById('altInput').value = ''
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
          <input id='baseInput' type='number' value={baseAmount} onClick={this.clearForm} onChange={this.changeBaseAmount} min='0' disabled={loading} />
        </div>
        
        <div id='convertedSwapBox' className='box'>
          <h2>Converted Currency &amp; Amount</h2>
          <form>
            <select value={altCurrency} onChange={this.changeAltCurrency} disabled={loading}>
              <CurrencyList currencies={currencies} currency={altCurrency} />
            </select>
          </form>
          <input id='altInput' type='number' value={altAmount} onClick={this.clearForm} onChange={this.changeAltAmount} min='0' disabled={loading} />
        </div>

        <div className='box'>
          <canvas ref={this.chartRef} />
        </div>  
      </>
    )
  }
}

export default ConversionSwapper;