function Sidebar() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>GSoC 2022 INCF The Virtual Brain</h3>
            </div>

            <ul className="list-unstyled components">
                <p>Dummy Heading</p>
                <li className="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a href="/">Home 1</a>
                        </li>
                        <li>
                            <a href="/">Home 2</a>
                        </li>
                        <li>
                            <a href="/">Home 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="/">About</a>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a href="/">Page 1</a>
                        </li>
                        <li>
                            <a href="/">Page 2</a>
                        </li>
                        <li>
                            <a href="/">Page 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="/">Portfolio</a>
                </li>
                <li>
                    <a href="/">Contact</a>
                </li>
            </ul>

            <ul className="list-unstyled CTAs">
                <li>
                    <a href="/" className="download">GSoC home page</a>
                </li>
                <li>
                    <a href="/" className="article">TVB Repo</a>
                </li>
            </ul>
        </nav>
    )
}

function TopNavbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                <button type="button" id="sidebarCollapse" className="btn btn-info">
                    <i className="fas fa-align-left"></i>
                    <span></span>
                </button>
                <h4>TVB Data Importer</h4>
                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-align-justify"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Github</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Linkedin</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">mail</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">src</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export { Sidebar, TopNavbar };
