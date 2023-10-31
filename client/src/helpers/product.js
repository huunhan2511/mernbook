// get products
export const searchByKeyword = (products, keyword) =>{
  if (keyword) {
    return products.filter(
      product => product.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  return products;
}

// get product cart quantity
export const getProductCartQty = (cartItems, product) => {
  let productInCart = cartItems.filter(
    single =>
      single._id === product._id 
  )[0];
  if (cartItems.length >= 1 && productInCart) {
      return cartItems.filter(single => product._id === single._id)[0].quantity;
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        product => product.category.name === sortValue
      );
    }
    if (sortType === "author") {
      return products.filter(
        product => product.author.name === sortValue
      );
    }
    if (sortType === "publisher") {
      return products.filter(
        product => product.publisher.name === sortValue
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

export const setActiveSort = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(elem => {
    elem.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(elem => {
    elem.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0
})