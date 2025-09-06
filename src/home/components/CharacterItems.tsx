import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@app/store";
import { fetchPeople } from "@home/slice/peopleSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { CharacterSearch } from "@home/components/CharacterSearch";
import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";
import CharacterTable from "./CharactersTable";

const CharacterItems: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const location = useLocation() as {
    state?: { fromPage?: string; search?: string; firstRecord?: number; currentRow?: number };
  };
  // pull data from state, and set it
  const initialPage = location.state?.fromPage ?? "1";
  const initialQuery = location.state?.search ?? "";
  const initialFirst = location.state?.firstRecord ?? 0;
  const initialRow = location.state?.currentRow ?? 10;

  const { data, loadingPeople, errorPeople, total_records } = useSelector(
    (state: RootState) => state.people,
  );

  const [page, setPage] = React.useState(parseInt(initialPage));
  const [search, setSearch] = useState(initialQuery);
  const [first, setFirst] = useState(initialFirst);
  const [rows, setRows] = useState(initialRow);

  // load whenever page changes
  useEffect(() => {
    dispatch(fetchPeople({ page: page.toString() }));
  }, [page, dispatch]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  const currentPage = first / rows + 1;
  const totalPages = Math.ceil(total_records / rows);

  const handleClick = (id: string) => {
    navigate(`characters/${id}`, {
      state: { fromPage: page, search: search, firstRecord: first, currentRow: rows },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Starwars Characters</h1>

      {loadingPeople && <p>Loading…</p>}
      {errorPeople && <p className="text-red-500">{errorPeople}</p>}
      <div className="mt-4 mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search starwars characters"
          className="border rounded p-2 w-60"
        />
        <CharacterSearch search={search} handleClick={handleClick} />
      </div>

      {!search && (
        <>
          <CharacterTable
            loading={loadingPeople}
            data={data[page]}
            handleClick={handleClick}
          ></CharacterTable>
          <div className="card">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={total_records}
              onPageChange={onPageChange}
              template="PrevPageLink PageLinks NextPageLink"
              className="justify-center"
            />
            <div className="mt-4 text-gray-600">
              Showing page {currentPage} of {totalPages}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterItems;
