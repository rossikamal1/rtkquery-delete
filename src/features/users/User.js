import React from 'react'
import {
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
} from '../api/apiSlice'

const UserCard = ({ content }) => {
  const [deleteUser, response] = useDeleteUserMutation()
  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch" key={content.id}>
      <div className="card alert alert-secondary">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{content.firstname}</h5>
          <p className="card-text">{content.lastname}</p>
          <p className="card-text">{content.email}</p>
          
          <button
            onClick={() => deleteUser(content.id)}
            class="btn btn-outline-danger"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

function User() {
  let formSubmitError
  const [addNewUser, response] = useAddNewUserMutation()

  const [userForm, setUserForm] = React.useState('Submit')

  const onSubmit = (e) => {
    e.preventDefault()
    const { title, body } = e.target.elements
    let formData = {
      title: title.value,
      body: body.value,
    }

    addNewUser(formData)
      .unwrap()
      .then(() => {})
      .then((error) => {
        console.log(error)
      })
  }

  const {
    data: users,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetUsersQuery({ refetchOnMountOrArgChange: true })

  let userContent

  if (isGetLoading) {
    userContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isGetSuccess) {
    userContent = users.map((item) => {
      return <UserCard content={item} key={item.id} />
    })
  } else if (isGetError) {
    userContent = (
      <div className="alert alert-danger" role="alert">
        {getError}
      </div>
    )
  }

  return (
    <div className="row">
      {formSubmitError}

      <div className="col-md-4 offset-md-*">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Firstname</strong>
            </label>
            <input type="text" className="form-control" id="firstname" />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Lastname</strong>
            </label>
            <textarea className="form-control" id="lastname" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Email</strong>
            </label>
            <textarea className="form-control" id="email" rows="3"></textarea>
          </div>
         
          <div className="d-grid">
            <button className="btn btn-success" type="submit">
              {userForm}
            </button>
          </div>
        </form>
      </div>

      <div className="col-lg-8">
        <div className="row">{userContent}</div>
      </div>
    </div>
  )
}

export default User
