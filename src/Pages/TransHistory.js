import React, {useState, useEffect} from 'react';
import { Table, Button } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import { API_URL } from '../Support/API_URL';
import Axios from 'axios';
import Swal from 'sweetalert2'

const TransHistory = () => {
    const [data, setData] = useState([])

    const id = useSelector((state) => state.auth.id);

    useEffect (() => {
        if(id){
            Axios.get(`${API_URL}/users/fetchTransHistory/${id}`)
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))
        }
    }, [id])

    const showDetail = (products, totalPrice, date) => {
      let innerHtml = `<strong><p>Pembelian pada tanggal: ${date}</p></strong><hr />`
      products.forEach((val) => {
          innerHtml += `${val.image.map((e) => {
            return(
            `
            <img width='30%' src='${e.imagePath}' alt='foto'/>
            `
            )
            
          })}
          <h5>${val.productName}</h5>
          <p>Quantity: ${val.qty} (@ Rp.${val.price.toLocaleString()})</p>
          <p>Subtotal: Rp. ${(val.qty * val.price).toLocaleString()}</p>
          <hr/>
          `
      })
      innerHtml += `<strong>Grand Total: Rp. ${totalPrice.toLocaleString()}</strong>`
      Swal.fire({
          html: innerHtml
      })
  }

    const renderTransaction = () => {
      return data.map(val => {
          return (
              <React.Fragment key={val.id}>
                  <tr className="table-success" key={val.id}>
                      <td colSpan='4'>{val.date}</td>
                      <td>Rp. {val.totalPrice.toLocaleString()}</td>
                  </tr>
                  <tr>
                      <td colSpan='5'>
                          <Button className='float-right' color='primary' onClick={() => showDetail(val.products, val.totalPrice, val.date)}>
                              Click For Details 
                              ({val.products.length} {val.products.length > 1 ? 'items' : 'item'})
                          </Button>
                      </td>
                  </tr>
              </React.Fragment>
          )
      })
   }



  return (
    <div>

    {
      data.length === 0
      ?
      <h1 style={{'textAlign' : 'center'}}>You don't have any transaction history.</h1>
      :
      <div>
                <h1>Halaman Transaction</h1>
                <Table style={{'width': '75%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                    <thead>
                        <tr>
                            <th colSpan='4'>Tanggal</th>
                            <th>Total Belanja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTransaction()}
                    </tbody>
                </Table>
            </div>
    }
    </div>
    
    
  );
}


export default TransHistory;