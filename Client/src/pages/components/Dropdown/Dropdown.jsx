import './Dropdown.css'
import DropdownButton from '../DropdownButton/DropdownButton'
import DropdownContent from '../DropdownContent/DropdownContent'
import { useState, useEffect, useRef } from 'react'

const Dropdown = ({buttonText, content, enabled}) => {
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

  const dropdownRef = useRef();
  const buttonRef = useRef();
  const contentRef = useRef();

  // Handles opening and closing the dropdown
  const toggleDropdown = () => {
    if(!open){
      const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.contentHeight;

      const topPosition = spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;

      setDropdownTop(topPosition);
    }

    setOpen((open) => !open);
  }

  // Allows the dropdown to be closed by clicking outside of it
  useEffect(() => {
    const handler = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setOpen(false);
      }
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef])

  return (
    <div className='dropdown' ref = {dropdownRef}>
      <DropdownButton ref={buttonRef} toggle={toggleDropdown} open={open} enabled={enabled}>
        {buttonText}
      </DropdownButton>
      <DropdownContent top={dropdownTop} ref={contentRef} open={open} setOpen={setOpen}>
        {content}
      </DropdownContent>
    </div>
  )
}

export default Dropdown