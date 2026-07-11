import './LoginPage.css'

function LoginPage() {
  return (
    <section className="login-shell">
      <div className="login-overlay">
        <div className="login-panel p-4">
          <img
            src="/logo/darzidesk-logo.png"
            alt="DarziDesk logo"
            className="login-logo-full mb-3" 
          />
        </div>
      </div>
    </section>
  )
}

export default LoginPage
