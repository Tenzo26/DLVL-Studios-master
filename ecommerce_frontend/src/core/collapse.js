import React from 'react';
import Collapsible from 'react-collapsible';
import { Link} from "react-router-dom";

const App = () => {
  return (
    <div className="divnya">
    <Collapsible className="shopmenu" transitionTime ="200"  trigger="SHOP" >
        <div className="divko">
    <Link to="/homenew">
    <p className="bestsellers">NEW ARRIVALS</p>
    </Link>
    </div>
    <div className="divko">
    <Link to="/homebest">
    <p className="newarrivals">BEST&nbsp;SELLERS</p>
    </Link>
    </div>
    <div className="divko">
    <Link to="/shop">
    <p className="newarrivals">COLLECTION&nbsp;ITEMS</p>
    </Link>
    </div>
    </Collapsible>
    </div>
  );
};

export default App;