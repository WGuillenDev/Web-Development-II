interface HeaderProps {
  nombre: string
}

function Header({ nombre }: HeaderProps) {
  return (
    <header className="encabezado">
      <span className="logo-libro" aria-hidden="true" />
      <h1 aria-label={nombre}>LIBRO<span>TECA</span></h1>
    </header>
  )
}

export default Header
