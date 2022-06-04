import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { Link } from "react-router-dom";


export default function Sidebar(){
    return(
    <Menu>
        <Link id="home" className="menu-item" to="/"> Home</Link>
        <Link id="lottery" className="menu-item" to="/lottery"> Lottery Operations</Link>
        <Link id="sale" className="menu-item" to="/sale"> Sale Operations</Link>
        <Link id="ticket" className="menu-item" to="/ticket"> Ticket Operations</Link>
        <Link id="win" className="menu-item" to="/win"> Win Operations</Link>
      </Menu>
    );
}