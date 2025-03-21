import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Async thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    brand,
    color,
    material,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    category,
    search,
    limit,
  }) => {
    const query = new URLSearchParams();

    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (brand) query.append("brand", brand);
    if (color) query.append("color", color);
    if (material) query.append("material", material);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (category) query.append("category", category);
    if (search) query.append("search", search);
    if (sortBy) query.append("sortBy", sortBy);
    if (limit) query.append("limit", limit);

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

//Async thunk to fetch single products by id
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);
//Async thunk to fetch update Products
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

//Async thunk to fetch Similar Products
export const similarProducts = createAsyncThunk(
  "products/similarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProducts: null, //store the details of the single product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      brand: "",
      gender: "",
      material: "",
      collection: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      sort: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        brand: "",
        gender: "",
        material: "",
        collection: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        sort: "",
      };
    },
  },
  extraReducers: (builder) => {
    //handle fetching products with filter
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        (state.loading = false),
          (state.products = Array.isArray(action.payload)
            ? action.payload
            : []),
          (state.error = null);
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      //handle fetching single products details
      .addCase(fetchProductDetails.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        (state.loading = false), (state.selectedProducts = action.payload);
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      //handle fetching update products
      .addCase(updateProduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updateProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      //handle fetching similar products
      .addCase(similarProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(similarProducts.fulfilled, (state, action) => {
        (state.loading = false), (state.products = action.payload);
      })
      .addCase(similarProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
