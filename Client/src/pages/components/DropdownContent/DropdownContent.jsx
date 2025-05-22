import { forwardRef } from 'react'
import './DropdownContent.css'

const DropdownContent = forwardRef((props, ref) => {
    const {children, open, top, setOpen} = props;

    const clicked = () => {
        setOpen(false);
    }

  return (
    <div
        ref={ref}
        className={`dropdown-content ${open ? 'content-open' : null}`}
        style={{top: top ? `${top}px` : "100%"}}
        onClick={clicked}
    >
        {children}
    </div>
  )
});

export default DropdownContent