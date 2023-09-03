import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface ErrorPageProps{
  errorTitle:string,
    errorMessage:string
}

 const ErrorPage:React.FC<ErrorPageProps>=({
     errorTitle,
    errorMessage
  
}) =>{

  const navigate = useNavigate()
  function navigateHome(){
    navigate("/");
  }
    
  return (
    <div className="align-middle justify-center flex">
    <section className="bg-white  ">
    <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
            <p className="text-sm font-medium text-blue-500 "><strong>404 error :\</strong></p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-800 dark:text-white md:text-3xl">{errorTitle}</h1>
            <p className="mt-4 text-slate-500 dark:text-gray-400">{errorMessage}</p>

            <div className="flex items-center mt-6 gap-x-3">
              <Button onClick={navigateHome}>Go home</Button>



            </div>
        </div>
    </div>
</section>
</div>
  );
}

export default ErrorPage
