import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import brand from 'dan-api/dummy/brand'
import { RegisterForm } from 'dan-components'
import styles from 'dan-components/Forms/user-jss'
import axios from 'axios'
import { getCookie, setCookie } from 'dan-api/cookie'
import { URL, IMGURL } from 'dan-api/url'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register(props) {
  const [valueForm, setValueForm] = useState(null)
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile_number: '',
    register_as: '',
  })
  const handleChange = (name) => (event) => {
    // alert('working')
    setData({
      ...data,
      [name]: event.target.value,
    })
  }

  const submit = (values) => {
    // alert('working')
    console.log(data)
    axios({
      method: 'POST',
      url: URL + 'WebRegisterSubmit',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        if (res.data.status == 100) {
          toast.warn(res.data.message)
        } else {
          toast.success(res.data.message)
        }
      })

      .catch((err) => {
        toast.error('Something Went Wrong!')
        // console.log(err);
      })
  }

  const title = brand.name + ' - Register'
  const description = brand.desc
  const { classes } = props
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
      </Helmet>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <RegisterForm
            {...data}
            handleChange={handleChange}
            onSubmit={submit}
          />
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Register)
