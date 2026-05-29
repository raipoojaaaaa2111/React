import { use, useEffect, useState } from "react";
function useCurrencInfo(currency){
    const [data,setdata] = useState({});
    useEffect(()=>{
       
        // fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
        fetch(`https://open.er-api.com/v6/latest/${currency}`)
        .then((res)=>res.json())
        .then((res)=> setdata(res[currency]));
        console.log(data)

    },[currency])
    console.log(data)
    return data;
}
export default useCurrencInfo;