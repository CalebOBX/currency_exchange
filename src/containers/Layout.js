import { Outlet, Link } from 'react-router-dom';

const Layout = (props) => {
  return (
    <>
      <header>
        <h1>Another Currency Converter App</h1>
        <p>Generate a list of currency conversions or convert between pairs.</p>
      </header>
      <nav>
        <ul>
          <li>
            <Link className='react-link' to='/'>Conversion List</Link>
          </li>
          <li>
            <Link className='react-link' to='/conversion-swapper'>Conversion Swapper</Link>
          </li>
        </ul>
      </nav>
      <div id='main'>
        <Outlet />
      </div>
      <footer>
        <p>Created using the <a href='https://www.frankfurter.app/'>Frankfurter API</a>.</p>
        <p><a href='https://github.com/SkoomaKing/currency_exchange'>view on github</a></p>
      </footer>
    </>
  )
}

export default Layout;