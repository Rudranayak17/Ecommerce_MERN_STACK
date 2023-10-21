/* eslint-disable react/prop-types */
import { AccountBalance, LibraryAddCheck, LocalShipping } from "@mui/icons-material"
import { Step, StepLabel, Stepper, Typography } from "@mui/material"

import "./checkoutSteps.css";




const CheckoutSteps = ({activeStep}) => {
    const Steps=[
        {
            label:<Typography>Shipping Details</Typography>,
            icons:<LocalShipping/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icons:<LibraryAddCheck/>
        },
        {
            label:<Typography>Payment</Typography>,
            icons:<AccountBalance/>
        },

    ];
    const stepStyles={
        boxSizing: "border-box"
    }
  return (
   <>
   <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
{
    Steps.map((item,index)=>(
        <Step key={index} active={activeStep === index?true:false} completed ={activeStep >= index?true:false}>
<StepLabel style={{color:activeStep >= index?"tomato":"rgba(0,0,0,0.649)"}} icon={item.icons}>
    {item.label}
</StepLabel>
        </Step>
    ))
}
   </Stepper>
   </>
  )
}
export default CheckoutSteps