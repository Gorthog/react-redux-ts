import axios from "axios";
import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";

type NpmPackage = { package: { name: string } };
type NpmRepositoryResponse = { objects: NpmPackage[] };

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      const { data } = await axios.get<NpmRepositoryResponse>(
        "https://registry.npmjs.org/-/v1/search",
        { params: { text: term } }
      );

      const names = data.objects.map((result: NpmPackage) => {
        return result.package.name;
      });

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err) {
      let errorMessage;
      if (err instanceof Error) {
        errorMessage = err.message;
      } else errorMessage = JSON.stringify(err);
      dispatch({
        type: ActionType.SERRCH_REPOSITORIES_ERROR,
        payload: errorMessage,
      });
    }
  };
};
