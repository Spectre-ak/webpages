const main_site_url = "https://spectre-ak.github.io/webpages/";

function Sidebar() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>GSoC 2022 INCF The Virtual Brain</h3>
            </div>

            <ul className="list-unstyled components">
                <li>
                    <a href="#project-description">Project Description</a>
                </li>
                <li>
                    <a href="#update-bids-importer">Milestone 1</a>
                </li>
                <li>
                    <a href="#bids-data-builder">Milestone 2</a>
                </li>
                <li>
                    <a href="#bids-dir-watcher">Milestone 3</a>
                </li>
                <li>
                    <a href="#testing">Milestone 4</a>
                </li>
                <li>
                    <a href="#code-packaging">Milestone 5</a>
                </li>
                <li>
                    <a href="#links">PR & Links</a>
                </li>
            </ul>

            <ul className="list-unstyled CTAs">
                <li>
                    <a href="https://summerofcode.withgoogle.com/proposals/details/J3oUaKEq" className="download">GSoC project page</a>
                </li>
                <li>
                    <a href="https://github.com/the-virtual-brain/tvb-root/pull/589" className="article">the-virtual-brain/tvb-root</a>
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
                <h4 onClick={() => window.location.href = main_site_url} style={{ cursor: "pointer", paddingLeft: "0.6em"}}>TVB Data Importer</h4>
                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-align-justify"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="https://github.com/Spectre-ak">Github</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.linkedin.com/in/akash-upadhyay-a565271ba/">Linkedin</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="mailto:upadhyayakash2002@gmail.com">Email</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/Spectre-ak/webpages">Source</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export { Sidebar, TopNavbar };
