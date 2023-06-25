
import React, { useState, useEffect } from 'react';

const Alex = () => {
   const [posts, setPosts] = useState([]);
   useEffect(() => {
      fetch('http://localhost:8080/api/v1/customer/all')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })()
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

return (
   <div> ALEEX</div>
);
};

export default Alex;
