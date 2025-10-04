import React, {useState} from 'react';
import axios from 'axios';

const User= ()=>{
    const [User, setUser] = useState([]);

    const getUser = ()=>{
        //call GET http://localhost:3008/api/users
 axios.get('http://localhost:3001/api/users')
 .then(response =>{
console.log(response.data);
//render
setUser(response.data);
 })
 .catch(error =>{
    console.log(error);
 });
    };
    return(
        <div> 
            <button onClick={()=>getUser()}>Get User</button>   
            <div>
                
                <table> 
                    <tr>
                        <th >Mobile</th>
                        <th > Password </th>
                        <th > Name </th>
                        <th > Middle_name </th>
                        <th > Last_name</th>
                        <th > Gender </th>
                        <th > Salary </th>
                        <th > Date </th>
                        <th > Dept </th>


                    </tr>
                 {User.map((item, index)=>(
               <tr key={index}>
                 <td >{item.user_mobile} </td> 
                 <td >{item.user_password} </td>
                 <td >{item.user_name} </td>
                 <td >{item.user_middle_name} </td>
                 <td >{item.user_last_name} </td>
                 <td >{item.user_gender} </td>
                 <td >{item.user_salary} </td>
                 <td >{item.user_date} </td>
                 <td >{item.user_dept} </td>


                 </tr> 
           ) )}
         
         </table>


            </div>
        </div>
    );
}
       
    



export default User;