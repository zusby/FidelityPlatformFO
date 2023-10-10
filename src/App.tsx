import Protected from './components/Auth/Protected';
import SetupPage from './pages/setup-page';


function App() {
  return (

    <>
      <Protected>
        <SetupPage />
      </Protected>
    </>
  )
}


export default App
