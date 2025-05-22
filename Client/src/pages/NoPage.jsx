import './App.css'

const NoPage = () => {
  // Just an ERROR 404 landing page so that users can still return to '/' through the header
  return (
    <div className='no-page'>
        <div className='no-page-content'>
            ERROR 404: Page not found
        </div>
    </div>
  )
}

export default NoPage