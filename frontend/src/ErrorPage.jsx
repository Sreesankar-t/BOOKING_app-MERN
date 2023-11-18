import './errorpage.css'

const ErrorPage = () => {
  const goBack = () => {
    window.history.back()
  }
  return (
    <div className='error-page-wrap'>
      <article className='error-page gradient'>
        <hgroup>
          <h1>404</h1>
          <h2>oops! page not found</h2>
        </hgroup>
        <a onClick={goBack} title='Back to site' className='error-back'>
          back
        </a>
      </article>
    </div>
  )
}

export default ErrorPage
