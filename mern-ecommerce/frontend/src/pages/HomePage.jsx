import React, { useEffect } from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductList } from '../features/products/components/ProductList'
import { resetAddressStatus, selectAddressStatus } from '../features/address/AddressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Footer } from '../features/footer/Footer'
import { selectLoggedInUser } from '../features/auth/AuthSlice'
import { Button, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {

  const dispatch = useDispatch()
  const addressStatus = useSelector(selectAddressStatus)
  const loggedInUser = useSelector(selectLoggedInUser)
  const navigate = useNavigate()

  useEffect(()=>{
    if(addressStatus==='fulfilled'){
      dispatch(resetAddressStatus())
    }
  },[addressStatus])

  return (
    <>
    <Navbar isProductList={true}/>

    {loggedInUser?.role === 'admin' && (
      <Stack direction="row" justifyContent="flex-end" sx={{ position: 'sticky', top: 70, zIndex: 10, pr: 2, pt: 1 }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/add-product')}
        >
          Add Product
        </Button>
      </Stack>
    )}

    <ProductList/>
    <Footer/>
    </>
  )
}

