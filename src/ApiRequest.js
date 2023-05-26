import { useEffect } from 'react';
function ApiComponent(){
    var variabile;
    useEffect(() => {
        fetchData(variabile);
    },[]);


async function fetchData(variabile) {
    
    try{
        variabile = await fetch('http://localhost:8080/api/v1/customer/all').then((response)=> response.json()).then((data)=> data);
        console.log(variabile);
    }
    catch (error) {
        console.error("Si e' verificato un errore con la chiamata api:", error);
    }
}


    return <tr>
    <td class="pl-4">1</td>
    <td>
        <h5 class="font-medium mb-0">Daniel Kristeen</h5>
        <span class="text-muted">Texas, Unitedd states</span>
    </td>
    <td>
        <span class="text-muted">Visual Designer</span><br></br>
        <span class="text-muted">Past : teacher</span>
    </td>
    <td>
        <span class="text-muted"></span><br></br>
        <span class="text-muted">999 - 444 - 555</span>
    </td>
    <td>
        <span class="text-muted">15 Mar 1988</span><br></br>
        <span class="text-muted">10: 55 AM</span>
    </td>
    <td>
      <select class="form-control category-select" id="exampleFormControlSelect1">
        <option>Modulator</option>
        <option>Admin</option>
        <option>User</option>
        <option>Subscriber</option>
      </select>
    </td>
    <td>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle"><i class="fa fa-key"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i class="fa fa-trash"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i class="fa fa-edit"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i class="fa fa-upload"></i> </button>
    </td>
  </tr>;

}

export default ApiComponent;

