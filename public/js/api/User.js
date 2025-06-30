//import { response } from "express";
//const { response } = require("express");


/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user')) ?? undefined;    
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    //if (callback().success) {
      //this.setCurrent(callback().user);
    //}
    //else {
      //this.unsetCurrent();
    //}
    createRequest({
      method: 'GET',
      url: this.URL + '/current',
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        }
        else {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      method: 'POST',
      data: data,
      url: this.URL + '/login',
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      method: 'POST',
      data: data,
      url: this.URL + '/register',
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/logout',
      callback: (err, response) => {
        this.unsetCurrent();
        callback(err, response);
      }
    });    
  }
}
