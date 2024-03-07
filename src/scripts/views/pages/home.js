import RestaurantDataSource from '../../data/restaurant-data';
import createRestaurantItem from '../templates/template-creator';
import hero from '../../../public/images/heros/hero-image_2.jpg';

const Home = {
  async render() {
    return `
    <section class="hero-element">
        <div class="darker-img"></div>
        <img src="${hero}" id=hero alt="" />
        <div class="hero-caption">
            <p class="caption">Eksklusif, fusion makanan Nusantara<br>dengan nuansa modern dan cita rasa istimewa</p>
        </div>
    </section>
    <section class="rest-element">
      <div class="rest-head">
          <h2>Rumah Makan Kami</h2>
          <p>Nikmati sajian eksklusif Nusantara modern di seluruh Indonesia</p>
      </div>
      <loading-circle></loading-circle>
      <div class="rest-list" id="main-content"></div>
    </section>
      `;
  },

  async afterRender() {
    this.handleCaption();

    const restaurantContainer = document.querySelector('.rest-list');
    const loadElement = document.querySelector('.loader-wrapper');

    const restaurants = await RestaurantDataSource.ListRestaurant();
    loadElement.classList.add('display-none');

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItem(restaurant);
    });
  },

  handleCaption() {
    const caption = document.querySelector('.hero-caption .caption');
    const windowWidth = window.innerWidth;
    if (windowWidth < 576 && caption) {
      caption.innerHTML = caption.innerHTML.replace('<br>', ' ');
    }
  },

};

export default Home;
