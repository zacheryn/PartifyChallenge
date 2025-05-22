import { forwardRef } from 'react'
import './DropdownButton.css'
import {FaChevronDown, FaChevronUp} from 'react-icons/fa'

const DropdownButton = forwardRef((props, ref) => {
    const {children, toggle, open, enabled} = props;
  return (
    <div ref={ref} onClick={toggle} className={`dropdown-btn ${open ? 'button-open' : null} ${enabled ? 'enabled' : 'disabled'}`}>
        {children}
        <span className='toggle-icon'>
            {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
    </div>
  )
});

export default DropdownButton