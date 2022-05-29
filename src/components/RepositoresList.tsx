import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks/hooks";
import { searchRepositories } from "../state/slices/RepositorySlice";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector(
    (state) => state.repositories
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(searchRepositories(term));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </div>
  );
};

export default RepositoriesList;
