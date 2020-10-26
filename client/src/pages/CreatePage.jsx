import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { api } from "../api";

export function CreatePage() {
  const history = useHistory();
  const auth = useContext(AuthContext)
  const [ link, setLink ] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, [])

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await api.links.generateLink(link, auth.token);
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
}