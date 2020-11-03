import {parseRequestURL} from "./helpers/utils.js";
import Error404 from "./view/pages/page404.js";
import Header from "./view/partials/header.js";
import Footer from "./view/partials/footer.js";
import Home from "./view/pages/home.js";
import Search from "./view/pages/foodbook/search.js";
import FoodBook from "./view/pages/foodbook/foodBook.js";
import Info from "./view/pages/foodbook/Info.js";
import Edit from "./view/pages/foodbook/edit.js";


const Routes = {
    '/': Home,
    '/search': Search,
    '/receipt': FoodBook,
    '/receipt/:idMeal': Info,
    '/receipt/:idMeal/edit': Edit
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        header = new Header(),
        footer = new Footer();

    header.render().then(html => headerContainer.innerHTML = html);

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:idMeal' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });

    footer.render().then(html => footerContainer.innerHTML = html);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);