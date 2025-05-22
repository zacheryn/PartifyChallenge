import './DropdownItem.css'

const DropdownItem = ({children, setButton}) => {
    const setItemButton = () => {
        setButton(children);
    }

  return (
    <div className='dropdown-item' onClick={setItemButton}>
        {children}
    </div>
  )
}

export default DropdownItem