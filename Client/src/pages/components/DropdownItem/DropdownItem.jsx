import './DropdownItem.css'

const DropdownItem = ({children, setButton}) => {
    // When you select an item from the dropdown, this propagates that value up to Home
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