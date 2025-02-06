import axios from "axios";

export const createOrder = async (object) => {
  let data = JSON.stringify(object);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://shiribiswas.up.railway.app/api/Order/CreateOrder",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return { success: true, response };
  } catch (error) {
    console.error(error);
    return { success: false, response: error };
  }
};
