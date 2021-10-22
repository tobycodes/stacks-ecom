import axios from "axios";

const API_URL = "https://fakestoreapi.com";

const productService = {
  async products() {
    const { data } = await axios.get(`${API_URL}/products`);

    return data
      ? data.map((p) => ({ ...p, price: +(p.price / 1000).toFixed(3) }))
      : [];
  },

  async productsByCategory({ name }) {
    const { data } = await axios.get(`${API_URL}/products/category/${name}`);

    return data
      ? data.map((p) => ({ ...p, price: +(p.price / 1000).toFixed(3) }))
      : [];
  },

  async getProduct(id) {
    let product = {};
    const { data } = await axios.get(`${API_URL}/products/${id}`);

    if (Object.keys(data).length > 1) {
      product = { ...data, price: +(data.price / 1000).toFixed(3) };
    }

    return product;
  },
};

export default productService;
