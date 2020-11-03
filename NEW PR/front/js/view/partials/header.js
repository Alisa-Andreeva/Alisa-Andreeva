import Component from "../component.js";


class Header extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`
                 <header class="header">                    
                     <a class="header__link ${!resource ? 'active' : ''}" href="/#/">
                         Home
                     </a>
                     <a class="header__link ${resource === 'search' ? 'active' : ''}" href="/#/search">
                         Search Receipts
                     </a>
                     <a class="header__link ${resource === 'receipt' ? 'active' : ''}" href="/#/receipt">
                         Food Book
                     </a>                                            
                </header>
            `);
        });
    }
}

export default Header;