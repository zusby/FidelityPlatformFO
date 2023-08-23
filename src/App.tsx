import Protected from './components/Auth/Protected';
import { StoreModal } from './components/Modals/store-modal';
import { Button } from './components/ui/button';
import { Auth } from './lib/FireBase';


function App() {

  function handleLogout(){
    try {
      Auth.signOut()
    } catch (error) {
      console.log(error)
    }
    

  }

  


  return (

    <>
      <Protected>
        <div> 
          <Button className="w-full flex"  onClick={handleLogout}>
            Logout
          </Button>
          <StoreModal/>
        </div>            
      </Protected>
    </>
  )
}


export default App
