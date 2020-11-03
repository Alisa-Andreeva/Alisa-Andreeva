import Component from "../component.js";

class Home extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <img class="content-container-imgHome" src="styles/img/img-fruit-bowl.webp">
                <div class="about"> 
                    <h1 class="page-title">Welcome!</h1>                   
                    <p class="about__info">It's a FoodBook<br>You can find a recipe and write it down<br>Enjoy!</p>
                    <a class="about__btn-start button" href="#/search" title="Click here to get started!">Start using</a>
                </div>
                <img class="about__imageFood" alt="imageFood" src="../../../styles/img/6921bc706e0322e3fc23becad1cade6c--buckwheat-waffles-instagram-ideas.png">
            `);
        });
    }
}

export default Home;