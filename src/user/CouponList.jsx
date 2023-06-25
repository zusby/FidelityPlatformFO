import {useEffect,useState} from "react";
import "../routes/userTable.css";
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlashCircle,Check } from "react-bootstrap-icons";
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { hide } from "@popperjs/core";
const couponsList= () => {
    const [userCoupons, setUserCoupons] = useState([]);
    const {state} = useLocation()

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
      } = usePopperTooltip();

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/coupon/"+state.id+"/coupons")
            .then(response => response.json())
            .then(json => setUserCoupons(json))
            .catch(error => console.error(error));
    }, []);

    function isAvaiable(coupon){
        if(coupon.used){
            return <SlashCircle color="red" title="The coupon is used or expired"/> 
        }
        return (
        
        <> <Check color="green" size={30} title="The coupon is available to be used"/> </>)
    }



    return userCoupons.map((coupon, index) => {
        console.log(coupon);

        return (

            <tr key = {coupon.couponId}>
                <td className="pl-4">{index+1}</td>
                <td>
                <OverlayTrigger trigger="hover" placement="top" delay={{show:"500",hide:"3000"}} overlay={<Tooltip id={coupon.couponId}>{coupon.couponId}</Tooltip>}>
                <h5 >
                    {coupon.couponId.substring(0,8)}
                    
                    </h5>
                    </OverlayTrigger>
                </td>
                <td>
                    <span>{coupon.code} </span><br></br>

                </td>
                <td>
                <span>
                    {coupon.expirationDate.split("T")[0].split("-")[2]}-{coupon.expirationDate.split("T")[0].split("-")[1]}-{coupon.expirationDate.split("T")[0].split("-")[0]} </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
                </td>
                <td>
                    <span>{isAvaiable(coupon)}</span>
                </td>
                <td>
                
                </td>
            </tr>
        );


    });
}

export default couponsList;

