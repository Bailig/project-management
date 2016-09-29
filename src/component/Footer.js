import React from 'react';

export default class Footer extends React.Component{
    render() {
        return (
            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3">
                            <p>©2016 Bailig Abhanar</p>
                        </div>
                        <div className="col-sm-9">
                           <nav className="navbar navbar-default navbar-right" role="navigation">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a className="navbar-link" href="#" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="navbar-link" href="#" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="navbar-link" href="#" target="_blank"></a>
                                    </li>
                                    <li>
                                        <a className="navbar-link" href="#" target="_blank"></a>
                                    </li>
                                </ul>
                            </nav>
                       </div>
                    </div>
                </div>
            </footer>
        );
    }
}