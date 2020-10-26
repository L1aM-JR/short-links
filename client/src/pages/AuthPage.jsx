import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { api } from "../api";

export function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, clearError } = useHttp();

  const [ form, setForm ] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error);

    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, [])

  const changeHandler = (e) => {
    setForm({ ...form,  [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    const data = await api.auth.register(form);

    message(data.message);
  }
  const loginHandler = async () => {
    const data = await api.auth.login(form);
    
    auth.login(data.token, data.userId)
    
    message(data.message);
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
              children="Войти"
              disabled={loading}
              onClick={loginHandler}
            />
            <button
              className="btn grey lighten-1 white-text"
              children="Регистрация"
              onClick={registerHandler}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}