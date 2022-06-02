import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { Link } from "react-router-dom";


export default function Sidebar(){
    return(
    <Menu>
        <Link id="lottery" className="menu-item" to="/lottery"> Lottery</Link>
        <Link id="sale" className="menu-item" to="/sale"> Sale</Link>

      </Menu>
    );
}