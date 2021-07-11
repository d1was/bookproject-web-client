import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import registerLogo from '../assets/images/register-logo.jpg'

const Register = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .min(10, 'Name must be at least 10 characters')
      .max(200, 'Name is too Long!')
      .required('Name is required'),
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is Required'),
    password: Yup.string()
      .matches(
        /^([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*$/,
        'Password must contain letter and number'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),

    phoneNumber: Yup.string()
      .length(10, 'Phone number must be at least 10 characters')
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone Number is Required'),
    profilePicture: Yup.mixed()
      .required('Profile picture is required')
      .test(
        'FILE_SIZE',
        'Uploaded file must be less than or equal to 2MB',
        (value) => value && value.size <= 2097152
      )
      .test(
        'FILE_FORMAT',
        'Uploaded file has unsupported format.',
        (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
      ),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: '',
      phoneNumber: '',
    },
    validationSchema: UserSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <>
      <section className='register container'>
        <div className='row justify-content-center '>
          <div className='col-sm-12 col-lg-12'>
            <div className='register__header'>
              <h2>Member Sign Up</h2>
              <p>
                Enjoy access to bestselling book summaries and premium content
                from our partners, all available in 15-minute audio or text
                segments.
              </p>
            </div>
            <div className='register__form'>
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className='form-group'>
                  <label htmlFor='name' className='form-label'>
                    Name
                  </label>
                  <input
                    type='text'
                    className={
                      formik.touched.name && formik.errors.name
                        ? 'is-invalid form-control-lg form-control'
                        : 'form-control-lg form-control'
                    }
                    name='name'
                    placeholder='Enter your name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className='invalid-feedback'>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className='form-group'>
                  <label htmlFor='email' className='form-label'>
                    Email address
                  </label>
                  <input
                    type='email'
                    className={
                      (formik.touched.email && formik.errors.email
                        ? 'is-invalid'
                        : '') + ' form-control-lg form-control'
                    }
                    placeholder='Enter your email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className='invalid-feedback'>
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className='form-group'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    className={
                      (formik.touched.password && formik.errors.password
                        ? 'is-invalid'
                        : '') + ' form-control-lg form-control'
                    }
                    placeholder='Enter your password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className='invalid-feedback'>
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className='form-group'>
                  <label htmlFor='confirm_password' className='form-label'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    className={
                      (formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? 'is-invalid'
                        : '') + ' form-control-lg form-control'
                    }
                    placeholder='Confirm your password'
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className='invalid-feedback'>
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
                <div className='form-group'>
                  <label htmlFor='phone' className='form-label'>
                    Phone number
                  </label>
                  <input
                    type='number'
                    name='phoneNumber'
                    className={
                      (formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? 'is-invalid'
                        : '') + ' form-control-lg form-control'
                    }
                    placeholder='Enter your phone number'
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className='invalid-feedback'>
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>
                <div className='form-group'>
                  <label htmlFor='profilePicture' className='form-label'>
                    Upload your profile picture
                  </label>
                  <input
                    className={
                      (formik.touched.profilePicture &&
                      formik.errors.profilePicture
                        ? 'is-invalid'
                        : '') + ' form-control-lg form-control'
                    }
                    id='profilePicture'
                    type='file'
                    name='profilePicture'
                    onChange={(event) => {
                      formik.setFieldValue(
                        'profilePicture',
                        event.currentTarget.files[0]
                      )
                    }}
                  />
                  {formik.touched.profilePicture &&
                  formik.errors.profilePicture ? (
                    <div className='invalid-feedback'>
                      {formik.errors.profilePicture}
                    </div>
                  ) : null}
                </div>
                {formik.values.profilePicture && !formik.errors.profilePicture && (
                  <div className='form-group'>
                    <Image
                      loader={() =>
                        URL.createObjectURL(formik.values?.profilePicture)
                      }
                      src={URL.createObjectURL(formik.values?.profilePicture)}
                      width={100}
                      height={100}
                      alt='Your new profile picture'
                      className='profile__image'
                    />
                  </div>
                )}
                <div className='form-group'>
                  <button
                    type='submit'
                    className='btn btn-primary w-100 h-100 '
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <div className='col-sm-12 col-md-6'>
            <Image src={registerLogo} width={'100%'} height={'100%'} alt='' />
          </div> */}
        </div>
      </section>
    </>
  )
}

export default Register
