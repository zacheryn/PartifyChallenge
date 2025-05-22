import { Link } from "react-router-dom"
import './SearchButton.css'

const SearchButton = ({year, make, model, enabled}) => {
  return (
    <Link
      to="collections"
      state={{
        year: year,
        make: make,
        model: model
      }}
      className={`${enabled ? 'enabled' : 'disabled'}`}
    >
        <button type='button' className="search-btn">
            Search
        </button>
    </Link>
  )
}

export default SearchButton