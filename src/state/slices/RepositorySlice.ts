import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type RepositoresState = {
  loading: boolean;
  error: string | undefined;
  data: string[];
};

const initialState: RepositoresState = {
  loading: false,
  error: undefined,
  data: [],
};

type NpmPackage = { package: { name: string } };
type NpmRepositoryResponse = { objects: NpmPackage[] };

export const searchRepositories = createAsyncThunk<
  string[],
  string,
  { rejectValue: Error }
>("repositories/search", async (term: string) => {
  const { data } = await axios.get<NpmRepositoryResponse>(
    "https://registry.npmjs.org/-/v1/search",
    { params: { text: term } }
  );

  return data.objects.map((result: NpmPackage) => {
    return result.package.name;
  });
});

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchRepositories.fulfilled, (state, action) => {
      return { loading: false, error: undefined, data: action.payload };
    });
    builder.addCase(searchRepositories.rejected, (state, action) => {
      let error;
      if (action.payload) {
        error = action.payload.message;
      } else {
        error = action.error.message;
      }
      return { loading: false, error, data: [] };
    });
    builder.addCase(searchRepositories.pending, () => {
      return { loading: true, error: undefined, data: [] };
    });
  },
});

export const repositoriesReducer = repositoriesSlice.reducer;
