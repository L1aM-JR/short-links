import React, { useCallback, useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import { useMessage } from "../hooks/message.hook";

export function LinksPage() {
  const { loading, request } = useHttp();
  const [links, setLinks] = useState([]);
  const message = useMessage();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try { 
      const fetched = await request('/api/link', 'GET', null, { Authorization: `Bearer ${token}` });

      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  const removeHandler = (id) => async () => {
    try {
      const data = await request('/api/link', 'DELETE', { id }, { Authorization: `Bearer ${token}` });
      message(data.message);
      setLinks(data.links);
    } catch (e) {}
  }

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links} onDelete={removeHandler} />}
    </>
  );
}