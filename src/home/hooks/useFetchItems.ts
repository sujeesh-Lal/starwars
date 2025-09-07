import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import type { AsyncThunk } from "@reduxjs/toolkit";

export function useFetchItems({
  items,
  fetchById,
}: {
  items?: string[];
  fetchById: AsyncThunk<any, string, any>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!items?.length) return;

    setLoaded(false);

    (async () => {
      try {
        for (const url of items) {
          const id = url.replace(/\/$/, "").split("/").pop();
          if (id) {
            await dispatch(fetchById(id));
          }
        }
        setLoaded(true);
      } catch (err) {
        console.error("Fetch failed", err);
        setLoaded(true);
      }
    })();
  }, [items, dispatch, fetchById]);

  return loaded;
}
