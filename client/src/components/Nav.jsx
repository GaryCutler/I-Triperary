export default function Nav() {
  const linkStyle = { border: '1px black', padding: '5px' };

  return (
    <nav className="main-header-menu">
      <section>
        <div style={linkStyle}>
          <a href="#">Home</a>
        </div>
        <div style={linkStyle}>
          <a href="#">Login</a>
        </div>
        <div style={linkStyle}>
          <a href="#">Register</a>
        </div>
        
      </section>
    </nav>
  );
}
