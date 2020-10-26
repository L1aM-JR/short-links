import React, { useCallback, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import { useMessage } from "../hooks/message.hook";
import { api } from "../api";

export function LinksPage() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const message = useMessage();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchLinks();

    setLoading(false);
  }, []);

  const fetchLinks = useCallback(async () => {
    const links = await api.links.getLinks(token);

    setLinks(links);
  }, [token]);

  const removeHandler = (id) => async () => {
    try {
      const data = await api.links.deleteLink(id, token);

      message(data.message);
      setLinks(data.links);
    } catch (e) {}
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links} onDelete={removeHandler} />}
    </>
  );
}