const API_BASE_URL = "http://localhost:3001/api";
const token = localStorage.getItem("token");

const getData = async (url, token) => {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const data = await result.json();
  return data;
};

const postData = async (url, data, token) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.error("Error:", error);
    });
};

const putData = async (url, token) => {
  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.error("Error:", error);
    });
};

const deleteData = async (url, token) => {
  return await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addToCart = async (productId) => {
  const ENDPOINT = `${API_BASE_URL}/carts`;
  const data = {
    productId,
    quantity: 0,
  };
  const response = await postData(ENDPOINT, data, token);
  alert(response);
  window.location.reload();
};

const removeOneProduct = async (itemId) => {
  const ENDPOINT = `${API_BASE_URL}/carts/${itemId}`;
  const response = await putData(ENDPOINT, token);
  if (response.success) {
    alert("Producto eliminado correctamente.");
    window.location.reload();
  } else {
    alert("Error al eliminar el producto.");
  }
};

const removeAllOfOneProduct = async (itemId) => {
    const ENDPOINT = `${API_BASE_URL}/carts/${itemId}`;
    const response = await  deleteData(ENDPOINT, token);
    alert(response)
    window.location.reload();
};

const clearCart = async (cartId) => {
    const ENDPOINT = `${API_BASE_URL}/carts/clear/${cartId}`;
    const response = await  deleteData(ENDPOINT, token);
    alert(response)
    window.location.reload();
};