import React from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export function LinksList({ links }) {
  const { request } = useHttp();
  const message = useMessage();

  if (!links.length) {
    return <p className="center">Ссылок пока нет</p>;
  }

  const removeHandler = (id) => async () => {
    try {
      const data = await request('/api/link', 'DELETE', { id });
      message(data.message);
    } catch (e) {}
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Сокращенная</th>
          <th>Открыть</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {links.map((link, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`} children="Открыть" />  
              </td>
              <td className="td">
                <i className="tiny material-icons" onClick={removeHandler(link._id)}>clear</i>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}