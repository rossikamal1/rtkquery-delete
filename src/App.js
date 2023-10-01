import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import User from './features/users/User'

function App() {
  return (
    <div className="container">
      <div className="d-flex border-bottom pt-2 pb-2 mb-5">
        <div className="p-2 flex-grow-1 text-center">
          <h2>RTK Query Delete</h2>
        </div>
      </div>

      <User />
    </div>
  )
}export default App
