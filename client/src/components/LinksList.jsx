import React, { useContext } from "react";
import { Link } from "react-router-dom";

export function LinksList({ links, onDelete }) {
  if (!links.length) {
    return <p className="center">Ссылок пока нет</p>;
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
                <i className="tiny material-icons" onClick={onDelete(link._id)}>clear</i>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}