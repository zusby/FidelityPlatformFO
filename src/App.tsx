import Protected from './components/Auth/Protected';
import { StoreModal } from './components/Modals/store-modal';


function App() {








  return (

    <>
      <Protected>
        <StoreModal />
      </Protected>
    </>
  )
}


export default App
