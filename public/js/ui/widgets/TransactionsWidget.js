/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    }
    else {
      throw new Error('Переданный элемент не существует')
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeBtn = document.querySelector('.create-income-button');
    incomeBtn.addEventListener('click', () => {
      const incomeModal = App.getModal('newIncome');
      incomeModal.open();
    });

    const consumptionBtn = document.querySelector('.create-expense-button');
    consumptionBtn.addEventListener('click', () => {
      const consumptionModal = App.getModal('newExpense');
      consumptionModal.open();
    });
  }
}
